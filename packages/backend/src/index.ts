import { cors } from "@elysiajs/cors";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { edgedb } from "../dbschema/edgeql-js/imports";
import { fingerprintRoutes } from "./fingerprint";
import { surveyRoutes } from "./survey";
import { userRoutes } from "./user";

const isProd = process.env.NODE_ENV === "production";
const client = edgedb.createClient();

const sharedRoutes = new Elysia()
  .use(userRoutes(client))
  .use(surveyRoutes(client))
  .use(fingerprintRoutes(client));

let app;

if (isProd) {
  app = new Elysia()
    .use(
      staticPlugin({
        prefix: "",
        assets: "dist",
      }),
    )
    .get("/", () => Bun.file("dist/index.html"))
    .use(sharedRoutes)
    .listen(3000);
} else {
  app = new Elysia()
    .use(
      cors({
        origin: "localhost:5173",
        credentials: true,
        methods: ["GET", "POST"],
      }),
    )
    .get("/", () => "hello")
    .use(sharedRoutes)
    .listen(3000);
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
