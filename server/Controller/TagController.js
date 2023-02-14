const TagModel = require("../Models/TagModel");
const videoModel = require("../Models/VideoModel");

//xử lý get list tag trendy
const getListTrendy = async (req, res) => {
  try {
    const listTrendy = await TagModel.find();
    res.send(listTrendy);
  } catch (error) {
    res.send(error);
  }
};

//xử lý get list tag trendy theo params
const getListTrendyUpload = async (req, res) => {
  try {
    if (req.query.q !== "") {
      const char = req.query.q;
      const listTrendy = await TagModel.find({
        name: { $regex: "^" + char, $options: "i" },
      });
      res.send(listTrendy);
    } else {
      res.send("No character");
    }
  } catch (error) {
    res.send(error);
  }
};

const getTrendy = async (req, res) => {
  try {
    const name = req.params.name;
    const trendyv1 = await TagModel.findOne({ name: name });
    const listVideo = await videoModel.find({ trendy: trendyv1._id })
    let viewcount = 0
    listVideo.forEach((item) => {
      viewcount += item.watch_count
    })
    await TagModel.updateOne(
      { name: name },
      { $set: { watch_count: viewcount } }
    )

    const trendy = await TagModel.find({ name: name })
    res.send(trendy);
  } catch (error) {
    res.send(error);
  }
};

///////////Phần của Linh//////////////////
// thêm mới tag
const createTrendy = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const trendy = await TagModel.findOne({ name: name });
    console.log("trendy", trendy);
    if (trendy) {
      return res.status(400).json({ message: "Tên đã tồn tại!" });
    }
    const trendyRecord = new TagModel({
      name,
      thumbnail: `http://localhost:5000/public/images/${req.files[0].filename}`,
      description,
      watch_count: 0,
      category,
    });
    await trendyRecord.save();
    return res.status(200).json({ message: "Thêm thành công!" });
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};
// get detail a tag
const viewTrendyView = async (req, res) => {
  try {
    const id = req.params.id;
    const tag = await TagModel.findById({ _id: id });
    if (!tag) {
      return res.status(404).json({ message: "Not found!" });
    } else {
      return res.status(200).json(tag);
    }
  } catch (err) {
    // trả về lỗi bên server
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};
// update tag
const updateTag = async (req, res) => {
  const { description, name } = req.body;
  try {
    const id = req.params.id;
    let tag = await TagModel.findById({ _id: id });
    if (!tag) {
      return res.status(404).send({ message: "Not found!" });
    }
    await TagModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          thumbnail:
            !!req.files?.length && !!req.files[0]
              ? `http://localhost:5000/public/images/${req.files[0].filename}`
              : tag.tag,
          description: description,
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

// delete
const deleteTagTrendy = async (req, res) => {
  try {
    const id = req.params.id;
    const tag = await TagModel.findById({
      _id: id,
    });
    if (!tag) {
      return res.status(404).send({ message: "Not found" });
    } else {
      TagModel.deleteOne({ _id: id }, function (err, result) {
        if (err) {
          return res.status(500).send({ message: `Error: ${err}` });
        } else {
          return res.status(200).send({ message: "Delete successfully" });
        }
      });
    }
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error: ${err}` });
  }
};

module.exports = {
  getListTrendy: getListTrendy,
  getTrendy: getTrendy,
  getListTrendyUpload: getListTrendyUpload,
  //Phần của Linh
  createTrendy: createTrendy,
  viewTrendyView: viewTrendyView,
  updateTag: updateTag,
  deleteTagTrendy: deleteTagTrendy,
};
