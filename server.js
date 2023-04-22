import express from 'express';
import dotenv from 'dotenv';
import get from 'axios';
import cors from 'cors';
const app = express();


dotenv.config({
    path:'./config.env',
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(cors());
app.get('/getWeatherInfo/city/', async (req, res) =>{
    const city = req.query.city;
 try{
    const result =  await get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aa918e78a5a4b22fc8b38db4e353619d`);

    res.json(result.data);
  } catch (err){
    //console.error(`failed api due to ${err.message}`);
    res.status(404).json({
      code:404,
      success:false,
      message:'city not found',
    })
}
})

app.listen(process.env.PORT,()=>{
    console.log("app working");
})