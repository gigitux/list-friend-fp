/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-expression-statement */
import { createServer, Model, Response } from "miragejs";

const isError = () => Math.random() > 0.5;

// #important unfortunately this library doesn't work well with typescript

export const server = createServer({
  models: {
    user: Model,
  },
  routes() {
    this.namespace = "api";
    this.get("/users", (schema: any) => {
      return schema.users.all().models;
    });
    this.get("/users/:id", (schema: any, request) => {
      const user = schema.users
        .all()
        .models.find((user: any) => user.id === request.params.id);

      return user.attrs ?? new Response(404);
    });
    this.patch("/users/:id", (schema: any, request) => {
      const body = JSON.parse(request.requestBody);

      return isError()
        ? new Response(500)
        : schema.users.create({ ...body, id: request.params.id }).attrs;
    });
    this.post("/users", (schema: any, request) => {
      const body = JSON.parse(request.requestBody);

      return isError() ? new Response(500) : schema.users.create(body).attrs;
    });
  },
});
