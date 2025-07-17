const Tasks = require("../models/tasks");

exports.createTask = async (taskDetails) => {
  try {
    const task = new Tasks(taskDetails);
    return await task.save();
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTasks = async () => {
    try {
        return await Tasks.find()
    } catch (error) {
        throw new Error("data does not exist!")
    }
}

exports.getTasksById = async (taskId) => {
    try {
        const task = await Tasks.findById(taskId);

        return task;
    } catch (error) {
        throw new Error("data does not exist!")
    }
}

exports.getTasksByUserid = async (userId) => {
    try {
        const tasks = await Tasks.find({
            createdBy:userId
        })
        return tasks;
    } catch (error) {
        throw new Error("data does not exist!")
    }
}

exports.editTask = async (taskId,taskDetails) => {
    try {
        const task = await Tasks.findByIdAndUpdate(taskId,taskDetails, {new:true});

        return task;
    } catch (error) {
        throw new Error("Error while editing data!")
    }
}

exports.deleteTask = async (taskId) => {
    try {
        const task = await Tasks.findByIdAndDelete(taskId);

        return task;
    } catch (error) {
        throw new Error("Error while deleting data!")
    }
}
