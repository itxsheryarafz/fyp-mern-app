const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { UserOTPVerificationModel } = require("../models/otp");
const { auth } = require("../middleware/auth");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "bsem-f18-234@superior.edu.pk",
    pass: "gangster1234",
  },
});
const sendOTPVerificationEmail = ({ _id, email }, res) => {
  console.log("DOcs is", email + "Id is ", _id);
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailoptions = {
      from: auth.user,
      to: email,
      subject: "Verify your Email",
      html: `<p>Enter this ${otp} in the app to verify your email</p>`,
    };

    const satlRounds = 10;

    const hashedOTP = bcrypt.hash(otp, satlRounds);
    const newOTPVerification = new UserOTPVerificationModel({
      userId: _id,
      otp: otp,
      createdAt: Date.now(),
      expiredAt: Date.now() + 3600000,
    });

    newOTPVerification
      .save()
      .then(() => {
        console.log("Saved in DB");
      })
      .catch(() => {
        console.log("Not Saved");
      });
    transporter.sendMail(mailoptions);
    res.json({
      status: "PENDING",
      message: "Verification otp email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    token: req.user.token,
  });
});

router.get("/getUsers", async (req, res) => {
  User.find({}, (err, users) => {
    res.status(200).send(users);
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  console.log("console.log", user.email);

  User.find({ email: user.email }, function (err, fg) {
    console.log("Total is ", Object.keys(fg).length);
    if (Object.keys(fg).length == 0) {
      user.save((err, doc) => {
        if (err) {
          return res.json({ success: false, err });
        } else {
          // sendOTPVerificationEmail(doc, res);
          return res.status(200).json({
            success: true,
          });
        }
      });
    } else {
      res.status(400).json({
        msg: "Email already exist",
      });
    }
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
