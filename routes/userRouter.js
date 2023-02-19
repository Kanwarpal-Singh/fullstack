const express = require("express");
const { UserModel } = require("../model/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userRouter = express.Router();

userRouter.get("/",async(req,res)=>{
    const allUsers = await UserModel.find();
    console.log(allUsers)
    res.send(allUsers)
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age,secretKey,dob} = req.body;
    try {
        const exuser = await UserModel.find({email})
        if(exuser.length>0){
            res.send({"msg":"Email Already exist, Please use a different Email"})
        }else{
            bcrypt.hash(pass,5,(err,hashed_pass)=>{
                if(err){
                    console.log(err);
                    res.send({"err":err.message})
                }else{
                    const user = new UserModel({name,email,pass:hashed_pass,age,secretKey,dob})
                    user.save()
                    console.log(user)
                res.send({"msg":`Welcome! Mr. ${user.name}, You have been resitered to the website!`})
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.send({"err":"Something went wrong"})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},"masai");
                    res.send({"msg":"Login Successful", token})
                    console.log("token:",token)
                }else{
                    res.send({"error":"Please Check you Password!"})
                    console.log("err")
                }
            })
        }else{
            res.send("User Not Found!")
            console.log("Please sign up first!")
        }
    } catch (error) {
        console.log("error:",error) 
       res.send("error:",error)
    }
})

userRouter.patch("/changepassword",async(req,res)=>{
    const { email,newpass,secretKey,dob } = req.body;
    try {
        bcrypt.hash(newpass,5,(err,hashed_pass)=>{
            if(err){
                res.send({"msg":err.message})
            }else{
                let user  = UserModel.findOneAndUpdate({$and:[email,secretKey,dob]},{pass:hashed_pass})
                console.log("user:",user)
                res.send("Password has been changed successfully!")
            }
        })
    } catch (error) {
        res.send({"msg":error.message})
        console.log("Something Went wrong")
    }
})
userRouter.delete("/delete/:id",async (req,res)=>{
    const id=req.params.id
    const User = await UserModel.findByIdAndDelete({_id:id})
    res.send({"msg":`${User.name} has been deleted`})
})
    

module.exports = {userRouter}