let express = require("express");
let router = express.Router();
let task = require("../controller/task.controller.js");

router.post("/", task.createTask);

router.get("/", task.getAllTasks);

router.delete("/", task.deleteAllTasks);

router.put("/:id", task.updateTask);

router.get("/:id", task.getTaskById);

router.delete("/:id", task.deleteTask);

module.exports = router;
