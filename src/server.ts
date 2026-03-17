import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import HapiAuthJwt2 from "hapi-auth-jwt2";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { accountsController } from "./controllers/accounts-controller.js";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { connectDb } from "./models/db.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvironment(): void {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }
}

async function registerPlugins(server: Hapi.Server) {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(HapiAuthJwt2);

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
}

function configureAuth(server: Hapi.Server) {
  server.auth.strategy("cookie", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });

  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  server.auth.default("cookie");
}

async function init(): Promise<void> {
  loadEnvironment();

  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
  });

  await registerPlugins(server);
  configureAuth(server);
  connectDb("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
