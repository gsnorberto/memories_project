import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
        
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post)

    try{
        await newPost.save();

        //successful creation
        res.status(201).json({ message: 'Post Criado' });
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body; 

    // Chedk id
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Nenhum Post com esse ID');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json( updatedPost );
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    //Check id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('Nenhum Post com esse ID');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}