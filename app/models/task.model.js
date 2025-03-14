let db = require("./db");

// Tasks
// Create, Update, Delete a task
// Each task will have content, description, due date, is_completed, created_at

let query = `
create table if not exists task (
 id int primary key auto_increment,
 content varchar(255) not null,
 description varchar(255) ,
 due_date date not null,
 is_completed boolean default false,
 created_at timestamp default current_timestamp,
 project_id  int not null,
 foreign key (project_id) references project(id) on delete cascade
);
`;

db.query(query, (err, res) => {
  if (err) {
    throw new Error("Unbale to create the tables task");
  } else console.log("Created the table task");
});

class Task {
  constructor(task) {
    this.content = task.content;
    this.description = task.description;
    this.due_date = task.due_date;
    this.project_id = task.project_id;
  }

  static createTask(task, result) {
    let query =
      "insert into task(content,description,due_date,project_id) values ?";

    let store = [];

    task.forEach((element) => {
      store.push(Object.values(element));
    });
    
    db.query(query, [store], (err, data) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null,{id:data.insertId,task});
    });
  }

  static getAllTasks(result) {
    let query = "select * from task";
    db.query(query, (err, data) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, data);
    });
  }

  static getTaskById(id, result) {
    let query = "select * from task where id=?";
    db.query(query, [id], (err, data) => {
      if (err) {
        return result(err, null);
      }

      result(null, data);
    });
  }

  static deleteTask(id, result) {
    let query = "delete from task where id=?";
    db.query(query, [id], (err, data) => {
      if (err) {
        return result(err, null);
      }
      if (!data.affectedRows) {
        err = {
          message: "Not found",
        };
        return result(err);
      }

      result(null, data);
    });
  }

  static deleteAllTasks(result) {
    let query = "delete from task ";
    db.query(query, (err, data) => {
      if (err) {
        return result(err, null);
      }
      result(null, data);
    });
  }

  static updateTask(task, id, result) {
    let query =
      "update  task set content=?,description=?,due_date=?,project_id=? where id=? ";

    db.query(
      query,
      [
        task.content,
        task.description,
        task.due_date,
        task.project_id,
        id,
      ],
      (err, data) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { id: id, ...task });
      }
    );
  }
}

module.exports = Task;
