const taskServices = require("../services/taskServices");

exports.createTask = async (req, res) => {
    try {
        const taskDetails = req.body;

        const task = taskServices.createTask(taskDetails);
        res.status(201).json({Message:"Task created",task})
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.getTasks = async (req,res) => {
    try {
        const tasks = await taskServices.getTasks();
        res.status(200).json({data:tasks,message:"tasks recieved"});
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.getTaskbyId = async (req,res) => {
    try {
        const taskId = req.params.taskId;
        const task = await taskServices.getTasksById(taskId);
        res.status(200).json({data:task,message:"tasks recieved"});
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.getTaskbyUserId = async (req,res) => {
    try {
        const userId = req.params.userId;
        const tasks = await taskServices.getTasksByUserid(userId);
        res.status(200).json({data:tasks,message:"tasks recieved"});
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.editTask = async (req,res) => {
    try {
        const taskId = req.params.taskId;
        const taskDetails = req.body;

        const tasks = await taskServices.editTask(taskId,taskDetails);

        res.status(200).json({message:"task Edited succesfully!",tasks})
    } catch (error) {
        res.status(500).json(error); 
    }
}

exports.deleteTasks = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const tasks = await taskServices.deleteTask(taskId);

        res.status(200).json({message:"data deleted successfully", tasks})
    } catch (error) {
        res.status(500).json(error); 
    }
}