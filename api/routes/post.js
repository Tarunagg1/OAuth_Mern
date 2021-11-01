const { getPost, createPost, updatePost, deletePost, likePost } = require('../controller/postController');

const router = require('express').Router();



router.get('/', getPost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id/like', likePost)



module.exports = router;