let db = require("./db");
let fs = require("fs");

// Tasks
// Create, Update, Delete a task
// Each task will have content, description, due date, is_completed, created_at

function creatTable() {
  return new Promise((resolve, reject) => {
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
      } else {
        resolve();
      }
    });
  });
}

async function creatingTableTask() {
  try {
    let res = await creatTable();
    console.log("Created the table task");
    Task.createTask("", "");
  } catch (err) {
    console.log(err.message);
  }
}
creatingTableTask();

class Task {
  constructor(task) {
    this.content = task.content;
    this.description = task.description;
    this.due_date = task.due_date;
    this.project_id = task.project_id;
  }

  static async createTask(task, result) {
    let    oneLakh=100000;
    let oneMillion=1000000;
    let tenMillion=10000000;
    let query =
      "insert into task(content,description,due_date,project_id) values ?";

    let store = [];
    for (let j = 1; j <= 10; j++) {
      for (let i = 1; i <= oneMillion; i++) {
        store.push([`Task-${i}`, `Descript-${i}`, new Date(), j]);
      }
    }

  
    for (let i = 0; i < store.length; i += oneMillion) {
      let data = store.slice(i, i + oneMillion);
      try {

       
        let prom=[];
        for(let j=0;j<oneMillion;j+=oneLakh){
          let chunkData=data.slice(j,j+oneLakh);

          prom.push( new Promise((resolve, reject) => {
            db.query(query, [data], (err, res) => {
              if (err) reject(err);
              else {
                console.log(`Inserted chunk ${j + oneLakh}`);
  
                resolve(res);
              }
            });
          }));
          
        }
        await prom.all((data)=>{
          console.log(`Inserted batch ${i + oneMillion}`);
        })
        .catch((err)=>{
          console.log(err);
          
        })
       
      } catch (err) {
        console.log("Unbake", err);
      }
    }
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
      [task.content, task.description, task.due_date, task.project_id, id],
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
