import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    username : {
        type: String
    },

    password : {
        type: String
    }


},
 {timestamps:true}
);

export default mongoose.model('Users', UserSchema);


