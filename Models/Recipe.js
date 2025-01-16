const mongoose=require('mongoose');

const recipeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:[String],
        required:true
    },
    instruction:{
        type:String,
        required:true
    },
    auther:{
        type:mongoose.Types.ObjectId, ref:"User"
    },
    tags:{
        type:[String]
    },

    ratings:[
        {
            user:{
                type:mongoose.Types.ObjectId, red:"User"
            }, 
            rating:Number,
        },
    ], 
    comment:[
        {
            user:{
                type:mongoose.Types.ObjectId, red:"User"
            },
            comment:String,
        },
    ],
});

const Recipe=new mongoose.model("Recipe", recipeSchema);

module.exports=Recipe;