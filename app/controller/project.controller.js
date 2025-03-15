let Project = require("../models/project.model");

let {
  ValidationError,
  NotFoundError,
  GeneralError,
} = require("../middleware/errorTypes");

exports.createProject = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body) == 0) {
      throw new ValidationError("Please provide content to create Project");
    }

    let project = await Project.createProject(req.body);

    res.status(201).send(project);
  } catch (err) {
    res.status(400).send({ message: err.message } || err);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    let projects = await Project.getAllProjects();
    res.send(projects);
  } catch (err) {
    res.status(400).send({ message: err.message || err} );
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      throw new Error("Please provide id as number");
    }

    let project = await Project.getProjectById(id);
    res.send(project);
  } catch (err) {
    res.status(500).send({message:`${err.message || "unbale to found project"}`});
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      throw new Error("Please provide id as number");
    }

    let project = await Project.deleteProject(id);
    res.send(project);
  } catch (err) {
    res.status(500).send({message:`${err.message || "unbale to delete project"}`});
  }
};

exports.deleteAllProjects = async (req, res, next) => {
  try {
    let data = await Project.deleteAllProjects();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({message:`${err.message || "unbale to delete all projects"}`});
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body) == 0) {
      throw new Error("Please provide content to create Project");
    }
    if (!req.params.id || isNaN(req.params.id)) {
      throw new Error("Please provide id as a  number ");
    }
    let result = await Project.updateProject(req.body, req.params.id);

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({message:`${err.message || "unbale to update projects"}`});
  }
};

exports.createFakeProjects=async(req,res)=>{
  try{
  let data= await Project.createFakeProjects();
   res.send(data);
  }
  catch(err){
    res.status(500).send({message:err.message || "Not able to creeate fake projects"});
  }
  
}
