const multer = require("multer");
const imageFilter = require("../Helpers/imageFilter");
const videoModel = require("../Models/VideoModel");
const musicModel = require("../Models/MusicModel");
const userModel = require("../Models/UserModel");
const trendyModel = require("../Models/TagModel");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/video");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("myVideo");

//Đăng tải video
const uploadVideo = async (req, res) => {
  // console.log(req);
  try {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        let private = false;
        let music = req.body.music;
        if (req.body.selection === "Riêng tư") {
          private = true;
        }

        if (req.body.music === "") {
          music = "636b365a488cd6684bd147a2";
        }
        const newVideo = new videoModel({
          description: req.body.description,
          trendy: req.body.trendy,
          music: music,
          isPrivate: private,
          video: `http://localhost:5000/public/video/${req.file.filename}`,
          heart_count: 0,
          share_count: 0,
          comment_count: 0,
          author: req.body.author,
          watch_count: 0,
        });
        newVideo
          .save()
          .then(() => res.send("Upload Success!"))
          .catch((err) => console.log(err));
      }
    });
  } catch (error) {}
};

//Lấy ra toàn bộ video của người dùng
const getUserVideo = async (req, res) => {
  const bearerHeader = req.headers["authorization"];
  const accessToken = bearerHeader.split(" ")[1];
  const bearerHeader1 = req.headers["iduser"];
  const idUserToken = bearerHeader1.split(" ")[1];
  try {
    // console.log(idUser);
    const nickname = req.params.nickname;
    const user = await userModel.find({ nickname: nickname });
    const listVideo = await videoModel
      .find({ author: user[0]._id })
      .populate("author")
      .populate("music")
      .populate("trendy");
    res.status(200).send(listVideo);
  } catch (error) {
    console.log(error);
  }
};

//Lấy ra chi tiết video của người dùng
const getCurrentVideo = async (req, res) => {
  try {
    // console.log(idUser);
    const nickname = req.params.nickname;
    const id = req.params.id;
    const user = await userModel.find({ nickname: nickname });
    const listVideo = await videoModel
      .find({ author: user[0]._id })
      .find({ _id: id })
      .populate("author")
      .populate("trendy")
      .populate("music");
    res.status(200).send(listVideo);
  } catch (error) {
    console.log(error);
  }
};

//Lấy ra video của trendy
const getTrendyVideo = async (req, res) => {
  try {
    const name = req.params.name;
    const trendy = await trendyModel.findOne({ name: name });
    const listVideo = await videoModel
      .find({ trendy: trendy._id })
      .populate("author")
      .populate("trendy")
      .populate("music");
    res.status(200).send(listVideo);
  } catch (error) {
    console.log(error);
  }
};

//Lấy ra video của music
const getMusicVideo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const music = await musicModel.findOne({ _id: id });
    console.log(music);
    const listVideo = await videoModel
      .find({ music: music._id })
      .populate("author")
      .populate("trendy")
      .populate("music");
    res.status(200).send(listVideo);
  } catch (error) {
    console.log(error);
  }
};

//lấy ra video khi không đăng nhập
const getRandomVideo = async (req, res) => {
  try {
    const listVideo = await videoModel
      .find({ isPrivate: { $nin: true } })
      .populate("author")
      .populate("music")
      .populate("trendy");
    res.status(200).send(listVideo);
  } catch (error) {
    res.status(404).send(error);
  }
};

//lấy ra video của những người không follow và có đăng nhập
const getRandomVideoLogin = async (req, res) => {
  const bearerHeader = req.headers["idaccount"];
  const idAccount = bearerHeader.split(" ")[1];
  const user = await userModel
  .findOne({ account: idAccount })
  .populate("fllowing");
  const arr = user.favorites
  try {
    const arrFllowing = [];
    user.fllowing.forEach((item) => {
      arrFllowing.push(item.id);
    });
    const listVideo = await videoModel
      .find({ author: { $nin: arrFllowing }, isPrivate: { $nin: true } })
      .populate("author")
      .populate("music")
      .populate("trendy");
    const userVideo = await videoModel
    .find({ author: user._id, isPrivate: { $nin: true } })
    .populate("author")
    .populate("music")
    .populate("trendy");
    const check = listVideo.filter((item) => {
      const result = arr.find((item1) => {
        return item.trendy.category === item1
      })
      return result
    })
    res.status(200).send(check.concat(userVideo));
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

//lấy ra video của những người có follow có đăng nhập
const getRandomVideoLoginFollow = async (req, res) => {
  const bearerHeader = req.headers["idaccount"];
  const idAccount = bearerHeader.split(" ")[1];
  const user = await userModel
    .findOne({ account: idAccount })
    .populate("fllowing");
  try {
    const listVideo = await videoModel
      .find({ author: user.fllowing })
      .populate("author")
      .populate("music")
      .populate("trendy");
    res.status(200).send(listVideo);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

//lấy video đầu tiền của danh sách người dùng đề xuất
const getFirstVideoUser = async (req, res) => {
  try {
    const user = await userModel.find({ tick: true });
    const arrUser = [];
    user.forEach((item) => {
      arrUser.push(item.id);
    });
    const listVideo = await videoModel
      .find({ author: arrUser })
      .populate("author")
      .populate("trendy")
      .populate("music");

    res.send(listVideo);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Thả tim video
const likeVideo = async (req, res) => {
  const bearerHeader = req.headers["idaccount"];
  const idAccount = bearerHeader.split(" ")[1];
  try {
    const idVideo = req.params.id;
    const currentVideo = await videoModel.findOne({ _id: idVideo }).populate('author')
    await videoModel.updateOne(
      { _id: idVideo },
      { $set: { heart_count: currentVideo.heart_count + 1 } }
    );

    await userModel.updateOne(
      { account: idAccount },
      { $push: { liked: idVideo } }
    );
    res.status(200).send("Yêu thích thành công");
  } catch (error) {
    res.status(404).send(error);
  }
};

//Thả tim video
const unLikeVideo = async (req, res) => {
  const bearerHeader = req.headers["idaccount"];
  const idAccount = bearerHeader.split(" ")[1];
  try {
    const idVideo = req.params.id;
    const currentVideo = await videoModel.findOne({ _id: idVideo }).populate('author')
    await videoModel.updateOne(
      { _id: idVideo },
      { $set: { heart_count: currentVideo.heart_count - 1 } }
    );

    await userModel.updateOne(
      { account: idAccount },
      { $pull: { liked: idVideo } }
    );
    res.status(200).send("Hủy yêu thích thành công");
  } catch (error) {
    res.status(404).send(error);
  }
};

//tăng lượt xem
const increaseView = async (req, res) => {
  try {
    const idVideo = req.params.id;
    const currentVideo = await videoModel.findOne({ _id: idVideo });
    await videoModel.updateOne(
      { _id: idVideo },
      { $set: { watch_count: currentVideo.watch_count + 1 } }
    );
    res.send('Video thêm lượt xem!')
  } catch (error) {
    res.send(error)
  }
};

//tăng lượt share
const increaseShare = async (req, res) => {
  try {
    const idVideo = req.params.id;
    const currentVideo = await videoModel.findOne({ _id: idVideo });
    await videoModel.updateOne(
      { _id: idVideo },
      { $set: { share_count: currentVideo.share_count + 1 } }
    );
    res.send('Video thêm lượt share!')
  } catch (error) {
    res.send(error)
  }
};

//tìm kiếm video
const searchVideo = async (req, res) => {
  try {
    if (req.query.q !== "") {
      const char = req.query.q;
      const listVideo = await videoModel.find({
        description: { $regex: "^" + char, $options: "i" },
      }).populate('author').populate('trendy')
      res.send(listVideo);
    } else {
      res.send("No character");
    }
  } catch (error) {
    res.send(error);
  }
};

/////////////////Phần của Linh//////////////
// get list videos
const getListVideos = async (req, res) => {
  try {
    const videos = await videoModel
      .find({})
      .populate({ path: "author", select: "name _id" })
      .populate({ path: "music", select: "music" })
      .populate({ path: "trendy", select: "name" });
    return res.send(videos);
  } catch (err) {
    console.log(err);
  }
};
// get detail video
const viewVideoDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await videoModel.findById({ _id: id });
    if (!video) {
      return res.status(404).send({ message: "Video không tồn tại!" });
    }
    return res.status(200).send(video);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
// xóa music
const deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;
    const video = await videoModel.findById({
      _id: id,
    });
    if (!video) {
      return res.status(404).send({ message: "video does not exist" });
    } else {
      videoModel.deleteOne({ _id: id }, function (err, result) {
        if (err) {
          return res.status(500).send({ message: `Error: ${err}` });
        } else {
          return res.status(200).send({ message: "delete successfully" });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};
// report video
const getReportVideo = async (req, res) => {
  try {
    const videos = await videoModel.find({});
    const result = {
      total: videos.length,
      totalWatch: videos
        .map((item) => item.watch_count)
        .reduce((prev, next) => prev + next),
      totalHeartCount: videos
        .map((item) => item.heart_count)
        .reduce((prev, next) => prev + next),
    };
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};
// admin update video
const updateVideoByAdmin = async(req, res) => {
  try{
    const id = req.params.id;
    const {description} = req.body;
    const videoRecord = await videoModel.find({_id: id});
    if (!videoRecord) {
      return res.status(404).send({ message: "Video không tồn tại" });
    } else {
      await videoModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            description: description,
            video:
              !!req.files?.length && !!req.files[0]
                ? `http://localhost:5000/public/images/${req.files[0].filename}`
                : videoRecord.video,
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
    }
  }
  catch(err){
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }

}

module.exports = {
  uploadVideo: uploadVideo,
  getUserVideo: getUserVideo,
  getCurrentVideo: getCurrentVideo,
  getTrendyVideo: getTrendyVideo,
  getMusicVideo: getMusicVideo,
  getRandomVideo: getRandomVideo,
  getRandomVideoLogin: getRandomVideoLogin,
  getFirstVideoUser: getFirstVideoUser,
  getRandomVideoLoginFollow: getRandomVideoLoginFollow,
  likeVideo: likeVideo,
  unLikeVideo: unLikeVideo,
  increaseView: increaseView,
  increaseShare: increaseShare,
  searchVideo: searchVideo,
  //Phần của Linh
  getReportVideo: getReportVideo,
  getListVideos: getListVideos,
  deleteVideo: deleteVideo,
  updateVideoByAdmin: updateVideoByAdmin,
  viewVideoDetail: viewVideoDetail
};
