let db = require("./db");

// Project
// CRUD on projects
// Each project will have name, color, is_favorite,
creatingTableProject();

async function creatingTableProject() {
  try {
    let res = await new Promise((resolve, reject) => {
      let query = `
          create table if not exists project (
           id int primary key auto_increment,
           name varchar(255) not null,
           color varchar(255) default 'blue',
           is_favorite boolean default false,
           user_id int not null,
           foreign key (user_id) references user(id) on delete cascade
          );
          `;

      db.query(query, (err, res) => {
        if (err) {
          reject(new Error("Unbale to create the tables project,err " + err));
        } else {
          resolve("Created the table project");
        }
      });
    });
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
}

exports.createProject = function (projects) {
  return new Promise((resolve, reject) => {
    let query = "insert into project(name,color,is_favorite,user_id) values ?";

    let store = [];

    projects.forEach((ele) => {
      store.push(Object.values(ele));
    });

    db.query(query, [store], (err, data) => {
      if (err) {
        reject(new Error("unbale to create Project, " + err));
      }

      resolve(`Created the ${projects.length} projects `);
    });
  });
};

exports.getAllProjects = () => {
  return new Promise((resolve, reject) => {
    let query = "select * from project";
    db.query(query, (err, data) => {
      if (err) {
        reject(new Error("Unable to fecth the all projects"));
      }
      resolve(data);
    });
  });
};

exports.getProjectById = (id) => {
  return new Promise((resolve, reject) => {
    let query = "select * from project where id=?";
    db.query(query, [id], (err, data) => {
      if (err) {
        reject(new Error("Unable to fetch project " + err));
      }
      if (data.length == 0) {
        reject(new Error("No project on this id " + id));
      }

      resolve(data);
    });
  });
};

exports.deleteProject = (id) => {
  return new Promise((resolve, reject) => {
    let query = "delete from project where id=?";

    db.query(query, [id], (err, data) => {
      if (err) {
        reject(new Error("Unable to delete project " + err));
      }
      if (data.affectedRows == 0) {
        reject(new Error("No project on this id " + id));
      }

      resolve("Deleted project on id " + id);
    });
  });
};
exports.deleteAllProjects = () => {
  return new Promise((resolve, reject) => {
    let query = "delete from project ";
    db.query(query, (err, data) => {
      if (err) {
        reject(new Error("Unable to delete all projects " + err));
      }

      resolve("Deleted all projects");
    });
  });
};

exports.updateProject = (project, id) => {
  return new Promise((resolve, reject) => {
    let query = "update  project set is_favorite=? where id=? ";

    db.query(
      query,
      [ project.is_favorite, id],
      (err, data) => {
        if (err) {
          reject(new Error("Unable to update the project id -" + id));
        }
        if (data.affectedRows == 0) {
          reject(new Error("No project on this id " + id));
        }
        resolve({ id: id, ...project });
      }
    );
  });
};




exports.createFakeProjects = function () {
  return new Promise((resolve, reject) => {
    let query = "insert into project(name,user_id) values ?";
    let store = [];
    let userId = 1;

    for (let i = 1; i <= 1000000; i++) {
      store.push([`Project-${i}`, userId]);
      userId = (userId % 10) + 1;
    }

    let batch = 100000;
    let prom = [];

    for (let i = 0; i < store.length; i += batch) {
      let data = store.slice(i, i + batch);

      prom.push(
        new Promise((resolveQuery, rejectQuery) => {
          db.query(query, [data], (err, result) => {
            if (err) {
              rejectQuery(err);
            } else {
              console.log(`Inserted batch ${i + batch}`);
              resolveQuery(result);
            }
          });
        })
      );
    }

    Promise.all(prom)
      .then(() => {
        console.log("Successfully added 1M projects");
        resolve("Successfully added 1M projects");
      })
      .catch((err) => {
        console.log("Failed to add 1M projects: " + err);
        reject(err);
      });
  });
};
