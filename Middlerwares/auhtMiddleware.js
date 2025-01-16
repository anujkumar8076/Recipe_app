const jwt=require('jsonwebtoken');
const User=require('../Models/User');

const authMiddleware= async (req,res,next)=>{
    const token=req.headers["authrization"]?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token not provided...."
        })
    }

    try {
        const decode=jwt.verify(token, process.env.JWT_SECRET);
        req.user=await User.findById(decode.id);
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports=authMiddleware;
