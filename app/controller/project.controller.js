let Project = require("../models/project.model");

let {
  ValidationError,
  NotFoundError,
  GeneralError,
} = require("../middleware/errorTypes");

exports.createProject = (req, res, next) => {
  if (!req.body || Object.keys(req.body)==0) {
    return next(
      new ValidationError("Please provide content to create Project")
    );
  }
  let project =req.body;

  Project.createProject(project, (err, data) => {
    if (err) {
      return next(
        new GeneralError(`${err.message} || "unbale to create project"`)
      );
    }

    res.status(201).send(data);
  });
};

exports.getAllProjects = (req, res, next) => {
  Project.getAllProjects((err, data) => {
    if (err) {
      return next(
        new GeneralError(`${err.message} || "unbale to retriew projects"`)
      );
    }
    res.send(data);
  });
};

exports.getProjectById = (req, res, next) => {
  let id = req.params.id;
  if (isNaN(id)) {
    return next(new ValidationError("Please provide id as number"));
  }

  Project.getProjectById(id, (err, data) => {
    if (err) {
      return next(
        new NotFoundError(`${err.message || "unbale to found project"}`)
      );
    }
    res.status(202).json(data);
  });
};

exports.deleteProject = (req, res, next) => {
  let id = req.params.id;
  if (isNaN(id)) {
    return next(new ValidationError("Please provide id as number"));
  }
  Project.deleteProject(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return next(
          new NotFoundError(`${err.message || "unbale to found project"} `)
        );
      } else {
        return next(
          new GeneralError(`${err.message || "unbale to delete projects"} `)
        );
      }
    } else res.send({ message: `project was deleted successfully!` });
  });
};

exports.deleteAllProjects = (req, res, next) => {
  Project.deleteAllProjects((err, data) => {
    if (err) {
      return next(new NotFoundError(`${err.message || err}`));
    }
    res.status(200).send("Deleted all projects");
  });
};

exports.updateProject = (req, res, next) => {
  if (!req.body || Object.keys(req.body)==0) {
    return next(
      new ValidationError("Please provide content to create Project")
    );
  }
  if (!req.params.id || isNaN(req.params.id)) {
    return next(new ValidationError("Please provide id as a  number "));
  }
  let project = new Project(req.body);

  Project.updateProject(project, req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return next(
          new NotFoundError(`${err.message || "unbale to found project"} `)
        );
      } else {
        return next(
          new GeneralError(`${err.message || "unbale to update projects"} `)
        );
      }
    } else res.status(201).send(data);
  });
};
