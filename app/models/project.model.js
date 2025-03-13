let db = require("./db");

// Project
// CRUD on projects
// Each project will have name, color, is_favorite,

function creatTable() {
  return new Promise((resolve, reject) => {
    let query = `
        create table if not exists project (
         id int primary key auto_increment,
         name varchar(255) ,
         color varchar(255) ,
         is_favorite boolean default false
        );
        `;

    db.query(query, (err, res) => {
      if (err) {
        throw new Error("Unbale to create the tables project");
      } else {
        resolve();
      }
    });
  });
}

async function creatingTableProject() {
  try {
    let res = await creatTable();
    console.log("Created the table project");
  } catch (err) {
    console.log(err.message);
  }
}
creatingTableProject();

class Project {
  constructor(project) {
    this.name = project.name;
    this.color = project.color;
    this.is_favorite = project.is_favorite;
  }

  static createProject(project, result) {
    let query = "insert into project(name,color,is_favorite) values (?,?,?)";

    db.query(
      query,
      [project.name, project.color, project.is_favorite],
      (err, data) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { id: this.lastId, ...project });
      }
    );
  }

  static getAllProjects(result) {
    let query = "select * from project";
    db.query(query, (err, data) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, data);
    });
  }

  static getProjectById(id, result) {
    let query = "select * from project where id=?";
    db.query(query, [id], (err, data) => {
      if (err) {
        return result(err, null);
      }

      result(null, data);
    });
  }

  static deleteProject(id, result) {
    let query = "delete from project where id=?";
    db.query(query, [id], (err, data) => {

      if (err) {
        return result(err, null);
      }
      if (data.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, data);
    });
  }

  static deleteAllProjects(result) {
    let query = "delete from project ";
    db.query(query, (err, data) => {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }

  static updateProject(project, id, result) {
  
    let query = "update  project set name=?,color=?,is_favorite=? where id=? ";

    db.query(
      query,
      [project.name, project.color, project.is_favorite, id],
      (err, data) => {
        if (err) {
          result(err, null);
          return;
        }
        if (data.affectedRows==0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: id, ...project });
      }
    );
  }
}

module.exports = Project;
