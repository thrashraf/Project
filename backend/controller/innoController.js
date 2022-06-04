import inno from '../model/inno.js';
import crypto from 'crypto';

export const showInno = async (req, res) => {
  try {
    const { q } = req.query;

    //add search by year
    const keys = ['Title'];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q.toLowerCase()))
      );
    };
    const [allInno] = await inno.showUser();

    res.status(200).json(search(allInno));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const createInnovation = async (req, res) => {
  try {
    const { Title, Description, Name, Program, Level, Medal, Year } = req.body;
    const files = req.files;

    const id = crypto.randomBytes(16).toString('hex');

    //console.log(files);

    //filter images
    const filterImages =
      files.length > 0
        ? files.filter((images) => images.mimetype.slice(0, 5) === 'image')
        : null;

    const images = filterImages.map((item) => item.key);
    //console.log(images);

    //filter pdf
    const pdf =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) !== 'image')
        : null;
    //console.log(pdf);

    //console.log(Title, Description, Name, Program, Level, Medal, Year);

    const [activitiesCreated] = await inno.createInnovation(
      id,
      Title,
      Description,
      Name,
      Program,
      Level,
      Medal,
      Year,
      images[0].key,
      pdf[0].key
    );
    console.log('images : ' + images[0]);
    console.log('pdf : ' + pdf[0]?.key);

    res.status(200).json({ message: 'successful', img_url: images[0] });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const updatedInnovation = async (req, res) => {
  try {
    const { q } = req.query;

    const files = req.files;

    const {
      Title,
      Description,
      Name,
      Program,
      Level,
      Medal,
      Year,
      prevImages,
      prevPdf,
    } = req.body;

    console.log(req.body);
    //filter images
    const filterImages =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) === 'image')
        : null;

    const images = filterImages.map((item) => item.key);
    console.log(prevImages, images);

    //filter pdf
    const pdf =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) !== 'image')
        : null;
    console.log(pdf);

    console.log(prevPdf, pdf);
    console.log(prevImages);
    if (files.length > 0) {
      const [updatedPublication] = await inno.updateInnovationWithImages(
        q,
        Title,
        Description,
        Name,
        Program,
        Level,
        Medal,
        Year,
        images.length > 0 ? images[0].key : prevImages,
        pdf.length > 0 ? pdf[0].key : prevPdf
      );

      if (updatedPublication.affectedRows !== 1) {
        res.status(400).json({
          message: 'something went wrong',
        });
      }
    }

    const [updatedPublication] = await inno.updateInnovation(
      q,
      Title,
      Description,
      Name,
      Program,
      Level,
      Medal,
      Year
    );

    if (updatedPublication.affectedRows !== 1) {
      res.status(400).json({
        message: 'something went wrong',
      });
    }

    res.status(200).json({
      message: 'successful',
      image_url: images.length > 0 ? images : null,
      pdf_url: pdf.length > 0 ? pdf[0].key : null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const deleteInnovation = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    const [deleteInnovation] = await inno.deleteInnovationById(q);
    console.log(deleteInnovation.affectedRows);

    res.status(200).json('successful');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};
