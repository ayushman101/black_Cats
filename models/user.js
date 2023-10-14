const mongoose=require('mongoose');
const jwt= require('jsonwebtoken')

const userSchema= new mongoose.Schema(
	{
		userName: {
			type: String,
			unique: [true, "UserName must be unique"],
			required:[true,"Must provide Username"],
			minlength: [1,"Must be atleast one character long"]
		},
		email:{
			type: String,
			unique:[true, "Email already registered"],
			required:[true, "Must provide Email"],
			match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"]
		},

		password: {
			type: String,
			required: [true, "Must provide a password"],
			minlength:[8, "Must be atleast 8 characters long"]
		}
	}

)


UserSchema.methods.createJWT= function (){

		return jwt.sign({ userID: this._id, name: this.userName},
				{ process.env.JWT_SECRET},
				{expiresIn: "60d"}
		)
}

module.exports=mongoose.model('User',UserSchema);
