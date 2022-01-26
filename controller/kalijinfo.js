import mongoose from "mongoose";
import kalijsInfo from "../models/kalijsInfo.js";

export const getKal = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        const total = await kalijsInfo.countDocuments({});
        const kal = await kalijsInfo.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.json({ data: kal, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error });
        console.log(error);
    }
};
export const getKalijs = async (req, res) => {
    try {
        const LIMIT = 4;
        const kalijsInfos = await kalijsInfo.find().limit(LIMIT);
        res.status(200).json(kalijsInfos);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
};
export const getKalij = async (req, res) => {
    const {id} = req.params;
    try {
        const kalijsInfos = await kalijsInfo.findById(id);
        res.status(200).json(kalijsInfos);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
};
export const createKalij = async (req, res) => {

    const kalij = req.body;
    const newKalij = new kalijsInfo({...kalij, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newKalij.save();
        res.status(201).json(newKalij);
    } catch (error) {
        res.status(409).json(error);
    }
}

export const updateKalij = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, price } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Kalij with id: ${id}`);

    const updatedKalij = { creator, title, message, tags, selectedFile, _id: id, price};

    await kalijsInfo.findByIdAndUpdate(id, updatedKalij, { new: true });

    res.json(updatedKalij);
 }

export const deleteKalij = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    await kalijsInfo.findByIdAndRemove(id);
    res.json({message: 'Delete'})
    console.log(id, 'delete id');
}
export const likeKalij = async (req, res) => {
    const { id } = req.params;
    // adding the funcalatily to like only 1 by 1 user

    if (!req.userId) {return res.json({message: 'User cant like'})}
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Kalij with id ${id}`);
    const kalij = await kalijsInfo.findById(id);
    // if the user is already in the likesection or already have like the Kalij
    const index = kalij.likes.findIndex((id) => id === String(req.userId));
    // then he or she want to dislike
    if(index === -1) {
        // like the kalij
        kalij.likes.push(req.userId)
    }else{
        // dislike a kalij
      kalij.likes = kalij.likes.filter((id) => id !== String(req.userId))
    }
    const updatedKalij = await kalijsInfo.findByIdAndUpdate(id, kalij, { new: true });
    res.status(200).json(updatedKalij);
}