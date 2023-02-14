const MusicModel = require("../Models/MusicModel");
const videoModel = require("../Models/VideoModel");
const multer = require("multer");

//Phần của Linh
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/music/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var uploadStorage = multer({
  storage: storage,
});

// thêm bài hát mới
const createMusic = async (req, res) => {
  try {
    const { name, singer } = req.body;
    const music = await MusicModel.findOne({ name: name });
    console.log("name", music);
    if (music) {
      return res.status(400).json({ message: "Bài hát đã tồn tại!" });
    }
    const musicRecord = new MusicModel({
      name,
      thumbnail: `http://localhost:5000/public/images/${req.files[0].filename}`,
      music: `http://localhost:5000/public/images/${req.files[1].filename}`,
      singer,
      watch_count: 0,
    });
    await musicRecord.save();
    return res.status(200).json({ message: "Thêm bài hát thành công!" });
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};
// xóa music
const deleteMusic = async (req, res) => {
  try {
    const id = req.params.id;
    const music = await MusicModel.findById({
      _id: id,
    });
    if (!music) {
      return res.status(404).send({ message: "Song does not exist" });
    } else {
      MusicModel.deleteOne({ _id: id }, function (err, result) {
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
// get detail music by id
const viewMusicDetail = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const music = await MusicModel.findById({ _id: id });
    if (!music) {
      return res.status(404).send({ message: "Song does not exist" });
    }
    return res.status(200).send(music);
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
// update music
const updateMusic = async (req, res) => {
  const { singer, name } = req.body;
  try {
    const id = req.params.id;
    let music = await MusicModel.findById({ _id: id });
    if (!music) {
      return res.status(404).send({ message: "Song does not exist" });
    }
    await MusicModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          thumbnail:
            !!req.files?.length && !!req.files[0]
              ? `http://localhost:5000/public/images/${req.files[0].filename}`
              : music.name,
          singer: singer,
          music:
            !!req.files?.length && !!req.files[1]
              ? `http://localhost:5000/public/images/${req.files[1].filename}`
              : music.music,
          watch_count: 0,
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
// report music
const getReportMusic = async (req, res) => {
  try {
    const musics = await MusicModel.find({});
    console.log("music", musics);
    const result = {
      total: musics.length,
      totalWatch: musics
        .map((item) => item.watch_count)
        .reduce((prev, next) => prev + next),
    };
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};

//Phần của Tuấn
//xử lý get list music
const getListMusic = async (req, res) => {
  try {
    const listMusic = await MusicModel.find();
    res.send(listMusic);
  } catch (error) {
    res.send(error);
  }
};

//xử lý get list music theo params cho upload
const getListMusicUpload = async (req, res) => {
  try {
    if (req.query.q !== "") {
      const char = req.query.q;
      const listMusic = await MusicModel.find({
        name: { $regex: "^" + char, $options: "i" },
      });
      res.send(listMusic);
    } else {
      res.send("No character");
    }
  } catch (error) {
    res.send(error);
  }
};

//get âm nhạc
const getMusic = async (req, res) => {
  try {
    const id = req.params.id;
    const listVideo = await videoModel.find({ music: id });
    let viewcount = 0;
    listVideo.forEach((item) => {
      viewcount += item.watch_count;
    });
    await MusicModel.updateOne(
      { _id: id },
      { $set: { watch_count: viewcount } }
    );
    const music = await MusicModel.find({ _id: id });
    res.send(music);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getListMusic: getListMusic,
  getMusic: getMusic,
  getListMusicUpload: getListMusicUpload,
  getReportMusic: getReportMusic,
  createMusic: createMusic,
  deleteMusic: deleteMusic,
  viewMusicDetail: viewMusicDetail,
  updateMusic: updateMusic,
};
