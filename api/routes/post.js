const { getPost, createPost, updatePost, deletePost, likePost,getPostSearch,getSinglePost } = require('../controller/postController');
const tokenValidate = require('../middleware/validateTOken');

const router = require('express').Router();



router.get('/', getPost)
router.get('/search', getPostSearch);
router.get('/:id', getSinglePost);
router.post('/', tokenValidate, createPost)
router.patch('/:id', tokenValidate, updatePost)
router.delete('/:id', tokenValidate, deletePost)
router.patch('/:id/like', tokenValidate, likePost)



module.exports = router;