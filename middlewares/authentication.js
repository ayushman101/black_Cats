const jwt= require('jsonwebtoken')

const auth = async (req,res, next)=> {

	const authHeader=req.headers.token;

	if(!authHeader || !authHeader.startsWith('Bearer '))
		res.status(403).json("Authentication Invalid")

	else
	{
		token=authHeader.split(" ")[1]

		try{
		await jwt.verify(token, process.env.JWT_SECRET, (err,user)=>{
			
			if(err)
				res.status(403).json("Token is Invalid")

			req.user=user

			console.log(user)

			next();
		})

		}

		catch(err) {
			console.log(err)
			res.status(501).json("Authentication Error")
		}
	}
}

module.exports=auth;
