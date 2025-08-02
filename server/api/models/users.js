const mongoose =require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true
        },
        username:{
            type:String,
            unique:true,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        userStatus:{
            type:String,
            required:true,
            default:'Active'
        },
        fileName: String,
        filePath: String,
        fileSize: Number,
        friends: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
            }
          ]
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User;
