const userServices = require("../services/userServices");
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const file = req.file;

    try {
    if (!fullname || !username || !email || !password) {
        throw new Error("Please fill all the fields");
      }
      const newUser = await userServices.createUser({
        fullname,
        email,
        password,
        username,
      })

   res.status(201).json({message:"User Account Created",data:newUser})
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        return res.status(400).json({
          message: "Email already exists. Please use a different email address.",
        });
      } else if (error.keyPattern?.username) {
        return res.status(400).json({
          message: "Username already exists. Please use a different username.",
        });
      } else {
        return res.status(400).json({ message: "Duplicate field value entered." });
      }
    }

    res.status(500).json({ message: error.message || "An error occurred." });
  }
  
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, userId, role, useremail, uname } =
      await userServices.authenticateUser({ email, password });
    res.json({ token, userId, role, useremail, uname });
    console.log(token, userId, role, useremail, uname);
  } catch (error) {
    res.status(500).json({ message: "Invalid username or password" });
    console.log(error);
  }
};

exports.getUsers = async (req, res) => {
 try {
  const users = await userServices.getUsers();

  res.status(200).json({data:users});
 } catch (error) {
  res.status(500).json(error)
 }
}

exports.getUserById = async (req, res) => {
  try {
    const userid = req.params.userid;

    const user = await userServices.getUserById(userid);

    res.status(200).json({data:user});
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await userServices.getUserByUsername(username);

    res.status(200).json({data:user});
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.editUser = async (req,res) => {
  try {
    const userid = req.params.userid;
    const userData = req.body;

    const user = await userServices.editUser(userid, userData);

    res.status(200).json({data:user,message:"User Details Updated"})
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.editprofPic = async (req,res) => {
  try {
    const userid = req.params.userid;
    const file = req.file;

    const userData = {
      fileName:file.originalname,
      filePath:file.path,
      fileSize:file.size
    }

    const user = await userServices.editUser(userid, userData);

    res.status(200).json({data:user,message:"User Details Updated"})
  } catch (error) {
    res.status(500).json(error)
  }
}

exports.deleteUser = async (req,res) => {
  try {
    const userid = req.params.userid;

    const user = await userServices.deleteUser(userid);

    res.status(200).json({message:"User Deleted",user})
  } catch (error) {
    res.status(500).json(error);
  }
}