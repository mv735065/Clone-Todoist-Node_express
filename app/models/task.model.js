let db = require("./db");

// Tasks
// Create, Update, Delete a task
// Each task will have content, description, due date, is_completed, created_at
creatingTableTask();

function creatTable() {
  return new Promise((resolve, reject) => {
    let query = `
      CREATE TABLE IF NOT EXISTS task (
        id INT PRIMARY KEY AUTO_INCREMENT,
        content VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        due_date DATE NOT NULL,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at DATE DEFAULT (CURDATE()),
        project_id INT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
      );
    `;

    db.query(query, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function creatingTableTask() {
  try {
    await creatTable();
    console.log("Created the table task");
  } catch (err) {
    console.log("Error creating table task or inserting data:", err.message);
  }
}

exports.createTask = (tasks) => {
  return new Promise((resolve, reject) => {
    let query =
      "insert into task(content,description,due_date,project_id) values ?";

    let store = [];
    tasks.forEach((task) => {
      store.push(Object.values(task));
    });

    db.query(query, [store], (err, data) => {
      if (err) {
        reject("Unable add tasks " + err);
      }
      resolve(`${tasks.length} Tasks are added `);
    });
  });
};

exports.getTaskById = (id) => {
  return new Promise((resolve, reject) => {
    let query = "select * from task  where id=?";

    db.query(query, [id], (err, data) => {
      if (err) {
        reject("Unable to fetch the task with given id " + id);
      }
      if (data.length == 0) {
        reject("No  task with given id " + id);
      }
      resolve(data);
    });
  });
};

exports.getTaskByFilters = (queryFilters) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM task WHERE 1=1";
    let { project_id, due_date, is_completed, created_at } = queryFilters;

    if (project_id) {
      query += ` AND project_id=${db.escape(project_id)}`;
    }
    if (due_date) {
      query += ` AND due_date=${db.escape(due_date)}`;
    }
    if (is_completed) {
      query += ` AND is_completed=${is_completed}`;
    }
    if (created_at) {
      query += ` AND created_at=${db.escape(created_at)}`;
    }

    db.query(query, (err, data) => {
      if (err) {
        reject("Unable to fetch tasks " + err);
      }
      if (data.length > 10) {
        let temp = data.slice(0, 10);
        resolve({
          message: "the retuning tasks are very large limiting to 10 tasks",
          data:temp
        });
      }

      resolve(data);
    });
  });
};

exports.deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    let query = "delete from task where id=?";
    db.query(query, [id], (err, data) => {
      if (err) {
        reject("Unable delete the task " + err);
      }
      if (data.affectedRows == 0) {
        reject("No task with given id " + id);
      }
      resolve({message:"Task is deleted with given id "+id});
    });
  });
};

exports.deleteAllTasks = () => {
 return new Promise((resolve,reject)=>{
    let query = "delete from task ";
    db.query(query, (err, data) => {
      if (err) {
        reject("Unable delete all the tasks " + err);
      }
      resolve({message:"All Tasks are deleted "});
    });
  })
  
};

exports.updateTask = (task, id) => {
  return new Promise((resolve,reject)=>{
    let query =
    "update  task set content=?,description=?,due_date=?,is_completed=? where id=? ";

  db.query(
    query,
    [task.content, task.description, task.due_date, task.is_completed, id],
    (err, data) => {
      if (err) {
        reject("Unable update the task " + err);
      }
      if(data.affectedRows==0){
        reject("No task is for given id "+id);
      }
      resolve({ id: id, ...task });
    }
  );
  })
  
};
exports.createFakeTasks = async () => {
  console.time("starts");

  let halfLakh = 50000;
  let oneMillion = 1000000;
  let query = "insert into task(content, description, due_date, project_id) values ?";

  let store = [];
  for (let i = 1; i <= oneMillion; i++) {
    for (let j = 1; j <= 10; j++) {
      store.push([
        `Task-${j}`,
        `Descript-${j}`,
        new Date().toISOString().split("T")[0],
        j,
      ]);
    }
  }

  for (let i = 0; i < store.length; i += halfLakh) {
    let data = store.slice(i, i + halfLakh);

    try {
      await new Promise((resolve, reject) => {
        db.query(query, [data], (err, res) => {
          if (err) {
            reject(err);
          } else {
            console.log(`Inserted chunk ${i + halfLakh}`);
            resolve(res);
          }
        });
      });
    } catch (err) {
      console.log("Unable to insert chunk", err);
    }
  }

  console.timeEnd("starts");
};


