import { Hono } from "hono";
import {
  createCompanyProfile,
  deleteCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyProfile.controller.js";
import { authorization } from "../middlewares/authorization.js";

const companyRoute = new Hono();

companyRoute.get("/about", getCompanyProfile);
companyRoute.post("/about", authorization, createCompanyProfile);
companyRoute.put("/about", authorization, updateCompanyProfile);
companyRoute.delete("/about", authorization, deleteCompanyProfile);

export default companyRoute;
