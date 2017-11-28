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

/**
 * Show all datas
 */
function showDatas(req, res) {
  // get all datas   
  Data.find({}, (err, datas) => {
    if (err) {
      res.status(404);
      res.send('Datas not found!');
    }

    // return a view with data
    res.render('datas', { 
      datas: datas,
      user : req.user,
      success: req.flash('success')
    });
  });
}

function retDatas(req, res) {
  // get all datas   
  return Data.find({}, (err, datas) => {
    if (err) {
      res.status(404);
      res.send('Datas not found!');
    }
  });
}
/**
 * Show a single data
 */
function showSingle(req, res) {
  // get a single data
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

/**
 * Seed the database
 */
function seedDatas(req, res) {
  // create some datas
  const datas = [
    { input: 'Data1', output: 'Data1' },
    { input: 'Data2', output: 'Data2' }
  ];

  // use the Data model to insert/save
  Data.remove({}, () => {
    for (data of datas) {
      var newData = new Data(data);
      newData.save();
    }
  });

  // seeded!
  res.send('Database seeded!');
}

/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('create', {
    user : req.user,
    errors: req.flash('errors')
  });
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
  // validate information
  req.checkBody('input', 'Input is required.').notEmpty();
  req.checkBody('output', 'Output is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect('/datas/create');
  }

  // create a new data
  const data = new Data({
    input: req.body.input,
    output: req.body.output
  });

  // save data
  data.save((err) => {
    if (err)
      throw err;

    // set a successful flash message
    req.flash('success', 'Successfuly created data!');

    // redirect to the newly created data
    res.redirect(`/datas/${data.slug}`);
  });
}

/**
 * Show the edit form
 */
function showEdit(req, res) {
  Data.findOne({ slug: req.params.slug }, (err, data) => {
    res.render('edit', {
      data: data,
      user : req.user,
      errors: req.flash('errors')
    });
  });
}

/**
 * Process the edit form
 */
function processEdit(req, res) {
  // validate information
  req.checkBody('input', 'Input is required.').notEmpty();
  req.checkBody('output', 'Output is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/datas/${req.params.slug}/edit`);
  }

  // finding a current data
  Data.findOne({ slug: req.params.slug }, (err, data) => {
    // updating that data
    data.input        = req.body.input;
    data.output       = req.body.output;

    data.save((err) => {
      if (err)
        throw err;

      // success flash message
      // redirect back to the /datas
      req.flash('success', 'Successfully updated data.');
      res.redirect('/datas');
    });
  });

}

function deleteData(req, res) {
  Data.remove({ slug: req.params.slug }, (err) => {
    // set flash data
    // redirect back to the datas page
    req.flash('success', 'Data deleted!');
    res.redirect('/datas');
  });
}