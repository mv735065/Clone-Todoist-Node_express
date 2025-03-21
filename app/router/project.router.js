let express = require("express");
let router = express.Router();
let project = require("../controller/project.controller.js");

router.post("/", project.createProject);

router.get("/", project.getAllProjects);

router.delete("/", project.deleteAllProjects);

router.patch("/:id", project.updateProject);

router.get("/:id", project.getProjectById);

router.delete("/:id", project.deleteProject);

router.post('/createFake',project.createFakeProjects);

module.exports = router;
