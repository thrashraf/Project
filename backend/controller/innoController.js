import inno from "../model/inno.js";
import crypto from "crypto";

export const showInno = async (req, res) => {
  try {
    const { q } = req.query;

    //add search by year
    const keys = ["Title"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q.toLowerCase()))
      );
    };
    const [allInno] = await inno.showUser();

    res.status(200).json(search(allInno).splice(0, 10));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const createInnovation = async (req, res) => {
  try {
    const { Title, Name, Program, Level, Medal, Year } = req.body;
    const files = req.files;

    const id = crypto.randomBytes(16).toString("hex");

    //filter images
    const images =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) === "image")
        : null;
    console.log(images);

    console.log(Title, Name, Program, Level, Medal, Year);
    
    const [activitiesCreated] = await inno.createInnovation(
      id,
      Title,
      Name,
      Program,
      Level,
      Medal,
      Year,
      images[0]?.filename
    );

    res.status(200).json({message: 'successful', img_url: images[0]?.filename});
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};
