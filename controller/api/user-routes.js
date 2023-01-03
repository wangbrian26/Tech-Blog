const router = require("express").Router();
const { User, User, Post } = require("../../model");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk({
      where: { id: req.params.id },
    });
    if (!userData) {
      res.status(404).json({ message: "There is no user with that id." });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body, { individualHooks: true });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { userName: req.body.userName },
    });
    if (!userData) {
      res.status(404).json({ message: "Username not found." });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "Password not valid." });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: { id: req.params.id },
      individualHooks: true,
    });
    if (!userData) {
      res
        .status(404)
        .json({ message: "There was no user with that id to update." });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({ where: { id: req.params.id } });
    if (!userData) {
      res
        .status(404)
        .json({ message: "There was no user with that id to delete." });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
