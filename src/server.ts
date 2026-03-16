import Hapi from "@hapi/hapi";
import type { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { accountsController } from "./controllers/accounts-controller.js";
import { webRoutes } from "./web-routes.js";
import { connectDb } from "./models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadEnvironment(): void {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    process.exit(1);
  }
}

async function registerPlugins(server: Server): Promise<void> {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);

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

function configureAuth(server: Server): void {
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");
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

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
