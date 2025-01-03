const UserModel = require("../models/user");
const TempUserModel = require("../models/tempuser");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res, next) => {
  try {
    let { name, email, password, confirmPassword } = req.body;
    if ((!email || !name || !password, !confirmPassword)) {
      return res.status(400).json({ errorMessage: "Bad Request" });
    }
    email = email?.toLowerCase();
    const isExistingUser = await UserModel.findOne({ email });
    if (confirmPassword !== password) {
      return res
        .status(400)
        .json({ errorMessage: "Paasword and confirm password is same!" });
    }
    if (isExistingUser) {
      return res
        .status(400)
        .json({ errorMessage: "User already exist with this email!" });
    }
    let hashedPassword = await bycrpt.hash(password, 10);
    const userData = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    const result = await userData.save();
    if (result) {
      res.json({ message: "Resgister user sucessfully" });
    } else {
      res
        .status(500)
        .json({ errorMessage: "Something went wrong while registering" });
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    console.log(req.body,"req.body")
    if (!email || !password) {
      return res.status(400).json({ errorMessage: "Bad Request" });
    }
    email = email?.toLowerCase()
    let userDetails = await UserModel.findOne({ email });
    if (!userDetails) {
      return res
        .status(400)
        .json({ errorMessage: "User doesn't exist, Please Register." });
    }
    //JWT implementation
    let token = jwt.sign(
      { userId: userDetails._id },
      process.env.JWT_SECRECT_KEY,
      { expiresIn: "60h" }
    );
    let isPassowordMatch = await bycrpt.compare(
      password,
      userDetails?.password
    );
    if (!isPassowordMatch) {
      return res.status(500).json({ errorMessage: "Invalid credentials" });
    }
    return res.json({
      message: "User loggedin sucessfully",
      name: userDetails?.name,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const addTempUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ errorMessage: "Email is required" });
    }

    let user = await TempUserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ errorMessage: "User alreadry exist." });
    }

    const newUser = new TempUserModel({
      email,
      name: email.split("@")[0],
    });
    user = await newUser.save();

    return res.status(201).json({ message: "User added successfully", user });
  } catch (error) {
    next(error);
  }
};

const getAllTempUser = async (req, res, next) => {
  try {
    const users = await TempUserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name, oldPassword, newPassword } = req.body;
    const userId = req?.currentUserId;

    if (!userId) {
      return res.status(400).json({ errorMessage: "Invalid user ID" });
    }

    let user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    if (email) {
      const isEmailTaken = await UserModel.findOne({ email });
      if (isEmailTaken && isEmailTaken.id !== userId) {
        return res.status(400).json({ errorMessage: "Email is already taken" });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (oldPassword && newPassword) {
      const isOldPasswordCorrect = await bycrpt.compare(oldPassword, user.password);
      if (!isOldPasswordCorrect) {
        return res.status(400).json({ errorMessage: "Old password is incorrect" });
      }
      if (newPassword === user.password) {
        return res.status(400).json({ errorMessage: "New password and old password can not be same" });
      }
      user.password = await bycrpt.hash(newPassword, 10);
    }

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = { registerUser, loginUser, addTempUser , getAllTempUser , updateUser };
