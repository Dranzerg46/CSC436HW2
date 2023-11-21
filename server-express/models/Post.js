const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = new Schema(
    {
      //  id: { type: String, unique: true },
        title: {type: String, required: true},
        content: {type: String, required: true,},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        date : {type: Number, required: true},
        dateCompleted: {type: Number, required: true},
        booleanCompleted: {type: Number, required: true},
        //id: {type: String, required: true}

    },
  //  {
           // toJSON: { virtuals: true },
           /// toObject: { virtuals: true }
   // }
);

//PostSchema.virtual('id',{id: this.id});
//Export model
module.exports = mongoose.model('Post', PostSchema);
