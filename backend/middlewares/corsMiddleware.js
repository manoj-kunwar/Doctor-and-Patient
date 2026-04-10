```javascript id="dxv2hc"
import cors from "cors";

const corsMiddleware = cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://careos-frontend.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "token",
    "atoken",
    "dtoken"
  ],
  credentials: true,
});

export default corsMiddleware;
```
