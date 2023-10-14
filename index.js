const express= require('express');
const app= express(); //   server app
require('dotenv').config() // environment variables
const connectDB=require('./db/connect')  //database connector
const userRouter=require('./routes/userRouter')


app.use(express.json())

app.use('api/users',userRouter)

const start= async ()=>{

	try{
		await connectDB(process.env.MONGO_URL)
		app.listen(process.env.PORT, ()=> {
			console.log("Server has started at port: 3000")
		})
	}

	catch (error){
		console.log(error);
	}
}

start();
