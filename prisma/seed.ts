import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

/* -------------------- Helpers -------------------- */
const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/* -------------------- Constants -------------------- */
const FIRST_NAMES = ["Aarav", "Noah", "Liam", "Ethan", "Arjun", "Leo", "Maya"];
const LAST_NAMES = ["Sharma", "Brown", "Patel", "Garcia", "Miller", "Singh"];
const TITLES = ["Frontend Engineer", "Backend Engineer", "Full Stack Developer"];
const COMPANIES = ["Astra Labs", "Nova Systems", "Helix Tech", "OrbitWorks"];
const LOCATIONS = ["India", "USA", "Germany", "Remote"];
const AVAILABILITY = ["Available", "Open to offers", "Not looking"];
const CAMPAIGN_STATUSES = ["draft", "active", "paused"];
const EVENT_TYPES = ["sent", "open", "reply"];

async function main() {
  console.log("🌱 Seeding database...");

  /* -------------------- USERS -------------------- */
  const users = await Promise.all(
    Array.from({ length: 20 }).map((_, i) => {
      const fname = pick(FIRST_NAMES);
      const lname = pick(LAST_NAMES);

      return prisma.user.create({
        data: {
          email: `${fname.toLowerCase()}.${lname.toLowerCase()}${100 + i}@mail.com`
        }
      });
    })
  );

  /* -------------------- CREDIT ACCOUNTS -------------------- */
  await Promise.all(
    users.map(user =>
      prisma.creditAccount.create({
        data: {
          userId: user.id,
          balance: rand(5, 40)
        }
      })
    )
  );

  /* -------------------- CANDIDATES -------------------- */
  const candidates = await Promise.all(
    Array.from({ length: 25 }).map((_, i) => {
      const fname = pick(FIRST_NAMES);
      const lname = pick(LAST_NAMES);

      return prisma.candidate.create({
        data: {
          name: `${fname} ${lname}`,
          title: pick(TITLES),
          company: pick(COMPANIES),
          experienceYears: rand(1, 12),
          location: pick(LOCATIONS),
          availability: pick(AVAILABILITY),
          imageUrl: "https://via.placeholder.com/150",
          about: `Experienced professional with ${rand(2, 10)} years in software development.`,
          workExperience: [
            {
              company: pick(COMPANIES),
              role: pick(TITLES),
              years: rand(1, 4)
            }
          ],
          education: [
            {
              degree: "B.Tech",
              institution: `Institute of Technology ${rand(1, 9)}`
            }
          ],
          matchMeta: {
            score: rand(60, 95),
            strengths: ["React", "Node", "MongoDB"].slice(0, rand(1, 3)),
            gaps: ["System Design", "Leadership"].slice(0, rand(0, 1))
          }
        }
      });
    })
  );

  /* -------------------- SEARCH HISTORY -------------------- */
  await Promise.all(
    users.map((user, i) =>
      prisma.searchHistory.create({
        data: {
          userId: user.id,
          queryText: `Looking for ${pick(TITLES)}`,
          filters: {
            experience: `${rand(2, 6)}+`,
            location: pick(LOCATIONS)
          },
          results: rand(5, 20),
          credits: 1
        }
      })
    )
  );

  /* -------------------- SHORTLISTED -------------------- */
  await Promise.all(
    users.slice(0, 10).map((user, i) =>
      prisma.shortlisted.create({
        data: {
          userId: user.id,
          candidateId: candidates[i].id,
          status: pick(["shortlisted", "rejected"])
        }
      })
    )
  );

  /* -------------------- CAMPAIGNS -------------------- */
  const campaigns = await Promise.all(
    users.slice(0, 5).map((user, i) =>
      prisma.campaign.create({
        data: {
          userId: user.id,
          title: `${pick(["Growth", "Hiring", "Outreach"])} Initiative ${i + 1}`,
          type: "email",
          status: pick(CAMPAIGN_STATUSES)
        }
      })
    )
  );

  /* -------------------- STEPS -------------------- */
  for (const campaign of campaigns) {
    await prisma.step.createMany({
      data: [
        {
          campaignId: campaign.id,
          orderIndex: 1,
          subject: "Introduction",
          body: "Hello {{name}}, we came across your profile and would love to connect.",
          waitDays: 0
        },
        {
          campaignId: campaign.id,
          orderIndex: 2,
          subject: "Follow-up",
          body: "Just following up on my previous message.",
          waitDays: rand(2, 5)
        }
      ]
    });
  }

  /* -------------------- RECIPIENTS -------------------- */
  const recipients = await Promise.all(
    campaigns.map((campaign, i) =>
      prisma.recipient.create({
        data: {
          campaignId: campaign.id,
          email: `contact${i + 200}@mail.com`,
          name: `${pick(FIRST_NAMES)} ${pick(LAST_NAMES)}`,
          status: pick(["sent", "opened", "replied"]),
          metadata: { channel: "email" }
        }
      })
    )
  );

  /* -------------------- ANALYTICS EVENTS -------------------- */
  await Promise.all(
    recipients.map(recipient =>
      prisma.analyticsEvent.create({
        data: {
          campaignId: recipient.campaignId,
          recipientId: recipient.id,
          eventType: pick(EVENT_TYPES),
          metadata: {
            device: pick(["gmail", "outlook"]),
            timestampSource: "server"
          }
        }
      })
    )
  );

  console.log("✅ Seeding completed successfully");
}

main()
  .catch(err => {
    console.error("❌ Seeding error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
