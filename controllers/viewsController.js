const Device = require('../models/deviceModel');
const Staff = require('../models/staffModel');
const Patient = require('../models/patientModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apifeatures');

exports.getDevices = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const devices = await Device.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('viewDevices', {
    devices
  });
});

exports.getAllPatients = catchAsync(async (req, res) => {
  const features = new APIFeatures(Patient.find(), req.query)
    //.find({duration: 5, difficulty: 'easy'})
    //.find().where('duration').equals("5")
    //find is like SELECT in SQL, returns an array of objects
    .filter()
    .sort()
    .limitFields()
    .pagination();

  //const docs = await features.query.explain();
  const patient = await features.query;

  //SEND RESPONSE
  res.status(200).render('viewPatients', {
    patients: patient
  });
  // res.status(200).json({
  //   patients: patient
  // });
});

exports.getAllDoctors = catchAsync(async (req, res) => {
  const features = new APIFeatures(Staff.find({ role: 'doctor' }), req.query)
    //.find({duration: 5, difficulty: 'easy'})
    //.find().where('duration').equals("5")
    //find is like SELECT in SQL, returns an array of objects
    .filter()
    .sort()
    .limitFields()
    .pagination();

  //const docs = await features.query.explain();
  const doctor = await features.query;

  //SEND RESPONSE
  res.status(200).render('viewDoctors', {
    doctors: doctor
  });
  // res.status(200).json({
  //   staffs: doctor
  // });
});
exports.getAllTechnicians = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    Staff.find({ role: 'technician' }),
    req.query
  )
    //.find({duration: 5, difficulty: 'easy'})
    //.find().where('duration').equals("5")
    //find is like SELECT in SQL, returns an array of objects
    .filter()
    .sort()
    .limitFields()
    .pagination();

  //const docs = await features.query.explain();
  const technician = await features.query;

  //SEND RESPONSE
  res.status(200).render('viewTechs', {
    technicians: technician
  });
});