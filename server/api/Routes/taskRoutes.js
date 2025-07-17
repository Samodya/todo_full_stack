const express = require("express");
const router = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authCheckmiddleware');

router.post("/",authMiddleware,taskController.createTask);
router.get("/",taskController.getTasks);
router.get("/:taskId",taskController.getTaskbyId);
router.get("/user/:userId",taskController.getTaskbyUserId);
router.put("/:taskId",taskController.editTask);
router.delete("/:taskId",taskController.deleteTasks);

module.exports = router