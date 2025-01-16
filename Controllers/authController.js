const User=require('../Models/User');
const Recipe=require('../Models/Recipe');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signup=async (req,res)=>{

try {
    const {username, email, password}=req.body;

if(!username || !email || !password){
    res.status(403).json({
        success:false,
        message:"All field are required to be filled"
    })
}
// const useremail=User.find({email});
// if(useremail){
//     res.status(403).json({
//         success:false,
//         message:"User already exists"
//     })
// }
const hashedPassword=await bcrypt.hash(password,10);
const user=new User({username, email, password:hashedPassword});
await user.save();
res.status(201).json({
    success:true,
    message:"User created successfully"
})
} catch (error) {
    console.log(error);
}

}

const login=async (req,res)=>{
const {email,password}=req.body;
if(!email || !password){
    res.json({
        success:false,
        message:"All field are required to be filled"
    })
}

const user=await User.findOne({email});
const isCorrectPassword=await bcrypt.compare(password, user.password)


if(!user || !isCorrectPassword){
    res.json({
        success:false,
        message:"Invalid email or password"
    })
}

const token=jwt.sign({id:user._id}, process.env.JWT_SECRET,{
    expiresIn:"1d"
});
res.status(200).json({
    success:true,
    message:"Login successfully",
    token
});
}

module.exports={
    signup:signup,
    login:login
}