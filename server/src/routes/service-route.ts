import { Hono } from "hono";
import {
  createService,
  deleteService,
  getServiceDetail,
  getServices,
  updateService,
} from "../controllers/service-controller.js";
import { authorization } from "../middlewares/authorization.js";

const app = new Hono();

app.post("/service", authorization, createService);
app.get("/service", authorization, getServices);
app.get("/service/:id", authorization, getServiceDetail);
app.put("/service/:id", authorization, updateService);
app.delete("/service/:id", authorization, deleteService);

export default app;
