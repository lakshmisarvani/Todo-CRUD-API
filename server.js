const express=require('express');
const connecttodb=require('./database/db.js');
const  Todo  = require('./models/todo.model.js');
const app= express();
const port = process.env.PORT || 3000

//middleware
app.use(express.json());


connecttodb();

//declaring an api
// app.get("/",(req,res)=>{
//     res.send({
//         success : true,
//         msg : "server is active",
//     })
// })

//Todo-api

app.get("/todos",async (req,res)=>{
    try{
        const result=await Todo.find();
        res.send({
            success: true,
            msg : "todo lists retrieved successfully",
            data: result
        })
    }
    catch(error){
        res.send({
            success: false,
            msg : "failed to retrieve todo lists ",
            data: result,
        });

    }
});


//post
app.post("/create-todo",async (req,res)=>{
    const todoDetails=req.body;
    try{
        const result=await Todo.create(todoDetails);
        res.send({
            success:true,
            msg:'Todo is created successfully',
            data:result,
        });
    }
    catch(error){
        res.send({
            success:false,
            msg:'Failed to create todo',
            data:result,
        });
    }
});


app.get("/:todoId",async(req,res)=>{
    const todoId=req.params.todoId;
    try{
        const result=await Todo.findById(todoId);
        res.send({
            success:true,
            msg:'Todo is retrieved successfully',
            data:result,
        })
    }
    catch(error){
        res.send({
            success:false,
           msg:'Failed to retrieve todo',
           data:[],
       });
    }
})

//update
app.patch("/:todoId",async(req,res)=>{
    const todoId=req.params.todoId;
    const updatedTodo=req.body;
    try{
        const result=await Todo.findByIdAndUpdate(todoId,updatedTodo,{
            new:true,
        });
            res.send({
                success:true,
                msg:"Todo is updated successfully",
                data:result
            })
        }
    catch(error){
        res.send({
            success:false,
            msg:"Failed To update",
            data:result
        })
    }
})


app.delete("/delete/:todoId",async(req,res)=>{
    try{
        const result=await Todo.findByIdAndDelete(req.params.todoId);
        res.send({
            success:true,
            msg:"Todo is deleted successfully",
            data:null,
        });
    }
    catch(error){
        res.send({
            success:false,
            msg:"Failed to delete",
            data:null,
        });

    }
})

//connect mongodb with server
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})