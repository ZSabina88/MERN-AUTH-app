const express = require("express");
const router = express.Router();
const cors = require("cors");
const { registerUser, loginUser, forgotPassword, resetPassword } = require("../controllers/authController");

//middleware
router.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["POST", "GET"]
    })
);

router.get("/", (req, res)=> {
    res.json("Hello")
});
router.post("/register", registerUser);
router.post("/", loginUser);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

module.exports = router;