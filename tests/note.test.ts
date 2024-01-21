import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { createNoteForTest } from "./noteFactory";
import { cleanDB } from "./helpers";
import app from "../src/app";

beforeAll(async () => {
  await cleanDB();
});

const server = supertest(app);

describe("POST /", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/").send(invalidBody);

    expect(response.status).toBe(422);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      title: faker.lorem.word({
        length: { min: 1, max: 18 },
        strategy: "shortest",
      }),
      text: faker.lorem.paragraph(),
    });

    it("should respond with status 201", async () => {
      const body = generateValidBody();

      const response = await server.post("/").send(body);

      expect(response.status).toBe(201);
    });
  });
});

describe("GET /", () => {
  it("should respond with status 200 and empty array when theres no notes", async () => {
    await cleanDB();
    const response = await server.get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should respond with status 200 and array of objects when there are elements in the database", async () => {
    await createNoteForTest();

    const response = await server.get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        title: expect.any(String),
        text: expect.any(String),
        favorite: false,
        color: "#ffffff",
      },
    ]);
  });
});

describe("DELETE /:id", () => {
  it("should respond with status 400 when id is not a number", async () => {
    const response = await server.delete("/aaa");

    expect(response.status).toBe(400);
  });
  it("should respond with status 200 and array of notes without the deleted note", async () => {
    await createNoteForTest();

    const response = await server.delete("/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 2,
        title: expect.any(String),
        text: expect.any(String),
        favorite: false,
        color: "#ffffff",
      },
    ]);
  });
});

describe("PATCH /favorite/:id", () => {
  it("should respond with status 400 when id is not a number", async () => {
    const response = await server.patch("/favorite/aaa");

    expect(response.status).toBe(400);
  });
  it("should respond with status 200 and array of notes", async () => {
    const response = await server.patch("/favorite/2");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 2,
        title: expect.any(String),
        text: expect.any(String),
        favorite: true,
        color: "#ffffff",
      },
    ]);
  });
});

describe("PATCH /color/:id", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.patch("/color/2");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.patch("/color/2").send(invalidBody);

    expect(response.status).toBe(422);
  });
  describe("when body is valid", () => {
    it("should respond with status 400 when id is not a number", async () => {
      const body = { color: "#B9FFDD" };
      const response = await server.patch("/color/aaa").send(body);

      expect(response.status).toBe(400);
    });
    it("should respond with status 200 and array of notes", async () => {
      const body = { color: "#B9FFDD" };
      const response = await server.patch("/color/2").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 2,
          title: expect.any(String),
          text: expect.any(String),
          favorite: expect.any(Boolean),
          color: "#B9FFDD",
        },
      ]);
    });
  });
});

describe("PUT /:id", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.put("/2");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.put("/2").send(invalidBody);

    expect(response.status).toBe(422);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      title: faker.lorem.word({
        length: { min: 1, max: 18 },
        strategy: "shortest",
      }),
      text: faker.lorem.paragraph(),
    });
    it("should respond with status 400 when id is not a number", async () => {
      const body = generateValidBody();
      const response = await server.put("/aaa").send(body);

      expect(response.status).toBe(400);
    });
    it("should respond with status 200 and array of notes", async () => {
      const body = generateValidBody();

      const response = await server.put("/2").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 2,
          title: body.title,
          text: body.text,
          favorite: expect.any(Boolean),
          color: expect.any(String),
        },
      ]);
    });
  });
});
