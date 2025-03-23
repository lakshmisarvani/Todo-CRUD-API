const mongoose=require('mongoose');

const {Schema,model}=mongoose;

const todoschema=new Schema({
    text : {type:String, required : true},
    priority:{type:String, required: true},
    deadline:{type:String, required: true},
});


//checks whether todo is already present in database or not
const todo = mongoose.models.todo || mongoose.model("todo",todoschema);

module.exports=todo;

