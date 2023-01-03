const router = require("express").Router();
const { Comment } = require("../../model");
const { withAuth } = require("../../utils/withAuth.js");

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk({
      where: { id: req.params.id },
    });
    if (!commentData) {
      res.status(404).json({ message: "There is no comment with that id." });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: { id: req.params.id },
    });
    if (!commentData) {
      res
        .status(404)
        .json({ message: "There was no comment with that id to update." });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({ where: { id: req.params.id } });
    if (!commentData) {
      res
        .status(404)
        .json({ message: "There was no comment with that id to delete." });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
