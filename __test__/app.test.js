const app = require("../server/app");
const request = require("supertest");

const { getAll, getLength, getSingle,deleteSingle } = require("../server/lib/dummyDB");

describe("app", () => {
  describe("GET /api/persons/", () => {
    it("Should return dummy data", async () => {
      const res = await request(app).get("/api/persons");
      expect(res.statusCode).toBe(200);
      const all = await getAll();
      expect(res.body).toStrictEqual(all);
    });
  });

  describe("GET /info", () => {
    it("Should return a string with the number of phones and date of request", async () => {
      const res = await request(app).get("/info");
      expect(res.statusCode).toBe(200);
      const lines = res.text.split("\n");
      expect(lines[0]).toBe(
        `Phonebook has info for ${await getLength()} people`
      );
      expect(lines[1]).toContain("2021");
    });
  });

  describe("GET /api/persons/<id>", () => {
    it("Should respond with specific data for id", async () => {
      const res = await request(app).get("/api/persons/1");
      const data = await getSingle(1);
      expect(res.body).toBe(data);
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
const dummyDB = require("../server/lib/dummyDB");

describe("dummyDB", () => {
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
});