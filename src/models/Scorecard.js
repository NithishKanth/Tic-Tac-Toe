import {Model, model,models,Schema} from 'mongoose';

const scoreCardSchema = new Schema({
    email:{type:String,unique:true,required:true},
    score:{type:Number,default:0}
});

const ScoreCardModel = models?.ScoreCard || model("ScoreCard",scoreCardSchema);

export default ScoreCardModel;