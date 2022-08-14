const Message = require("../models/Message");


const getAllmessages = async (req, res) => {
    const { limit = 5, init = 0 } = req.query;
    
    const [ total, messages ] = await Promise.all([
        Message.countDocuments(),
        Message.find()
            .skip( Number( init ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        messages
    });
  };
const getAllmessagesByNumber = async (req, res) => {
    const { number } = req.params;
    
    const { limit = 5, init = 0 } = req.query;
    
    const [ total, messages ] = await Promise.all([
        Message.countDocuments({number}),
        Message.find({number})
            .skip( Number( init ) )
            .limit(Number( limit ))
    ]);

    res.json({
        total,
        messages
    });
  };

  module.exports = {
    getAllmessages,
    getAllmessagesByNumber
  }