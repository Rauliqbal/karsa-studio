import { Hono } from "hono";
import serviceRoute from "./service.js";
import companyRoute from "./companyProfile.js";
import teamMemberRoute from "./teamMember.js";

const apiRoute = new Hono();

apiRoute.route("/about", companyRoute);
apiRoute.route("/service", serviceRoute);
apiRoute.route("/member", teamMemberRoute);

export default apiRoute;
