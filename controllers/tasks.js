const Task = require('../models/Task');

//全件参照
const getAllTasks = async (req, res) => {
    try {
        const getAllTask = await Task.find (req.body);
        res.status(200).json(getAllTask);
    } catch (error) {
        res.status(500).json(error);
    }
}

//新規作成
const creatTasks = async (req, res) => {
    try {
        const createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    } catch (error) {
        res.status(500).json(error);
    }
}

//1件取得
const getSingleTasks = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({_id: req.params.id});
        if(!getSingleTask) {
            return res.status(404).json(`_id:${req.params.id}は存在しません。`);
        }
        res.status(200).json(getSingleTask);
    } catch (error) {
        res.status(500).json(error);
    }
}

//更新
const updateTasks = async (req, res) => {
    try {
        const updateTask = await Task.findOneAndUpdate({_id: req.params.id}, 
            req.body, {
            new: true,
            runValidators: true,
        });
        if(!updateTask) {
            return res.status(404).json(`_id:${req.params.id}は存在しません。`);
        }
        res.status(200).json(updateTask);
    } catch (error) {
        res.status(500).json(error);
    }
}

//タスクを削除
const deleteTasks = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete({_id: req.params.id});
        if(!deleteTask) {
            return res.status(404).json(`_id:${req.params.id}は存在しません。`);
        }
        res.status(200).json(deleteTask);
    } catch (error) {
        res.status(500).json(error);　
    }
}

module.exports = {
    getAllTasks,
    creatTasks,
    getSingleTasks,
    updateTasks,
    deleteTasks
}