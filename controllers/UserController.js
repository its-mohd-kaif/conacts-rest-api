const asyncHandler = require("express-async-handler");
const User = require("../models/UserModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user
// public routes
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is alredy registered");
  }

  const hasedPassword = await bcrypt.hash(password, 10);
  console.log("Hased password: " + hasedPassword);

  const user = await User.create({
    username,
    email,
    password: hasedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is invalid");
  }
});

// register user
// public routes
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All feildes are required");
  }
  const user = await User.findOne({ email });

  // compare password with db hashpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKENN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is incorrect");
  }
});

// current user
// private routes
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
