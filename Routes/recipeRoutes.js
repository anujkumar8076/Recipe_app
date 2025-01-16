const express=require('express');
const {createRecipe , searchController,getRecipe,deleteRecipeById,rateRecipe,comment} =require('../Controllers/recipeController');
const authMiddleware=require("../Middlerwares/auhtMiddleware");
const router=express.Router();

router.post('/',authMiddleware, createRecipe);
router.get('/search', authMiddleware,searchController);
router.get('/:id', authMiddleware, getRecipe);
router.delete('/:id', authMiddleware,deleteRecipeById);
router.post('/:id/rate', authMiddleware,rateRecipe);
router.post('/:id/comments', authMiddleware,comment);


module.exports=router;