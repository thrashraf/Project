import activities from '../model/activities.js';
import crypto from 'crypto';
import transporter from '../config/nodemail.js';

export const allActivities = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);

    //add search by year
    const keys = ['title', 'organizer'];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q.toLowerCase()))
      );
    };

    const [allActivities] = await activities.getAllActivities();
    res.status(200).json(search(allActivities).splice(0, 10));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const createActivities = async (req, res) => {
  try {
    const { title, start, end, venue, organizer, username, email } = req.body;
    const files = req.files;
    console.log(files);
    const id = crypto.randomBytes(16).toString('hex');

    const [activitiesCreated] = await activities.createActivities(
      id,
      title,
      start,
      end,
      organizer,
      venue,
      files[0].filename,
      username,
      email
    );
    res
      .status(200)
      .json({ message: 'successful', image_url: files[0].filename });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const deleteActivities = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    const [deletedActivities] = await activities.deleteActivitiesById(q);
    console.log(deletedActivities.affectedRows);

    res.status(200).json('successful');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const updateActivities = async (req, res) => {
  try {
    const { q } = req.query;

    const files = req.files;

    const { title, start, organizer, venue } = req.body;

    console.log(q);
    const [updatedActivities] = await activities.updateActivitiesById(
      q,
      title,
      start,
      organizer,
      venue,
      files[0].filename
    );

    if (updatedActivities.affectedRows !== 1) {
      res.status(400).json({
        message: "something went wrong",
      });
      return
    }

    res.status(200).json({message: 'successful', image_url: files[0].filename});
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const getActivitiesById = async (req, res) => {
  try {
    const { q } = req.query;

    console.log(q);
    const [activitiesById] = await activities.getActivitiesById(q);

    res.status(200).json(activitiesById[0]);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const createReport = async (req, res, next) => {
  try {
    const files = req.files;

    const { submitOn, id, userId, owner, content, signature, tentative, ajk } =
      req.body;

    const images =
      files.length >= 0 ? files.map((images) => images.filename) : null;

    const ten = tentative === undefined ? '' : tentative;
    const committee = ajk === undefined ? '' : ajk;

    const [insertReport] = await activities.createReport(
      submitOn,
      userId,
      owner,
      id,
      images,
      content,
      ten,
      committee,
      signature
    );

    res.status(200).json({
      message: 'successful',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'something went wrong',
    });
  }
};

export const verifyReport = async (req, res) => {
  try {
    const { status, report, message } = req.body;

    const subject =
      status === 'declined' ? 'Fix your report' : 'Successful verified!';
    // get user's report

    const [updateStatus] = await activities.updateStatus(report.id, status);
    console.log(updateStatus);

    if (updateStatus.affectedRows !== 1) {
      res.status(400).json({
        message: 'something went wrong',
      });
    }

    const emailOptions = {
      from: 'samsjtmkpsmza@gmail.com',
      to: report.email,
      subject: subject,
      html: `
            <p>Assalamualaikum dan Salam Sejahtera</p>
            <p>Kepada ${report.owner}</p>
            ${
              status === 'declined'
                ? `<p>Sila perbaiki report ${report.title}</p>`
                : `<p>Report ${report.title} sudah diluluskan</p>`
            }
            <p>${message}</p>
            <p>Sekian, terima kasih.</p>
      `,
    };

    transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
        res.status(200).json({
          message: 'successful update!',
        });
      }
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: 'something went wrong',
    });
  }
};
