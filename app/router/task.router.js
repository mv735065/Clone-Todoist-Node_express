let express = require("express");
let router = express.Router();
let task = require("../controller/task.controller.js");

router.post("/", task.createTask);


router.delete("/", task.deleteAllTasks);

router.put("/:id", task.updateTask);

router.get("/", task.getTaskByFilters);

router.get("/:id", task.getTaskById);

router.post('/createFakeTask',task.createFakeTasks);


router.delete("/:id", task.deleteTask);

module.exports = router;
