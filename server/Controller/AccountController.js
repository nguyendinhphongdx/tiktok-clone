const jwt = require('jsonwebtoken')
const accountModel = require('../Models/AccountModel')

//lấy danh sách account
const getListAccount = async (req, res) => {
    const listAccount = await accountModel.find();
    res.status(200).send(listAccount)
}

//Phần của Linh////////////////////////////////
// get account detail by id
const viewAccountDetail = async (req, res) => {
    try {
      const id = req.params.id;
      const account = await accountModel.findById({ _id: id });
      if (!account) {
        return res.status(404).send({ message: "account does not exist" });
      }
      return res.status(200).send(account);
    } catch (error) {
      return res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
  };
  // delete account
  const deleteAccount = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const account = await accountModel.findById({
        _id: id,
      });
      console.log(account);
      if (!account) {
        return res.status(404).send({ message: "Account does not exist" });
      } else {
        accountModel.deleteOne({ _id: id }, function (err, result) {
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
  // update accoutn
  const updateAccount = async (req, res) => {
    try {
      const id = req.params.id;
      const {email, phone, role} =  req.body
      const account = await accountModel.findById({
        _id: id,
      });
      if (!account) {
        return res.status(404).send({ message: "Account does not exist" });
      } else {
        await accountModel.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              email: email,
              phone: phone,
              role: role
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
    } catch (err) {
      return res.status(500).json({ message: `Internal Server Error: ${err}` });
    }
  };

module.exports = {
    getListAccount: getListAccount,
    deleteAccount: deleteAccount,
  updateAccount: updateAccount,
  viewAccountDetail: viewAccountDetail
}