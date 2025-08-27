import { Hono } from "hono";
import serviceRoute from "./service.js";
import companyRoute from "./companyProfile.js";

const apiRoute = new Hono();

apiRoute.route("/about", companyRoute);
apiRoute.route("/service", serviceRoute);

export default apiRoute;
