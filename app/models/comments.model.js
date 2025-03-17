// Add a comments table. Columns - content, posted_at, etc.
//  Comments can be added on both project and tasks. All CRUD endpoints to be implemented

const { comment } = require('postcss');
const db=require('../models/db');

createTableCommment();

async function createTableCommment() {
    let query=`
    create table if not exists comment(
    id int primary key auto_increment,
    content varchar(255) not null,
    posted_at date default (CURDATE()),
    edited_at date default (CURDATE()),
    user_id int not null,
    project_id  int not null,
    task_id int default null,
    foreign key (user_id) references user(id) ON DELETE CASCADE,
    foreign key (project_id) references project(id) ON DELETE CASCADE,
    foreign key (task_id) references task(id) ON DELETE CASCADE
    )
    `;
   let res= await new Promise((res,rej)=>{
        db.query(query,(err,data)=>{
            if(err){
                rej("Unable to create tabel "+err);
            }
            res("Created Table comment");
        })

    });

    console.log(res);
    
}
// CLONE_TODOIST
exports.createComment=(body)=>{
    return new Promise((resolve,reject)=>{
       let query='insert into comment(content,user_id,project_id,task_id) values ?';
       let store=body.map((comment)=>{
        return Object.values(comment);
       });
       db.query(query,[store],(err,data)=>{
        if (err) {
            reject("Unable add commnet " + err);
          }
          resolve(`${body.length} commnet are added `);
       })
    })
}

exports.getCommentById = (id) => {
    return new Promise((resolve, reject) => {
      let query = "select * from comment  where id=?";
  
      db.query(query, [id], (err, data) => {
        if (err) {
          reject("Unable to fetch the comment with given id " + id);
        }
        if (data.length == 0) {
          reject("No  comment with given id " + id);
        }
        resolve(data);
      });
    });
  };




exports.getAllComments = () => {
    return new Promise((resolve, reject) => {
      let query = "select * from comment";
      db.query(query, (err, data) => {
        if (err) {
          reject(new Error("Unable to fecth the all comments"));
        }
        resolve(data);
      });
    });
  };

  exports.deleteComment = (id) => {
    return new Promise((resolve, reject) => {
      let query = "delete from comment where id=?";
  
      db.query(query, [id], (err, data) => {
        if (err) {
          reject(new Error("Unable to delete comment " + err));
        }
        if (data.affectedRows == 0) {
          reject(new Error("No comment on this id " + id));
        }
  
        resolve("Deleted comment on id " + id);
      });
    });
  };


  exports.deleteAllComments = () => {
    return new Promise((resolve, reject) => {
      let query = "delete from comment ";
      db.query(query, (err, data) => {
        if (err) {
          reject(new Error("Unable to delete all comments " + err));
        }
  
        resolve("Deleted all comments");
      });
    });
  };

  exports.updateComment = (comment, id) => {
    return new Promise((resolve, reject) => {
      let query = "update  comment set content=?,edited_at=? where id=? ";
  
      db.query(
        query,
        [comment.content, new Date().toISOString().split("T")[0], id],
        (err, data) => {
          if (err) {
            reject(new Error("Unable to update the comment id -" + id));
          }
          if (data.affectedRows == 0) {
            reject(new Error("No comment on this id " + id));
          }
          resolve({ id: id });
        }
      );
    });
  };


  exports.getAllCommentsFromUser = (userId) => {
    return new Promise((resolve, reject) => {
      let query = "select * from comment  where user_id=?";
  
      db.query(query, [userId], (err, data) => {
        if (err) {
          reject("Unable to fetch the comment with given userId " + userId);
        }
        if (data.length == 0) {
          reject("No  comment with given userId " + userId);
        }
        resolve(data);
      });
    });
  };


  exports.getAllCommentsPerProject = (project_id) => {
    return new Promise((resolve, reject) => {
      let query = "select * from comment  where task_id is null &&  project_id=?";
  
      db.query(query, [project_id], (err, data) => {
        if (err) {
          reject("Unable to fetch the comment with given project_id " + project_id);
        }
        if (data.length == 0) {
          reject("No  comment with given project_id " + project_id);
        }
        resolve(data);
      });
    });
  };

  exports.getAllCommentsPerTask = (project_id,task_id) => {
    return new Promise((resolve, reject) => {
      let query = "select * from comment  where   project_id=? && task_id=?";
  
      db.query(query, [project_id,task_id], (err, data) => {
        if (err) {
          reject("Unable to fetch the comment with given task_id " + task_id);
        }
        if (data.length == 0) {
          reject("No  comment with given task_id " + task_id);
        }
        resolve(data);
      });
    });
  };

  
  