const express=require("express")
const {NoteModel}=require("../model/NoteModel")
const noteRouter=express.Router()

noteRouter.get("/", async(req,res)=>{
    const notes = await NoteModel.find()
    console.log("notes:",notes)
    res.send({'Response':notes})
})
noteRouter.get("/get/:id", async(req,res)=>{
    const id=req.params.id 
    const note=await NoteModel.findOne({"_id":id})
    console.log(note)
    const userID=req.body.user
    console.log("author id from db",note.user)
    console.log("from req.body",userID)
    try{
        if(note.user!==userID){
            res.send({"msg":"You are not authorized to perform this operation"})
        } else {
            const note = await NoteModel.find({"_id":id})
            res.send("here is the note")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})
noteRouter.post("/create", async (req,res)=>{
const payload=req.body
const new_note=new NoteModel(payload)
await new_note.save()
console.log({"msg":`Note: ${new_note.title} has been created`})
res.send({"msg":`Note: ${new_note.title} has been created`})
})

noteRouter.delete("/delete/:id", async(req,res)=>{
    const id=req.params.id 
    const note=await NoteModel.findOne({"_id":id})
    console.log(note)
    const userID=req.body.user
    console.log("author id from db",note.user)
    console.log("from req.body",userID)
    try{
        if(note.user!==userID){
            res.send({"msg":"You are not authorized to perform this operation"})
        } else {
            await NoteModel.findByIdAndDelete({"_id":id})
            res.send("Deleted the note")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})



noteRouter.patch("/update/:id",async (req,res)=>{
    const payload=req.body //ok
    const id=req.params.id //ok
    const note=await NoteModel.findOne({"_id":id})
    console.log(note)
    const userID=req.body.authorID
    console.log("author id from db",note.authorID)
    console.log("from req.body",userID)
    try{
        if(note.authorID!==userID){
            res.send({"msg":"You are not authorized to perform this operation"})
        } else {
            await NoteModel.findByIdAndUpdate({"_id":id},payload)
            res.send("Updated the note")
        }
    }catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong"})
    }
})
    

module.exports = {
    noteRouter
}