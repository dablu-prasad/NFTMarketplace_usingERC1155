
const mongoose=require("mongoose");

require("dotenv").config();



mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then((data)=>console.log(`Mongodb connected with server: ${data.connection.host}`)).catch((error)=>console.log(error.message))
