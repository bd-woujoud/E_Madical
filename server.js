const express = require('express');
const app = express();
const port = 5000
const fs = require('fs');
const database = require('./config/bd')


const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cookieParser())    //<----- This middleware is needed to read Cookie from request. Without it, we'll get no req.cookie... // Ce middleware est nécessaire pour lire Cookie à partir de req. Sans elle, nous n’obtiendrons pas de req. cookie
app.use(express.json())    //<----- this middleware is needed to read JSON from request. Without it, we'll get req.body == undefined. // ce middleware est nécessaire pour lire JSON à partir de req. Sans elle, nous obtiendrons req. body == indéfini
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))


const userRouter = require('./routers/UserRouter');
const ordonnaceRouter = require('./routers/OrdonnanceRouter');
const dossierRouter = require('./routers/DossierMedRouter');
const diagnostiqueRouter = require('./routers/DiagnostiqueRouter');
const appointmentRouter = require('./routers/AppointmentRouter');
const analyseRouter = require('./routers/AnalyseRouter');
const doctorRouter = require('./routers/DoctorRouter');
const patientRouter = require('./routers/PatientRouter');
const laboRouter = require('./routers/LaboRouter');
app.use("/users", userRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/laboratoires", laboRouter);
app.use("/ordonnances", ordonnaceRouter);
app.use("/dossierMedicals", dossierRouter);
app.use("/diagnostiques", diagnostiqueRouter);
app.use("/appointments", appointmentRouter);
app.use("/analyses", analyseRouter);
app.get("/getfile/:cv", function (req, res) {
  res.sendFile(__dirname + "/upload/" + req.params.cv);
});
app.use(function (req, res, next) {
  let err = new Error();
  err.status = 404;
  next(err);
});

 // gérer les erreurs
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.status === 404)
    res.status(404).json({ message: " Path Not found" });
  else
    res.status().json({ message: "Somethi500ng looks wrong " });
});

app.listen(port, console.log(`server is running at http//localhost:${port}`));