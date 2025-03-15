let db = require("./db");

// Add a users table, Columns - name, email should be unique.
// One user can have multiple projects. On user deletion their data should be deleted from the database

let query = `
create table  if not exists user(
id int primary key auto_increment,
name varchar(255) unique not null,
email varchar(255) unique not null
)
`;
createTable();

async function createTable() {
  try {
    await new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) {
          console.log("UNbale to create user table");
          reject(err);
        } else {
          console.log("User table is created");
          resolve();
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

exports.create =function (data) {
  return new Promise((resolve, reject) => {
    let query = "insert into user(name, email) values ?";
    
    if (!Array.isArray(data) || data.length === 0) {
      return reject(new Error("Invalid data format or empty data"));
    }

    let store = data.map((element) => Object.values(element));

    db.query(query, [store], (err, result) => {
      if (err) {
        return reject(new Error("Failed to insert users: " + err.message));
      }
      resolve("Successfully inserted " + result.affectedRows + " users");
    });
  });
};

exports.getAllUsers = function () {
  let query = "select * from user";

return  new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) reject(new Error("Failed to fetch all users: " + err.message));
        else resolve(data);
      });
    });
 
};

exports.getUserById =  function (id) {
  let query = "select * from user where id=?";

return  new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) reject(new Error("Failed to fetch the user : " + err.message));
        else resolve(data);
      });
    });
   
};

exports.deleteUserById =  function (id) {
  let query = "delete  from user where id=?";

  return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) reject(new Error("Failed to delete the user : " + err.message));
        if (data.affectedRows == 0) {
          resolve( { message: "No User with given id "+id });
        }
         resolve({ message: ` Deleted the User with id-${id}` });
      });
    });
  
};

exports.deleteAllUsers = function () {
  let query = "delete  from user ";
  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) {
        reject(new Error("Failed to delete the all users : " + err.message));
      }
      resolve( { message: "Deleted all users" });
    });
  });

 
};
