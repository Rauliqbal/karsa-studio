import { Hono } from "hono";
import { createService, getServiceDetail, getServices } from "../controllers/service-controller.js";
import { authorization } from "../middlewares/authorization.js";



const app = new Hono

app.post('/service',authorization,createService)
app.get('/service', authorization, getServices)
app.get('/service/:id', authorization,getServiceDetail)


export default app