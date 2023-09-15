import User from "../models/userschema.js";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../utils/CustomError";

// Cookie
export const cookieOptions = {
  expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

// Signup
export const signup = asyncHandler(async (req, res) => {
  //getting data from user
  const { name, email, password } = req.body;
  //  validation
  if (!(name && email && password)) {
    throw new CustomError("All fileds are required", 400);
  }
  //   adding user data to database
  //   check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User Already Exists", 400);
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const token = user.getJWTtoken();
  user.password = undefined;

  //   store this token in user's cookie
  res.cookie("token", token, cookieOptions);

  // response to user
  res.status(200).json({
    sucess: true,
    token,
    user,
  });
});

// login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   validation
  if (!(email && password)) {
    throw new CustomError("All fields are required", 400);
  }

  const user = User.findOne({ email }.select("+password"));

  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    const token = user.getJWTtoken;
    user, (password = undefined);
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      sucess: true,
      token,
      user,
    });
  }
  throw new CustomError("Password is incorrect", 400);
});

// logout

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    sucess: true,
    message: "Logged Out Sucessfully",
  });
});
