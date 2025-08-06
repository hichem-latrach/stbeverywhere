const bcrypt = require('bcrypt');
const { createUser, getUserByEmail } = require('../models/userModel');

const signup = async (req, res) => {
  const {
    first_name,
    last_name,
    cin_number,
    birth_date,
    mobile_number,
    email,
    password,
    confirm_password,
    is_existing_customer,
  } = req.body;

  if (password !== confirm_password)
    return res.status(400).json({ message: "Passwords do not match." });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  if (!passwordRegex.test(password))
    return res.status(400).json({ message: "Password does not meet complexity rules." });

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(409).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
      first_name,
      last_name,
      cin_number,
      birth_date,
      mobile_number,
      email,
      hashedPassword,
      is_existing_customer,
    });

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials." });

    res.json({ message: "Login successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { signup, login };
