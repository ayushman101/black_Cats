const express= require('express');
const app= express();

app.use(express.json())

const start= async ()=>{

	try{
		app.listen(3000, ()=> {
			console.log("Server has started at port: 3000")
		})
	}

	catch (error){
		console.log(error);
	}
}

start();
