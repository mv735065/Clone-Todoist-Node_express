let Task = require("../models/task.model.js");

exports.createTask = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error(
        "Enter the details of atsk or some fileds are data missing"
      );
    }
    let task = await Task.createTask(req.body);

    res.status(201).send(task);
  } catch (err) {
    res.status(500).send({
      message:
        err || "unbale to create task or some fileds are data missing ",
    });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      throw new Error("Please provide id as number");
    }

    let task =await Task.getTaskById(id);
    res.send(task);
  } catch (err) {
    res.status(500).send({
      message: "unbale to get task "+err
    });
  }
};

exports.getTaskByFilters = async(req, res) => {
try{
 let data=await Task.getTaskByFilters(req.query);
  res.status(202).json(data);
}
catch(err){
  res.status(400).send({
    message: err.message || "unbale to found tasks "+err,
  });
}

};

exports.deleteTask =async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      throw new Error("Please provide id as number");
    }

    let task =await Task.deleteTask(id);
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send({
      message: err || "unbale to delete task ",
    });
  }

};

exports.deleteAllTasks =async (req, res) => {
  try{
  let data= await Task.deleteAllTasks();
  res.status(200).send(data);
  }
  catch(err){
    res.status(400).send({
      message: err.message || "unbale to delete all  task ",
    });
  }
};

exports.updateTask = async(req, res) => {
  try{
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error(
        "Enter the details of atsk or some fileds are data missing to update"
      );
    }
    let id = req.params.id;
    if (isNaN(id)) {
      throw new Error("Please provide id as number to update");
    }

  let task= await Task.updateTask(req.body,id)
  res.status(201).send(task);
  }
  catch(err){
     res.status(404).send({
      message: err.message|| "unbale to update task",
    });
  }
};

exports.createFakeTasks=async(req,res)=>{
  try{
    let tasks= await Task.createFakeTasks();
    res.send("Fake tasks created");
  }
  catch(err){
    res.status(500).send("Fake tasks not created "+err);
  }
}
