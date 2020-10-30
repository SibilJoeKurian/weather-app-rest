const express=require('express')
const temperature=require('./address')
const app=express();
const port=process.env.PORT||3000;

//to handle json data in post request
app.use(express.json())
//post request for localhost:3000/weather
app.post("/weather",(req,res)=>{
    if(req.body){
        var data=req.body.weather;
        console.log(data)
        temperature(data).then((data)=>res.send(data))
    }
})

app.listen(port,()=>{
    console.log("The app is running in port"+port)
})