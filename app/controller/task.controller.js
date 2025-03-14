let Task = require("../models/task.model.js");

exports.createTask = (req, res) => {
 
if (!req.body || Object.keys(req.body).length === 0) {
  res.status(400).send({
    message: "Enter the details of atsk",
  });
  return;
}


  Task.createTask(req.body, (err, data) => {
    if (err) {
      return res.status(404).send({
        message: "unbale to create task or some fileds are data missing",
      });
    }

    res.status(201).send(data);
  });
};

exports.getAllTasks = (req, res) => {
  Task.getAllTasks((err, data) => {
    if (err) {
      return res.status(400).send({
        message: err.message || "unbale to retriew tasks",
      });
    }
    res.send(data);
  });
};

exports.getTaskById = (req, res) => {
  let id = req.params.id;

  Task.getTaskById(id, (err, data) => {
    if (err) {
      return res.status(400).send({
        message: err.message || "unbale to found task",
      });
    }
    res.status(202).json(data);
  });
};

exports.deleteTask = (req, res) => {
  let id = req.params.id;

  Task.deleteTask(id, (err, data) => {
    if (err) {
      return res.status(400).send({
        message: err.message || "unbale to found task",
      });
    }
    res.status(200).send(`Deleted task id-${id}`);
  });
};

exports.deleteAllTasks = (req, res) => {
  Task.deleteAllTasks((err, data) => {
    if (err) {
      return res.status(400).send({
        message: err.message || "unbale to found task",
      });
    }
    res.status(200).send("Deleted all tasks");
  });
};

exports.updateTask = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Enter the details of task to update",
    });
    return;
  }
  if (!req.params.id) {
    res.status(400).send({
      message: "Enter the id of task to update",
    });
    return;
  }
  let task = new Task(req.body);

  Task.updateTask(task, req.params.id, (err, data) => {
    if (err) {
      return res.status(404).send({
        message: err.message || "unbale to create task",
      });
    }

    res.status(201).send(data);
  });
};
