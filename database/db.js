const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

const connecttodb = async () => {
    await mongoose.connect(process.env.URI).then((res) =>{
        console.log("mongodb connected successfully");
    });
};

module.exports=connecttodb;