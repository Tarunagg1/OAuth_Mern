const postMessageModel = require('../models/postMessages');


const getPost = async (req, res) => {
    let { page } = req.query;
    if (page === undefined) {
        page = 1;
    }
    try {
        let LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        let total = await postMessageModel.countDocuments();

        const postMessage = await postMessageModel.find({}).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        if (postMessage.length > 0) {
            return res.status(200).json({ postMessage, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });
        }
        return res.status(200).json({ postMessage: [], currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT) });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getSinglePost = async (req, res) => {
    let { id } = req.params;
    try {
        const postMessage = await postMessageModel.findById(id);
        return res.status(200).json({ postMessage });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const getPostSearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    try {
        const title = new RegExp(searchQuery, 'i');
        let query = null;
        if(title){
            query = { $or: [{ title }] };
        }

        if(tags){
            query = { $or: [ { title }, { tags: { $in: tags.split(',') } } ]};
        }

        const postMessage = await postMessageModel.find(query);

        if (postMessage.length > 0) {
            return res.status(200).json({ data: postMessage });
        }
        return res.status(200).json({ data: [] });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    const body = req.body;
    try {
        const newPost = new postMessageModel({ ...body, creator: req.name, creatorid: req.userId });
        await newPost.save();
        return res.status(200).json(newPost);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


const updatePost = async (req, res) => {
    const { id } = req.params;
    try {
        const resp = await postMessageModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).json({ resp });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const resp = await postMessageModel.findByIdAndRemove(id);
        return res.status(200).json({ resp });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;
    if (!req.userId) {
        return res.status(400).json({ message: "You have not access" });
    }

    try {
        const post = await postMessageModel.findById(id);
        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index == -1) {
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike or remove
            post.likes.filter((id) => id !== String(req.userId));
        }

        const resp = await postMessageModel.findByIdAndUpdate(id, post, { new: true });
        return res.status(200).json({ resp });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostSearch,
    getSinglePost
}