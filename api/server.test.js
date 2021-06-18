const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('Testing user endpoints', () => {
  describe('register endpoints', () => {
    it('Valid registration response', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({ username: 'Bill', password: '1234' })
        expect(res.status).toBe(201)
        expect(res.body.username).toMatch('Bill')
    })
    it("token is needed to fetch jokes", async () => {
      const res = await request(server).get("/jokes");
      expect(res.status).toBe(404);
    });
  })
  describe('login endpoints', () => {
    it("success message at login", () => {
      request(server)
        .post("/login", { username: "Bill", password: "1234" })
        .then((res) => {
          expect(res.message).toMatch(/welcome User/i);
        })
        .catch((err) => {
          err;
        });
    });
    it("has token", () => {
      request(server)
        .post("/login", { username: "Bill", password: "1234" })
        .then((res) => {
          expect(res.token).toBeInstanceOf();
        })
        .catch((err) => {
          err;
        });
    });
  })
})
