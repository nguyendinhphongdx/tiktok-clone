const reportModel = require('../Models/ReportModel')

const postReport = async (req, res) => {
    try {
        const annunciator = req.params.idUser
        const reported = req.params.idVideo
        const newReport = new reportModel({
            annunciator: annunciator,
            reportedObject: reported,
            content: req.body.contentReport,
        })
        newReport
          .save()
          .then(() => res.send("Report Success!"))
          .catch((err) => console.log(err));
    } catch (error) {
        
    }
}

module.exports = {
    postReport: postReport
}