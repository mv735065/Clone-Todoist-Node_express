const express=require('express');

const router=express.Router();
let Comment=require('../controller/comment.controller');

router.post('/',Comment.createComment);


router.get('/:id',Comment.getCommentById);
router.get('/',Comment.getAllComments);

router.delete('/:id',Comment.deleteComment);
router.delete('/',Comment.deleteAllComments);





router.patch('/:id',Comment.updateComment);




module.exports=router;