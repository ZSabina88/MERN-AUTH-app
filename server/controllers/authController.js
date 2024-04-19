const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


//register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.json({
                error: "Name is required"
            })
        }
        if (!password || password.length < 8) {
            return res.json({
                error: "Password is required and should be at least 8  characters long"
            })
        }
        const hashedPassword = await hashPassword(password);
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: "Email is already taken"
            })
        }
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.json(user);

    } catch (error) {
        console.log(error);
    }
};

//login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "Unauthorised"
            })
        }

        //check if password match
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
                if (err) throw err;
                res.cookie("token", token, { httpOnly: true }).json(user);
            })
        } else {
            return res.json({
                error: "Passwords do not match"
            });
        }
    } catch (error) {

    }
}

//forgotpassword
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "user not registered" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5m",
        });

        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.SENDER_PASSWORD
            },
        });
        const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
        var mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: email,
            subject: "Reset Password",
            text: `http://localhost:5173/resetpassword/${encodedToken}`,
        };

        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                return res.json({ message: "error sending email" });
            } else {
                return res.json({ status: true, message: "email sent" });
            }
        });
    } catch (err) {
        console.log(err);
    }
};

//resetpassword

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const id = decoded.id;
        const hashedPassword = await hashPassword(password);
        await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword });
        return res.json({ status: true, message: "updated password" });
    } catch (err) {
        return res.json("invalid token");
    }
};


module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};