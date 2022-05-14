import publication from "../model/publication.js";
import crypto from "crypto";

export const showPublication = async (req, res) => {
  try {
    const [allPublication] = await publication.showUser();

    res.status(200).json({ allPublication });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const createPublication = async (req, res) => {
  try {
    const { title, description, isbn, staff, year } = req.body;
    const files = req.files;

    const id = crypto.randomBytes(16).toString("hex");

    //filter images
    const images =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) === "image")
        : null;
    console.log(images);

    //filter pdf
    const pdf = 
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) !== "image")
        : null;
    console.log(pdf);

    const [activitiesCreated] = await publication.createPublication(id, title, description, isbn, staff, year, images[0].filename, pdf[0].filename);
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

    const files = req.files;

    const images =
      files.length >= 0 ?
      files.map((images) => images.filename) :
      null;

    const { title, description, isbn, staff, year } = req.body

    console.log(q);
    const [updatedPublication] = await publication.updatePublicationById(q, title, description, isbn, staff, year, images);
    console.log(updatedPublication.affectedRows);

    res.status(200).json("successful");

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { q }= req.query;
    console.log(q);
    const [deletePublication] = await publication.deletePublicationById(q);
    console.log(deletePublication.affectedRows);

    res.status(200).json("successful");

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};
