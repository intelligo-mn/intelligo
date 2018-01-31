const Data = require('../models/Data');

module.exports = {

  showDatas(req, res) {
    Data.find({}, (err, datas) => {
      if (err) {
        res.status(404);
        res.send('Datas not found!');
      }
      res.json(datas);
    });
  }
}
