import { Hono } from "hono";
import {
  createCompanyProfile,
  deleteCompanyProfile,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyProfile.controller.js";
import { authorization } from "../middlewares/authorization.js";

const companyRoute = new Hono();

companyRoute.get("/", getCompanyProfile );
companyRoute.post("/", authorization, createCompanyProfile);
companyRoute.put("/", authorization, updateCompanyProfile);
companyRoute.delete("/", authorization, deleteCompanyProfile);

export default companyRoute;
