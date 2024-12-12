// import { opentelemetry } from "@elysiajs/opentelemetry";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { edgedb } from "../dbschema/edgeql-js/imports";
import { fingerprintRoutes } from "./fingerprint";
import { surveyRoutes } from "./survey";
import { userRoutes } from "./user";

const client = edgedb.createClient();

const app = new Elysia()
  // .use(opentelemetry())
  .use(
    cors({
      origin: "localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
    }),
  )
  .get("/", () => "Hello Elysia")
  .use(userRoutes(client))
  .use(surveyRoutes(client))
  .use(fingerprintRoutes(client))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
