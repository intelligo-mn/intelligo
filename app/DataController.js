const Data = require('../models/Data');

module.exports = {
  showDatas: showDatas,
  showSingle: showSingle,
  seedDatas: seedDatas,
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit,
  retDatas: retDatas,
  deleteData: deleteData
}

function showDatas(req, res) {
  Data.find({}, (err, datas) => {
    if (err) {
      res.status(404);
      res.send('Datas not found!');
    }

    res.render('datas', { 
      datas: datas,
      user : req.user,
      success: req.flash('success')
    });
  });
}

function retDatas(req, res) {
  return Data.find({}, (err, datas) => {
    if (err) {
      res.status(404);
      res.send('Datas not found!');
    }
  });
}

function showSingle(req, res) {
  Data.findOne({ slug: req.params.slug }, (err, data) => {
    if (err) {
      res.status(404);
      res.send('Data not found!');
    }

    res.render('single', { 
      data: data,
      user : req.user,
      success: req.flash('success')
    });
  });
}

function seedDatas(req, res) {
  const datas = [
    { input: 'Data1', output: 'Data1' },
    { input: 'Data2', output: 'Data2' }
  ];

  Data.remove({}, () => {
    for (data of datas) {
      var newData = new Data(data);
      newData.save();
      
    }
  });
  
  res.send('Database seeded!');
}

function showCreate(req, res) {
  res.render('create', {
    user : req.user,
    errors: req.flash('errors')
  });
}

function processCreate(req, res) {
  req.checkBody('input', 'Input is required.').notEmpty();
  req.checkBody('output', 'Output is required.').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/datas/create');
  }
  const data = new Data({
    input: req.body.input,
    output: req.body.output
  });

  data.save((err) => {
    if (err)
      throw err;
    req.flash('success', 'Successfuly created data!');
    res.redirect(`/datas/${data.slug}`);
  });
}

function showEdit(req, res) {
  Data.findOne({ slug: req.params.slug }, (err, data) => {
    res.render('edit', {
      data: data,
      user : req.user,
      errors: req.flash('errors')
    });
  });
}

function processEdit(req, res) {
  req.checkBody('input', 'Input is required.').notEmpty();
  req.checkBody('output', 'Output is required.').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/datas/${req.params.slug}/edit`);
  }
  Data.findOne({ slug: req.params.slug }, (err, data) => {
    data.input        = req.body.input;
    data.output       = req.body.output;

    data.save((err) => {
      if (err)
        throw err;
      req.flash('success', 'Successfully updated data.');
      res.redirect('/datas');
    });
  });

}

function deleteData(req, res) {
  Data.remove({ slug: req.params.slug }, (err) => {
    req.flash('success', 'Data deleted!');
    res.redirect('/datas');
  });
}