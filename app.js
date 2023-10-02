const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let express = require("express");
const session = require("express-session");
let app = express();
let workerRoute = require("./routes/worker");
let adminroute = require("./routes/admin");
const authRoutes = require("./routes/auth");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.use(bodyParser.json());

app.use(
  session({
    secret: "mohamedamine", // Change this to a strong, random string
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
    },
  })
);

app.get("/", (req, res, next) => {
  res.render("login");
});
app.use(authRoutes);
app.use("/worker", workerRoute);
app.use("/admin", adminroute);

// mongoConnect(() => {
//   app.listen("3000", () => {
//     console.log("server is listening on port 3000");
//   });
// });

app.use((error, req, res, next) => {
  const status = error.status;
  const message = error.message;
  res.status(status || 500).json({
    message: message,
    err: error.data,
  });
});

mongoose
  .connect(
    `mongodb+srv://serradjmohamed55:hK6QtSEv1WJpSO2j@cluster0.8jjw84b.mongodb.net/orsim?retryWrites=true&w=majority`
  )
  .then((result) => {
    const port = 3000;
    console.log(`the server is listening  in port ${port}`);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
