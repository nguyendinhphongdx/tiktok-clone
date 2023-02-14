const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");
const videoModel = require("../Models/VideoModel");
const multer = require("multer");

//dành cho admin
const getListUser = async (req, res) => {
  //1.get token form client
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader.split(" ")[1];

  try {
    //verifile token
    const decodeJwt = jwt.verify(accessToken, process.env.SECRECT_JWT);
    if (decodeJwt) {
      const listUser = await userModel.find();
      res.status(200).send(listUser);
    }
  } catch (error) {
    //gửi mã lỗi về client để biết refresh token
    res.status(400).send(error);
  }
};

//get người dùng hiện tại đang đăng nhập
const getCurrentUser = async (req, res) => {
  //1.get token form client
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader.split(" ")[1];
  const nickNameToken = jwt.decode(accessToken)?.nickname;

  try {
    //verifile token
    const nickname = req.params.nickname;
    let user = await userModel.findOne({ nickname: nickname });
    const decodeJwt = jwt.verify(accessToken, process.env.SECRECT_JWT);
    if (decodeJwt) {
      if (nickname === nickNameToken) {
        user._doc = { ...user._doc, isMe: true };
      }
    }
    const listVideo = await videoModel.find({ author: user._id });
    let heartcount = 0;
    listVideo.map((item) => {
      heartcount += item.heart_count;
    });
    await userModel.updateOne(
      { nickname: nickname },
      { $set: { heart_count: heartcount } }
    );
    res.status(200).json(user);
  } catch (error) {
    //gửi mã lỗi về client để biết refresh token
    res.status(400).send(error);
    console.log(error);
  }
};

//get người dùng
const getCurrentUserWithoutJWT = async (req, res) => {
  try {
    //verifile token
    const nickname = req.params.nickname;
    let user = await userModel.findOne({ nickname: nickname });
    res.status(200).json(user);
  } catch (error) {
    //gửi mã lỗi về client để biết refresh token
    res.status(400).send(error);
  }
};

//get người dùng đề xuất(thuộc tích tick = true)
const getSuggestUser = async (req, res) => {
  try {
    const listUserSuggest = await userModel.find({ tick: true });
    res.status(200).send(listUserSuggest);
  } catch (error) {
    res.send(error);
  }
};

//follow người dùng
const followUser = async (req, res) => {
  const bearerHeader = req.body.headers["Authorization"];
  const accessToken = bearerHeader.split(" ")[1];
  const bearerHeader1 = req.body.headers["IdAccount"];
  const idAccount = bearerHeader1.split(" ")[1];
  const bearerHeader2 = req.body.headers["IdUser"];
  const idUser = bearerHeader2.split(" ")[1];

  try {
    //verifile token
    const decodeJwt = jwt.verify(accessToken, process.env.SECRECT_JWT);
    if (decodeJwt) {
      const user = await userModel.findOne({ account: idAccount });
      const userFollow = await userModel.findOne({ _id: idUser });
      await userModel
        .updateOne({ account: idAccount }, { $push: { fllowing: idUser } })
        .updateOne(
          { account: idAccount },
          { $set: { following_count: user.following_count + 1 } }
        );

      await userModel.updateOne(
        { _id: idUser },
        { $set: { follower_count: userFollow.follower_count + 1 } }
      );
      res.status(200).send("Follow thành công!");
    }
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

//unfollow người dùng
const unFollowUser = async (req, res) => {
  const bearerHeader = req.body.headers["Authorization"];
  const accessToken = bearerHeader.split(" ")[1];
  const bearerHeader1 = req.body.headers["IdAccount"];
  const idAccount = bearerHeader1.split(" ")[1];
  const bearerHeader2 = req.body.headers["IdUser"];
  const idUser = bearerHeader2.split(" ")[1];

  try {
    //verifile token
    const decodeJwt = jwt.verify(accessToken, process.env.SECRECT_JWT);
    if (decodeJwt) {
      const user = await userModel.findOne({ account: idAccount });
      const userFollow = await userModel.findOne({ _id: idUser });
      await userModel
        .updateOne({ account: idAccount }, { $pull: { fllowing: idUser } })
        .updateOne(
          { account: idAccount },
          { $set: { following_count: user.following_count - 1 } }
        );

      await userModel.updateOne(
        { _id: idUser },
        { $set: { follower_count: userFollow.follower_count - 1 } }
      );

      res.status(200).send("Unfollow thành công!");
    }
  } catch (error) {
    res.send(error);
  }
};

//Get người dùng đã theo dõi
const getfollowUser = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader.split(" ")[1];
  const bearerHeader1 = req.headers["idaccount"];
  const idAccount = bearerHeader1.split(" ")[1];
  // const bearerHeader2 = req.body.headers["IdUser"];
  // const idUser = bearerHeader2.split(" ")[1];

  try {
    //verifile token
    const decodeJwt = jwt.verify(accessToken, process.env.SECRECT_JWT);
    if (decodeJwt) {
      const followUser = await userModel.find({ account: idAccount }).populate({
        path: "fllowing",
        populate: { path: "fllowing" },
      });
      res.send(followUser);
    }
  } catch (error) {
    res.send(error);
  }
};

//lấy ra danh sách nhưng video đã like của người dùng
const getLikedVideo = async (req, res) => {
  const bearerHeader1 = req.headers["idaccount"];
  const idAccount = bearerHeader1.split(" ")[1];
  try {
    const likedVideo = await userModel
      .find({ account: idAccount })
      .populate("liked");
    res.send(likedVideo);
  } catch (error) {
    res.send(error);
  }
};

//tìm kiếm người dùng
const searchUser = async (req, res) => {
  try {
    if (req.query.q !== "") {
      const char = req.query.q;
      const listUser = await userModel.find({
        nickname: { $regex: "^" + char, $options: "i" },
      });
      res.send(listUser);
    } else {
      res.send("No character");
    }
  } catch (error) {
    res.send(error);
  }
};

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("myImage");

//Update thông tin người dùng
const updateProfile = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
      } else {
        const listUser = await userModel.find()
        let check = false

        //check xem có bị trùng nickname hay không
        listUser.forEach(item => {
          if(item.nickname === req.body.nickname) {
            check = true;
            return res.status(400).send('Nickname already exists!')
          }
        })

        if(check === false) {
          const currentUser = await userModel.findOne({ _id: req.body.user })
        let image

        if(req.body.myImage === undefined) {
          image = currentUser.avatar
        }

        if(req.file?.filename) {
          image = `http://localhost:5000/public/images/${req.file.filename}`
        }

        await userModel.updateOne(
          { _id: req.body.user },
          {
            nickname: req.body.nickname,
            name: req.body.name,
            description: req.body.desc,
            avatar: image,
          }
        );

        const user = await userModel
          .findOne({ _id: req.body.user })
          .populate("account");

        const jwtToken = jwt.sign(
          {
            _id: user.account.id,
            email: user.account.email,
            role: user.account.role,
            nickname: user.nickname,
            iduser: user.id,
            avatar: user.avatar,
          },
          process.env.SECRECT_JWT,
          {
            expiresIn: 36000,
          }
        );

        return res.status(200).send({
          accessToken: jwtToken,
        });
        }
      }
    });
  } catch (error) {
    return res.send(error);
  }
};

//update ưa thích người dùng và chuyển isNameUser sang false
const updateFavoritesAndIsNewUser = async(req, res) => {
    try {
      const id = req.params.id;
      const user = await userModel
      .updateOne(
        { _id: id },
        { $set: { favorites: req.body.favorites, isNewUser: false } }
      )
      res.status(200).send('update successfully')
    } catch (error) {
      res.status(404).send(error);
    }
}

////Phần của Linh///////////////////////////////////////
// admin thay đổi trạng thái tick cho người dùng
const changeStatusTick = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await userModel.findById({ _id: id });
    await userModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            tick: !user.tick,
          },
        },
        { new: true },
        (err, doc) => {
          if (err) {
            res
              .status(500)
              .send({ message: "Đã có lỗi xảy ra khi update dữ liệu!" });
          }
          return res.status(200).send({ message: "Update thành công!" });
        }
      )
      .clone();
  } catch (err) {
    return res.status(500).json({ message: `Đã có lỗi xảy ra: ${err}` });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById({
      _id: id,
    });
    if (!user) {
      return res.status(404).send({ message: "user does not exist" });
    } else {
      await accountModel.deleteOne({ _id: user.account }).clone();
      await userModel.deleteOne({ _id: id }, function (err, result) {
        if (err) {
          return res.status(500).send({ message: `Error: ${err}` });
        } else {
          return res.status(200).send({ message: "Delete successfully" });
        }
      }).clone();
    }
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};
// update user
const updateUser = async (req, res) => {
  const { nickname, name, description } = req.body;
  try {
    const id = req.params.id;
    const user = await userModel.findById({
      _id: id,
    });
    await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          nickname: nickname,
          description: description,
          avatar: !!req.files?.length ? `http://localhost:5000/public/images/${req.files[0].filename}` : user.avatar
        },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        return res.status(200).send({ message: "Update thành công!" });
      }
    ).clone();
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
//  get detail info
const getDetailUser = async (req, res) => {
  try{
    const id = req.params.id;
    const user = await userModel.findById({
      _id: id,
    });
    if (!user) {
      return res.status(404).send({ message: "user does not exist" });
    }
    return res.status(200).send(user);
  }
  catch(err){
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
}

module.exports = {
  getListUser: getListUser,
  getCurrentUser: getCurrentUser,
  getCurrentUserWithoutJWT: getCurrentUserWithoutJWT,
  getSuggestUser: getSuggestUser,
  followUser: followUser,
  unFollowUser: unFollowUser,
  getfollowUser: getfollowUser,
  getLikedVideo: getLikedVideo,
  searchUser: searchUser,
  updateProfile: updateProfile,
  updateFavoritesAndIsNewUser: updateFavoritesAndIsNewUser,
  //Phần của Linh
  changeStatusTick: changeStatusTick,
  deleteUser: deleteUser,
  getDetailUser: getDetailUser,
  updateUser: updateUser
};
