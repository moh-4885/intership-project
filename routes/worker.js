let express = require("express");
let Request = require("../models/request");
const PDFDocument = require("pdfkit");

let router = express.Router();

router.get("/form", (req, res, next) => {
  formchoise = req.query.param;

  res.render("worker/form", {
    formType: formchoise,
    name: req.session.user.name,
  });
});
router.get("/request", async (req, res, next) => {
  try {
    console.log(req.session.user._id);
    const workerReq = await Request.find()
      .populate("user")
      .where("user")
      .equals(req.session.user._id);
    console.log(workerReq);
    res.render("worker/request", {
      request: workerReq,
    });
  } catch (err) {
    throw err;
  }
});

router.get("/", (req, res, next) => {
  res.render("worker/home", {});
});
router.post("/postworkerform", (req, res, next) => {
  const selectchoise = req.body.selectOption;
  res.redirect(`/worker/form?param=${selectchoise}`);
});

router.post("/addrequest", (req, res, next) => {
  const request = new Request({
    absenceDate: req.body.absenceDate,
    startHour: req.body.startHour,
    endHour: req.body.endHour,
    motifabsense: req.body.motifabsense,
    type: req.body.type,
    user: req.session.user._id,
  });

  request.save().then(() => {
    res.redirect("/worker");
  });
});
router.get("/generate-pdf/:id", async (req, res) => {
  const reqId = req.params.id;
  const requestPdf = await Request.findById(reqId).populate("user");

  // Create a new PDF document
  const doc = new PDFDocument();

  // Set PDF document options
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="example.pdf"');

  // Pipe the PDF to the response
  doc.pipe(res);

  // Add title to the PDF (centered)
  doc
    .fontSize(24)
    .text(`${requestPdf.type.toUpperCase()}  REQUEST`, { align: "center" });

  // Add properties and their values
  const properties = [
    {
      // name: "John Doe",
      // function: "Manager",
      // sector: "IT",
      // phone: "123-456-7890",
      // absenceDate: "2023-09-01",
      // endDate: "2023-09-30",
      // nature: "Sick Leave",
      // address: "123 Main St",
      // status: "Active",
    },
    // Add more properties as needed
  ];

  doc.fontSize(16);
  if (requestPdf.type == "absence") {
    properties.forEach((property, index) => {
      doc.text(`Name: ${requestPdf.user.name}`, 100, 150 + index * 80);
      doc.text(`Function: ${requestPdf.user.fonction}`, 100, 170 + index * 80);
      doc.text(`Sector: ${requestPdf.user.secteur}`, 100, 190 + index * 80);
      doc.text(`Phone: ${requestPdf.user.phoneNumber}`, 100, 210 + index * 80);
      doc.text(
        `Absence Date: ${requestPdf.absenceDate}`,
        100,
        230 + index * 80
      );
      doc.text(`start hour: ${requestPdf.startHour}`, 100, 250 + index * 80);
      doc.text(`end hour: ${requestPdf.endHour}`, 100, 270 + index * 80);
      doc.text(
        `absence resone: ${requestPdf.motifabsense}`,
        100,
        290 + index * 80
      );
      doc.text(`Status: ${requestPdf.status}`, 100, 310 + index * 80);
    });
  } else {
    properties.forEach((property, index) => {
      doc.text(`Name: ${requestPdf.user.name}`, 100, 150 + index * 80);
      doc.text(`Function: ${requestPdf.user.fonction}`, 100, 170 + index * 80);
      doc.text(`Sector: ${requestPdf.user.secteur}`, 100, 190 + index * 80);
      doc.text(`Phone: ${requestPdf.user.phoneNumber}`, 100, 210 + index * 80);
      doc.text(`start Date: ${requestPdf.absenceDate}`, 100, 230 + index * 80);
      doc.text(`End Date: ${requestPdf.startHour}`, 100, 250 + index * 80);
      doc.text(`Nature: ${requestPdf.endHour}`, 100, 270 + index * 80);
      doc.text(`Address: ${requestPdf.motifabsense}`, 100, 290 + index * 80);
      doc.text(`Status: ${requestPdf.status}`, 100, 310 + index * 80);
    });
  }

  // End the PDF document
  doc.end();
});

module.exports = router;
