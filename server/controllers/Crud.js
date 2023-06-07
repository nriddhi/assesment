import productData from '../models/Data.js'

export const createData = async(req, res) => {

    try {
          const data = new productData({
            name : req.body.name,
            price : req.body.price,
            category : req.body.category
          });

          const user = await data.save();
     
          return res.status(200).json({msg:"Data saved successfully"})

    }
    catch (err) {
       return res.status(500).send(err);
    }

    
}

export const getData = async(req, res) => {

    try {

           const allData = await productData.find();
           res.json(allData);
    }
    catch(err) {
        return res.status(500).send(err);
    }

}

export const editData = async(req, res) => {
    
    try {
        const Data = await productData.findById(req.params.id);
        const updateData = await productData.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
        return res.status(200).json({msg: 'Data updated successfully'});
 }
 catch(err) {
     return res.status(500).json(err);
 }
}

export const deleteData = async(req, res) => {
    const ids = req.body.ids;
    try {
      const result = await productData.deleteMany({ _id: { $in: ids } });
      res.send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };