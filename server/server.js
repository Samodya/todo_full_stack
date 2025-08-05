const express = require("express");
const cors = require("cors");
const connectDb = require("./config")
require("dotenv").config();

const userRoutes = require('./api/Routes/userRoutes');
const taskRoutes = require('./api/Routes/taskRoutes');
const requestRoutes = require('./api/Routes/requestsRoutes')

connectDb()

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static('files'));

app.use("/api/users",userRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/request",requestRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
