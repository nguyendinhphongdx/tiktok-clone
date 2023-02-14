const AccountModel = require("../Models/AccountModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");
const TagModel = require("../Models/TagModel");
const MusicModel = require("../Models/MusicModel");

//xử lý đăng ký
const register = async (req, res) => {
  try {
    //get info from client to req.body
    const { email, password, phone, birthday, role } = req.body;

    //check độ tuổi
    const currentYear = new Date().getFullYear();
    const birthdayYear = birthday.slice(6,11)
    if(currentYear - birthdayYear < 18) {
      return res.status(400).send("Underage!");
    }

    //check nesu ngày sinh rỗng
    if (birthday === "Ngày/Tháng/Năm") {
      return res.status(400).send("Empty Birthday!");
    }

    const emailExits = await AccountModel.find();
    //check email trùng
    emailExits.forEach((item) => {
      if (email === item.email) {
        return res.status(400).send("Email already exists!");
      }
    });

    //check trùng sđt
    emailExits.forEach((item) => {
      if (phone === item.phone) {
        return res.status(400).send("Phone already exists!");
      }
    });

    //creat data to db
    const accountModel = new AccountModel({
      email: email,
      password: bcrypt.hashSync(password, 10),
      phone: phone,
      birthday: birthday,
      role: role,
    });
    await accountModel.save();
    const account = await accountModel.save();

    const user = new UserModel({
      account: account._id ,
      avatar: `http://localhost:${process.env.PORT}/public/images/avatar.png`,
      nickname: `user${phone}`,
      name: `user${phone}`,
      follower_count: 0,
      following_count: 0,
      heart_count: 0,
      description: '',
      tick: false,
      isNewUser: true,
    })
    await user.save();

    return res.status(200).send("Register success!");
  } catch (error) {
    return res.status(400).send("Error!");
  }
};

//xử lý đăng nhập
const login = async (req, res) => {
  //check email
  const account = await AccountModel.findOne({ email: req.body.email });
  if (!account) {
    return res.status(400).send("Invalid Email");
  }

  //check pass
  const isPassValid = bcrypt.compareSync(req.body.password, account.password);
  if (!isPassValid) {
    return res.status(400).send("Invalid Password");
  }

  const user = await UserModel.findOne({ account: account._id });

  const jwtToken = jwt.sign(
    {
      _id: account.id,
      email: account.email,
      role: account.role,
      nickname: user.nickname,
      iduser: user.id,
      avatar: user.avatar,
      isNewUser: user.isNewUser,
    },
    process.env.SECRECT_JWT,
    {
      expiresIn: 36000,
    }
  );

  return res.status(200).send({
    accessToken: jwtToken,
  });
};

//xử lý đăng xuất

module.exports = {
  register: register,
  login: login,
};
