const dummyDB = require("../server/lib/dummyDB");
const app = require("../server/app");
const request = require("supertest");
const uuid = require("uuid");

describe("app", () => {
  beforeAll(() => {
    dummyDB.init();
  });
  describe("GET /api/persons/", () => {
    it("Should return dummy data", async () => {
      const res = await request(app).get("/api/persons");
      expect(res.statusCode).toBe(200);
      const all = await dummyDB.getAll();
      expect(res.body).toStrictEqual(all);
    });
  });

  describe("GET /info", () => {
    it("Should return a string with the number of phones and date of request", async () => {
      const res = await request(app).get("/info");
      expect(res.statusCode).toBe(200);
      const lines = res.text.split("\n");
      expect(lines[0]).toBe(
        `Phonebook has info for ${await dummyDB.getLength()} people`
      );
      expect(lines[1]).toContain("2021");
    });
  });

  describe("GET /api/persons/<id>", () => {
    it("Should respond with specific data for id", async () => {
      const res = await request(app).get("/api/persons/1");
      const data = await dummyDB.getSingle(1);
      expect(res.body).toStrictEqual(data);
    });

    it("Should respond with an error if id does not exist", async () => {
      const res1 = await request(app).get("/api/persons/-5");
      expect(res1.statusCode).toBe(400);
      expect(res1.body.error).toBe("Bad id");
      const res2 = await request(app).get("/api/persons/abc");
      expect(res2.statusCode).toBe(400);
      expect(res2.body.error).toBe("Bad id");
      const res3 = await request(app).get("/api/persons/7");
      expect(res3.statusCode).toBe(404);
      expect(res3.body.error).toBe("No such id");
    });
  });

  describe("DELETE /api/persons/<id>", () => {
    it("Should delete the person with that id", async () => {
      expect(await dummyDB.getSingle(1)).toBeDefined();
      const res = await request(app).delete("/api/persons/1");
      expect(res.statusCode).toBe(204);
      expect(await dummyDB.getSingle(1)).not.toBeDefined();
    });

    it("Should respond with an error if id does not exist", async () => {
      const res1 = await request(app).delete("/api/persons/-5");
      expect(res1.statusCode).toBe(400);
      expect(res1.body.error).toBe("Bad id");
      const res2 = await request(app).delete("/api/persons/abc");
      expect(res2.statusCode).toBe(400);
      expect(res2.body.error).toBe("Bad id");
      const res3 = await request(app).delete("/api/persons/7");
      expect(res3.statusCode).toBe(404);
      expect(res3.body.error).toBe("No such id");
    });
  });

  describe("POST /api/persons", () => {
    it("Should generate new uuid for the new person", async () => {
      const data = {
        name: "Noam",
        number: "123-1234567",
      };
      const res = await request(app).post("/api/persons").send(data);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(data.name);
      expect(res.body.phone).toBe(data.phone);
      expect(uuid.validate(res.body.id)).toBeTruthy();
    });

    it("Should return an error if params are missing or bad", async () => {
      let res = await request(app).post("/api/persons").send({ name: "aaa" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Missing number");
      res = await request(app)
        .post("/api/persons")
        .send({ number: "123-1234567" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Missing name");
      res = await request(app)
        .post("/api/persons")
        .send({ name: "noam", number: "123-123" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Number to short number");
      res = await request(app)
        .post("/api/persons")
        .send({ name: "noam", number: "asdasd" });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Not a number");
    });
  });
});

const DUMMY = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

describe("dummyDB", () => {
  beforeAll(() => {
    dummyDB.init();
  });

  describe("get all", () => {
    it("Should return all the data", async () => {
      expect(await dummyDB.getAll()).toStrictEqual(DUMMY);
    });
  });

  describe("get length", () => {
    it("Should return the number of phones", async () => {
      expect(await dummyDB.getLength()).toBe(DUMMY.length);
    });
  });

  describe("get single", () => {
    it("Should return the specified info", async () => {
      expect(await dummyDB.getSingle(2)).toStrictEqual(
        DUMMY.find(({ id }) => id === 2)
      );
    });
  });

  describe("delete single", () => {
    it("Should delete the specified id", async () => {
      expect(await dummyDB.getSingle(1)).toBeDefined();
      await dummyDB.deleteSingle(1);
      expect(await dummyDB.getSingle(1)).not.toBeDefined();
    });
  });

  describe("init", () => {
    it("Should init the db", async () => {
      dummyDB.init();
      expect(await dummyDB.getAll()).toStrictEqual(DUMMY);
    });
  });

  describe("add new person", () => {
    it("should add new person to the db", async () => {
      const data = {
        id: 5,
        name: "Testy",
        number: "111-123345",
      };
      await dummyDB.addSingle(data);
      expect(await dummyDB.getSingle(5)).toStrictEqual(data);
    });
  });
});