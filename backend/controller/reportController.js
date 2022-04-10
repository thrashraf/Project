import report from "../model/report.js";
import crypto from "crypto";

export const getReport = async (req, res) => {
  try {
    
  } catch (error) {
    
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
      files.map((images) => {
        return images.filename;
      }) :
      null;

    //console.log(images)

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