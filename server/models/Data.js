import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({

    name : {
        type: String,
    },

    price : {
        type: String,
    },

    category : {
        type: String,
    }


},
 {timestamps:true}
);

export default mongoose.model('Datas', DataSchema);


