// import express from 'express';
// import { appointmentCancel, appointmentComplete, appointmentsDoctor, doctorDashboard, doctorList, doctorProfile, loginDoctor, updatedoctorProfile, } from '../controllers/doctorConteroller.js';
// import authDoctor from '../middlewares/authDoctor.js';


// const doctorRouter = express.Router();

// doctorRouter.get('/list', doctorList);
// doctorRouter.post('/login', loginDoctor);
// doctorRouter.get('/appointments', authDoctor,appointmentsDoctor)
// doctorRouter.post('/complete-appointment',authDoctor,appointmentComplete);
// doctorRouter.post('/cancel-appointment',authDoctor,appointmentCancel);
// doctorRouter.get('/dashboard',authDoctor,doctorDashboard);
// doctorRouter.get('/profile',authDoctor,doctorProfile);
// doctorRouter.post('/update-profile',authDoctor,updatedoctorProfile);

// export default doctorRouter;

import express from 'express';
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorDashboard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updatedoctorProfile,
  uploadDoctorImage,
} from '../controllers/doctorConteroller.js';
import authDoctor from '../middlewares/authDoctor.js';
import upload from '../middlewares/multer.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);

// ✅ upload.none() lets multer parse FormData text fields (no file expected here)
doctorRouter.post('/update-profile', authDoctor, upload.none(), updatedoctorProfile);

// ✅ upload.single('image') for actual image upload
doctorRouter.post('/upload-image', authDoctor, upload.single('image'), uploadDoctorImage);

export default doctorRouter;