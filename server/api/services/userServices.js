const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (userData) => {
  userData.password = await bcrypt.hash(userData.password, 10);
  const user = new User(userData);
  return await user.save();
};

exports.authenticateUser = async (credentials) => {
  const user = await User.findOne({ email: credentials.email });
  if (user && (await bcrypt.compare(credentials.password, user.password))) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1D" }
    );
    return {
      token,
      userId: user._id,
      role: user.role,
      useremail: user.email,
      uname: user.username,
    };
  }
  throw new Error("Authentication failed.");
};

exports.getUsers = async () => {
  try {
    return await User.find()
  } catch (error) {
    throw new Error("data does not exist!")
  }
}

exports.getUserById = async (userid) => {
  try {
    const user = await User.findById(userid);

    return user;
  } catch (error) {
    throw new Error("user data does not exist!")
  }
}

exports.getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({username:username});

    return user;
  } catch (error) {
    throw new Error("user data does not exist!")
  }
}

exports.editUser = async (userid, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userid,userData,{new:true});
    return user;
  } catch (error) {
    throw new Error("user data updating error!")
  }
}


exports.deleteUser = async (userid) => {
  try {
    const user = await User.findByIdAndDelete(userid);
    return user;
  } catch (error) {
    throw new Error("user data deleting error!")
  }
}

