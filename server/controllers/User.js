import Users from '../models/User.js';
import bcrypt from 'bcrypt';

export const createUser = async(req, res) => {

    try {

        const username = await Users.findOne({ username: req.body.rusername });
        if(username) return res.status(400).json({code:'me400',msg:'User already exists'});

        const salt = await bcrypt.genSalt(15);
        const hashedPass = await bcrypt.hash(req.body.rpassword, salt);

          const data = new Users({
            username : req.body.rusername,
            password: hashedPass
          });

          const user = await data.save();
     
          return res.status(200).json({user:user.username});

    }
    catch (err) {
       return res.status(500).send(err);
    }

    
}

export const loginUser = async(req, res) => {

  try {
      
      const username = await Users.findOne({ username: req.body.username });
      if(!username) return res.status(404).json({code:'lu404',msg:'Username Not Found!'});

      const validated = await bcrypt.compare(req.body.password, username.password);
      if(!validated) return res.status(404).json({code:'lw404',msg:'Wrong credentials!'});

      return res
      .status(200)
      .json({user:username.username});

  }
  catch (err) {
     return res.status(500).send(err);
  }

  
}