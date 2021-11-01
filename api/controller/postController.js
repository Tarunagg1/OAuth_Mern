const { Mongoose } = require('mongoose');
const postMessageModel = require('../models/postMessages');


const getPost = async (req, res) => {
    try {
        const postMessage = await postMessageModel.find({});
        if (postMessage.length > 0) {
            return res.status(200).json({ postMessage });
        }
        return res.status(200).json({ postMessage: [] });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const createPost = async (req, res) => {
    const body = req.body;
    try {
        const newPost = new postMessageModel(body);
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
    if (!Mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
    }
    try {
        const resp = await postMessageModel.findByIdAndRemove(id);
        return res.status(200).json({ resp });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const likePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postMessageModel.findById(id);
        const resp = await postMessageModel.findByIdAndUpdate(id, { likecount: post.likecount + 1 }, { new: true });
        return res.status(200).json({ resp });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
}


module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost
}