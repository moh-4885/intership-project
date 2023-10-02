let express = require("express");
const Request = require("../models/request");
let router = express.Router();

router.get("/", (req, res, next) => {
  Request.find()
    .where("status")
    .equals("inprograss")
    .populate("user")
    .then((request) => {
      res.render("admin/home", {
        request: request,
      });
    })
    .catch((error) => {
      throw error;
    });
});
router.get("/request/:id", (req, res, next) => {
  const reqID = req.params.id;
  Request.findById(reqID)
    .populate("user")
    .then((req) => {
      res.render("admin/request-form.ejs", {
        req: req,
      });
    });
});
router.post("/request/proccess", async (req, res, next) => {
  const action = req.body.action; // "accept" or "deny"
  // Check if the action is valid and update the request status accordingly
  if (action === "accept") {
    const request = await Request.findById(req.body.id);
    request.status = "accpted";
    request.save();
    res.status(200).json({ message: "Request accepted." });
  } else if (action === "deny") {
    const request = await Request.findById(req.body.id);
    request.status = "denied";
    request.save();
    res.status(200).json({ message: "Request denied." });
  } else {
    // Invalid action
    res.status(400).json({ error: "Invalid action." });
  }
});

module.exports = router;
