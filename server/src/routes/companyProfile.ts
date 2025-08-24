import { Hono } from "hono";
import {
  createCompanyProfile,
  getCompanyProfile,
} from "../controllers/companyProfile.controller.js";

const app = new Hono();

app.get("/about", getCompanyProfile);
app.post("/about", createCompanyProfile);

export default app;
