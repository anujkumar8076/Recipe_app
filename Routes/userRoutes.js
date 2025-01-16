const express=require('express');
const {getAllUsers,getUserProfile,updateUserProfile,followTheUser}=require('../Controllers/userController');
const authMiddleware=require('../Middlerwares/auhtMiddleware');
const router=express.Router();

router.get('/all', authMiddleware, getAllUsers);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

router.post('/follow/:userId', authMiddleware, followTheUser);

module.exports=router;

