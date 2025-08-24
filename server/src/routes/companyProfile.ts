import { Hono } from "hono";
import {
  createCompanyProfile,
  deleteCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyProfile.controller.js";
import { authorization } from "../middlewares/authorization.js";

const app = new Hono();

app.get("/about", getCompanyProfile);
app.post("/about", authorization, createCompanyProfile);
app.put("/about", authorization, updateCompanyProfile);
app.delete("/about", authorization, deleteCompanyProfile);

export default app;
