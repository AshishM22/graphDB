import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import schema from "./schema/schema.js";
import cors from "cors";

const app = express();

app.use(cors());
app.all("/graphql", createHandler({ schema, graphiql: true }));

export default app;
