const User=require('../Models/User');

const  getAllUsers=async (req,res)=>{
    try {
        const users=await User.find().select("-password");
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}


const getUserProfile= async (req,res)=>{

    const id=req.user.id;
    try {
        const user=await User.findById(id).select("-password");
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

const updateUserProfile=async (req,res)=>{
    const {email,username}=req.body;
try {
    const user=await User.findByIdAndUpdate(
        req.user.id,
        {email,username},
        {new:true}
    );
    res.status(200).json({
        message:"updated succesfully",
        user
    })
} catch (error) {
    console.log(error);
}


}

const followTheUser= async (req,res)=>{
    try {
        const userToBeFollowed=await User.findById(req.params.userId);
        if(!userToBeFollowed){
            return res.status(404).json({
                message:"User not found"
            })
        }
const user=await User.findById(req.user.id);
if(!user.following.includes(userToBeFollowed._id)){
    user.following.push(userToBeFollowed._id);
    await user.save();
}

res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAllUsers:getAllUsers,
    getUserProfile:getUserProfile,
    updateUserProfile:updateUserProfile,
    followTheUser:followTheUser
}