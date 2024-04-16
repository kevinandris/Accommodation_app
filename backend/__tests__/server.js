const app = require("../server"); // Link to your server file
const supertest = require("supertest");
const mongoose = require("mongoose");
const request = supertest(app);

test("GET server health check", async () => {
  const response = await request.get("/");
  expect(response.statusCode).toBe(200);
  expect(response.body).toStrictEqual({ STATUS: "OK" });
});

test("GET server health check - Endpoint not found", async () => {
  const response = await request.get("/nonexistent");
  expect(response.statusCode).toBe(404);
});

test("GET server health check - Internal server error", async () => {
  // Simulate an internal server error by disconnecting from the database
  await mongoose.disconnect();

  const response = await request.get("/");
  expect(response.statusCode).toBe(500);

  // Reconnect to the database
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

test("Sending an HTTP POST request to the server", async () => {
  const response = await request
    .post("/api/posts")
    .send({ title: "Test Post", body: "This is a test post" });
  expect(response.statusCode).toBe(201);
  expect(response.body).toHaveProperty("id");
  expect(response.body.title).toBe("Test Post");
  expect(response.body.body).toBe("This is a test post");
});

test("Sending an HTTP PUT request to the server", async () => {
  const postId = "1234567890";
  const response = await request
    .put(`/api/posts/${postId}`)
    .send({ title: "Updated Post", body: "This post has been updated" });
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("id");
  expect(response.body.title).toBe("Updated Post");
  expect(response.body.body).toBe("This post has been updated");
});
