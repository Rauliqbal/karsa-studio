import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import authRoutes from "./routes/auth.js";
import companyRoutes from "./routes/companyProfile.js";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";
import apiRoute from "./routes/index.js";

const app = new Hono();

// Middlewares
app.use(logger());
app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Serve Static
app.use("/uploads/*", serveStatic({ root: "./public" }));

// Routes
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.route("/auth", authRoutes);
app.route("/api", apiRoute);

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
