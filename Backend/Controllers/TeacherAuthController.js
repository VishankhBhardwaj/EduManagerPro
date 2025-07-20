const TeacherModel = require("../Models/Teacher");
const sendPasswordEmail = require("../Nodemailer/index")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
exports.teacherInfo = async (req, res) => {
    const { FullName, PhoneNumber, Email, Password, Gender } = req.body;
    if (!FullName || !PhoneNumber || !Email || !Password || !Gender) {
        return res.status(401).json({ msg: 'Please provide all details' });
    }
    else {
        try {
            const user = await TeacherModel.findOne({ Email })
            if (user) {
                return res.status(409).json({ msg: "User already exists" });
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(Password, salt);
                const data = new TeacherModel({
                    FullName: FullName,
                    PhoneNumber: PhoneNumber,
                    Email: Email,
                    Password: hash,
                    Gender: Gender
                })
                await data.save();
                const token = jwt.sign(
                    { userId: data._id },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );
                return res.status(200).json({
                    success: true,
                    msg: "user registered successfully",
                    token,                          
                    user: {
                        id: data._id,
                        name: data.FullName,
                        email: data.Email,
                    }
                })
            }
        } catch (err) {
            return res.status(500).json({
                msg: 'Server Error',
                err: err.message || err
            })
        }
    }
}
exports.teacherLogin = async (req, res) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
        return res.status(400).json("All fields Required");
    } else {
        try {
            const user = await TeacherModel.findOne({ Email });
            if (!user) {
                return res.status(404).json({ msg: "User does not exist" })
            } else {
                const isMatch = await bcrypt.compare(Password, user.Password);
                if (!isMatch) {
                    return res.status(401).json({ msg: "Invalid Credentials" })
                } else {
                    const token = jwt.sign(
                        { userId: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
                    );
                    return res.status(200).json({
                        success: true,
                        msg: "user registered successfully",
                        token,
                        user: {
                            id: user._id,
                            name: user.FullName,
                            email: user.Email,
                        }
                    })
                }
            }
        } catch (err) {
            return res.status(500).json({ msg: 'Server error', error: err.message || err });
        }
    }
}

exports.teacherRecovery = async (req, res) => {
    const { Email } = req.body;
    if (!Email) {
        return res.status(400).json("All fields Required");
    } else {
        try {
            const isRegistered = await TeacherModel.findOne({ Email })
            if (!isRegistered) {
                return res.status(401).json({ msg: "User not registered" })
            } else {
                const tempPassword = Math.random().toString(36).slice(-8);
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(tempPassword, salt);
                sendPasswordEmail(Email, tempPassword);
                await TeacherModel.findOneAndUpdate(
                    { Email },
                    { Password: hash }
                );
                return res.status(200).json("A message has been sent to your email");
            }
        } catch (err) {
            return res.status(500).json({ msg: 'Server error', error: err.message || err });
        }
    }
}