import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema/schema.js";

const app = express();

app.all("/graphql", createHandler({ schema, graphiql: true }));

export default app;
