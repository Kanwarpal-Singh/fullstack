const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    console.log(token)
    if(token){
        jwt.verify(token,"masai", (err, decoded)=>{
            
            if(decoded){
                // console.log(decoded)
                req.body.user =  decoded.userID
                next()
            }else{
                res.send("please login first")
            }
        })
    }else{
        res.send("Please login first")
    }
}

module.exports ={
    authenticate
}