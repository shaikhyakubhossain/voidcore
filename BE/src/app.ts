import "./services/llm/providers.js";

import express from "express";
import { corsMiddleware } from "./config/cors.js";
import chatRoutes from "./routes/chat.routes.js";
import llmRoutes from "./routes/llm.routes.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/chat", chatRoutes);
app.use("/api/llm", llmRoutes);

export default app;
