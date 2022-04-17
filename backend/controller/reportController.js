import report from "../model/report.js";
import crypto from "crypto";
import transporter from '../config/nodemail.js';
import user from "../model/users.js";

export const getReport = async (req, res) => {
  try {

    const [allReport] = await report.getAllreport();

    console.log(allReport)

    res.status(200).json({
      reports: allReport
    })

  } catch (error) {
    console.log(error)

    res.status(400).json({
      message: 'something went wrong'
    })
  }
}

export const createReport = async (req, res, next) => {
  try {
    const id = crypto.randomBytes(16).toString("hex");
    const files = req.files;

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

    console.log(title, date, organizer, venue, content, tentative, ajk);

    const images =
      files.length >= 0 ?
      files.map((images) => images.filename) :
      null;
    
    const ten = tentative === undefined ? '' : tentative
    const committee = ajk === undefined ? '' : ajk

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
      ten,
      committee
    );

      res.status(200).json({
        message: "successful"
      });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong"
    });
  }
};

export const verifyReport = async (req, res) => {
  try {

    const {
      status,
      id,
      message
    } = req.body

    const subject = status === 'declined' ? 'Fix your report' : 'Successful verified!';

    // get user's report
    const [userReport] = await report.selectReportById(id);
    const reportUser = userReport[0];

    const [selectUser] = await user.getUserById(reportUser.userId);
    const userInfo = selectUser[0];

    const [allReport] = await report.verifyReport(id, status);

    const emailOptions = {
      from: 'samsjtmkpsmza@gmail.com',
      to: userInfo.email,
      subject: subject,
      html: `
            <p>Assalamualaikum dan Salam Sejahtera</p>
            <p>Kepada ${userInfo.name}</p>
            ${status === 'declined' 
            ? `<p>Sila perbaiki report ${reportUser.program_name}</p>` 
            : `<p>Report ${reportUser.program_name} sudah diluluskan</p>`}
            <p>${message}</p>
            <p>Sekian, terima kasih.</p>
      `
    }

    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
        res.status(200).json({
          message: 'successful update!'
        })
    
      }
    })

  } catch (error) {
    console.log(error)

    res.status(400).json({
      message: 'something went wrong'
    })
  }
}