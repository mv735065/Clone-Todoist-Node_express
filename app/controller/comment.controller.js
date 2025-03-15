let Comment=require('../models/comments.model');

exports.createComment=async(req,res)=>{
     try {
        if (!req.body || Object.keys(req.body).length === 0) {
          throw new Error(
            "Enter the details of comment or some fileds are data missing"
          );
        }
        let comment = await Comment.createComment(req.body);
    
        res.status(201).send(comment);
      } catch (err) {
        res.status(500).send({
          message:
            err || "unbale to create comment or some fileds are data missing ",
        });
      }
}

exports.getCommentById = async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      throw new Error("Please provide id as number");
    }

    let comment =await Comment.getCommentById(id);
    res.send(comment);
  } catch (err) {
    res.status(500).send({
      message: ""+err
    });
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    let comments = await Comment.getAllComments();
    res.send(comments);
  } catch (err) {
    res.status(400).send({ message: err.message || err} );
  }
};

exports.deleteComment = async (req, res, next) => {

  try {
    let id = req.params.id;
    if (isNaN(id)) {
      throw new Error("Please provide id as number");
    }

    let comment = await Comment.deleteComment(id);
    res.send(comment);
  } catch (err) {
    res.status(500).send({message:`${err.message || "unbale to delete comment"}`});
  }
};

exports.deleteAllComments = async (req, res, next) => {
  try {
    let data = await Comment.deleteAllComments();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({message:`${err.message || "unbale to delete all comments"}`});
  }
};


exports.updateComment = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body) == 0) {
      throw new Error("Please provide content to create Comment");
    }
    if (!req.params.id || isNaN(req.params.id)) {
      throw new Error("Please provide id as a  number ");
    }
    let result = await Comment.updateComment(req.body, req.params.id);

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({message:`${err.message || "unbale to update comment"}`});
  }
};
