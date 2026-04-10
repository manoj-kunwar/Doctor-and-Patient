import cors from "cors";

const corsMiddleware = cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "token",
    "atoken",
    "dtoken",
  ],
  credentials: false,  // ← must be false when origin is "*"
});

export default corsMiddleware;