const Users= require('../models/user')
const cryptojs= require('crypto-js')

const login= async (req, res)=>{

	const {email, password}= req.body;


	try{

	const user= await Users.findOne({email})

	if(!user)
		{
		console.log("user not found")
		res.status(404).json("Wrong Username or Password")
		}
	{
	bytes= cryptojs.AES.decrypt(user.password, process.env.JWT_SECRET)
	const originalPassword= bytes.toString(cryptojs.enc.Utf8)

	if(originalPassword!==password)
		{
			console.log("Wrong password")
			res.status(404).json("Wrong Username or password")
		}
		else{

			const token= user.createJWT();
			res.status(200).json({user_info:{email: user.email, username: user.userName, user_id: user._id},token});

			}
		}
	}

	catch (error){
		res.status(501).json(error);
	}
}


module.exports=login;
