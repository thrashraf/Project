import activities from "../model/activities.js";
import crypto from "crypto";

export const allActivities = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q)

    //add search by year
    const keys = ["title", "organizer"];

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
    const {title, start, end, venue, organizer}= req.body;
    const files = req.files;

    const id = crypto.randomBytes(16).toString("hex");

    const images =
      files.length >= 0 ?
      files.map((images) => images.filename) :
      null;


    const [activitiesCreated] = await activities.createActivities(id, title, start, end, organizer, venue, images);
    res.status(200).json("successful");

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const deleteActivities = async (req, res) => {
  try {
    const { q }= req.query;
    console.log(q);
    const [deletedActivities] = await activities.deleteActivitiesById(q);
    console.log(deletedActivities.affectedRows);

    res.status(200).json("successful");

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const updateActivities = async (req, res) => {
  try {
    const { q }= req.query;

    const { title, start, organizer, venue, images } = req.body.newActivities
    console.log(req.body)

    console.log(q);
    const [updatedActivities] = await activities.updateActivitiesById(q, title, start, organizer, venue, images);
    console.log(updatedActivities.affectedRows);

    res.status(200).json("successful");

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

