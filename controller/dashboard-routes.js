const withAuth = require("../utils/withAuth");
const router = require("express").Router();

router.get("/", withAuth, async (req, res) => {
  fetch("/api/post", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      res.render("dashboard", { data });
    });
});
