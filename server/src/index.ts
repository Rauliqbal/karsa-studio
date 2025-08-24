import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import authRoutes from "./routes/auth.js";
import companyRoutes from "./routes/companyProfile.js";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

// Middlewares
app.use(logger());

// Serve Static
app.use("/uploads/*", serveStatic({ root: "./public" }));

// Routes
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.route("/auth", authRoutes);
app.route("/api", companyRoutes);

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
