const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

/*@
  @ ERRORS CODE
  @ 1 - ошибка валидации
  @ 2 - ошибка регистрации
  @ 3 - ошибка авторизации
  @ 4 - ошибка аутентификации
  @*/

const errors = {
  1: {
    code: 1,
    errors: [],
    text: "Ошибка валидации",
  },
  2: {
    code: 2,
    errors: [],
    text: "Ошибка регистрации",
  },
};

// json({ code: , message: "", error: "" });

const newError = (code, e) => {
  let error = { ...errors[code] };

  if (!e.isEmpty()) {
    error.errors = e.errors.map((item) => item.msg);
    return error;
  } else {
    return error;
  }
};

exports.createUser = async function (req, res) {
  try {
    let error = newError(1, validationResult(req));
    console.log(!error.errors.length);
    if (error.errors.length)
      return res.status(400).json({ message: "Неверный запрос", error });

    const { login, password, d_passord } = req.body;
    const candidate = await Users.findOne({ login });

    console.log(login, password, d_passord);
    console.log(candidate);

    // if (candidate) {
    //   return res.status(400).json({
    //     code: 2,
    //     message: `Пользователь с логином: ${login} уже существует`,
    //   });
    // }
    // const hashPassword = await bcrypt.hash(password, 8);
    // const user = new Users({ email, password: hashPassword, adminLevel: 1 });
    // await user.save();
    res.json({ message: "User was created" });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
};

/*@
  @ URL
  @ GET: /users  - вывод всех юзеров 
  @*/
