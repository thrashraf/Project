import report from "../model/report.js";
import crypto from "crypto";

export const getReport = async (req, res) => {
  try {
    
    const [allReport] = await report.getAllreport();
    res.status(200).json({reports: allReport})

  } catch (error) {
    console.log(err)

    res.status(400).json({message: 'something went wrong'})
  }
}

export const createReport = async (req, res, next) => {
  try {
    const id = crypto.randomBytes(16).toString("hex");
    const files = req.files;
    console.log(files);

    const {
      userId,
      owner,
      profile_picture,
      title,
      date,
      organizer,
      venue,
      content,
      tentative,
      ajk
    } =
    req.body;

    //console.log(title, date, organizer, venue, content, tentative, ajk);

    const images =
      files.length >= 0 ?
      files.map((images) => images.filename) :
      null;

    console.log(images)

    const [insertReport] = await report.createReport(
      userId,
      owner,
      profile_picture,
      id,
      title,
      date,
      organizer,
      venue,
      images,
      content,
      tentative,
      ajk
    );

    if (insertReport.affectedRows > 1) {

        res.status(200).json({
          message: "successful"
        });
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong"
    });
  }
};

export const verifyReport = async (req, res) => {
  try {
    
    const { status, id } = req.body

    const [allReport] = await report.verifyReport(id, status);
    res.status(200).json({message: 'successful update!'})

  } catch (error) {
    console.log(error)

    res.status(400).json({message: 'something went wrong'})
  }
}