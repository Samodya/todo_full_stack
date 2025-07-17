const express = require("express");
const cors = require("cors");
const connectDb = require("./config")
require("dotenv").config();

const userRoutes = require('./api/Routes/userRoutes');
const taskRoutes = require('./api/Routes/taskRoutes');

connectDb()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static('files'));

app.use("/api/users",userRoutes);
app.use("/api/tasks",taskRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
