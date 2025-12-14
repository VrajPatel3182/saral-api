import 'dotenv/config';
import app from "./app";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});