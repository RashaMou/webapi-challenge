const express = require("express");

const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
  const projects = await Projects.get();
  try {
    res.status(200).json(projects);
  } catch {
    res.status(500).json("There was an error retrieving projects");
  }
});

router.get("/:id", async (req, res) => {
  const project = await Projects.get(req.params.id);
  try {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json("There is no project with the specified id");
    }
  } catch {
    res
      .status(500)
      .json("There was an error retrieving the project with the specified id");
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const newProject = await Projects.insert(req.body);

  if (!name || !description) {
    res.status(400).json("Please add a name and description to your project");
  }

  try {
    res.status(201).json({ message: "success", newProject });
  } catch {
    res.status(500).json("There was an error adding your project");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const countDeleted = await Projects.remove(id);
  try {
    if (countDeleted > 0) {
      res
        .status(201)
        .json({ message: `Post with id:${id} was deleted successfully` });
    } else {
      res.status(404).json("We could not find a post with the specified id");
    }
  } catch {
    res.status(500).json("There was an error deleting the post");
  }
});

module.exports = router;
