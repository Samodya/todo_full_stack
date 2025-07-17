const mongoose =require('mongoose')

const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    date: {
        type: Date,
        required: true,
      },
    time:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"new"
    }
},{
    timestamps:true
})

const Tasks = mongoose.model('taskss', taskSchema)

module.exports = Tasks 