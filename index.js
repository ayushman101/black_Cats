const express= require('express');
const app= express();
require('dotenv').config()

app.use(express.json())



const start= async ()=>{

	try{
		app.listen(process.env.PORT, ()=> {
			console.log("Server has started at port: 3000")
		})
	}

	catch (error){
		console.log(error);
	}
}

start();
