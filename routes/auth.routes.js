const Router = require("express");
const router = new Router();
const config = require("config");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");

// schemas
const Users = require("../models/Users");

// controllers
const authController = require("../controllers/authControllers");

router.post("/registration", [
  check(
    "password",
    "Пароль должен содержать минимум 3 символа и не более 15"
  ).isLength({ min: 3, max: 15 }),
  authController.createUser,
]);

// router.post(
//   "/registration",
//   [
//     check("email", "Uncorrect email").isEmail(),
//     check(
//       "password",
//       "Password must be longer than 3 and shorter than 12"
//     ).isLength({ min: 3, max: 12 }),
//   ],
//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ message: "Uncorrect request", errors });
//       }
//       const { email, password } = req.body;
//       const candidate = await Users.findOne({ email });
//       if (candidate) {
//         return res
//           .status(400)
//           .json({ message: `User with email ${email} already exist` });
//       }
//       const hashPassword = await bcrypt.hash(password, 8);
//       const user = new Users({ email, password: hashPassword, adminLevel: 1 });
//       await user.save();
//       res.json({ message: "User was created" });
//     } catch (e) {
//       console.log(e);
//       res.send({ message: "Server error" });
//     }
//   }
// );

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Users.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isPassValid = bcrypt.compareSync(password, user.password);
//     if (!isPassValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }
//     const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
//       expiresIn: "1h",
//     });
//     return res.json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.send({ message: "Server error" });
//   }
// });

// router.get("/auth", authMiddleware, async (req, res) => {
//   try {
//     const user = await Users.findOne({ _id: req.user.id });
//     const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
//       expiresIn: "1h",
//     });
//     return res.json({
//       token,
//       user: {
//         id: user.id,
//         email: user.email,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.send({ message: "Server error" });
//   }
// });

module.exports = router;
