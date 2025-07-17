const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = require('../middleware/imageupload');
const userController = require('../controllers/userController');

const authMiddleware = require('../middleware/authCheckmiddleware');
// const roleCheckMiddleware = require('../middleware/roleCheckMiddleware');

router.post("/register",upload.single('file'),userController.createUser);
router.post("/login", userController.loginUser);
router.get("/",authMiddleware,userController.getUsers);
router.get("/:userid",authMiddleware,userController.getUserById);
router.get("/username",userController.getUserByUsername);
router.put("/:userid",userController.editUser);
router.put("/editprof/:userid",upload.single('file'),userController.editprofPic);
router.delete("/:userid",userController.deleteUser);

module.exports = router;



