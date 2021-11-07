const app = require("../server/app");
const request = require("supertest");

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

describe("GET /api/persons", () => {
  it("Should return dummy data", async () => {
    const res = await request(app).get("/api/persons");
    expect(res.data).toBe(JSON.stringify(DUMMY));
  });
});
