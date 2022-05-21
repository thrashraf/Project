import publication from '../model/publication.js';
import crypto from 'crypto';

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

    const id = crypto.randomBytes(16).toString('hex');

    //filter images
    const filterImages =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) === 'image')
        : null;

    const images = filterImages.map((item) => item.filename);
    console.log(images);

    //filter pdf
    const pdf =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) !== 'image')
        : null;
    console.log(pdf);

    const [activitiesCreated] = await publication.createPublication(
      id,
      title,
      description,
      isbn,
      staff,
      year,
      images,
      pdf[0]?.filename
    );

    res.status(200).json({
      message: 'successful',
      image_url: files.length > 0 ? files[0].filename : null,
      pdf_url: pdf[0]?.filename,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const updatePublication = async (req, res) => {
  try {
    const { q } = req.query;

    const files = req.files;

    const { title, description, isbn, staff, year, prevImages, prevPdf } =
      req.body;

    //filter images
    const filterImages =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) === 'image')
        : null;

    const images = filterImages.map((item) => item.filename);
    console.log(images);

    //filter pdf
    const pdf =
      files.length >= 0
        ? files.filter((images) => images.mimetype.slice(0, 5) !== 'image')
        : null;
    console.log(pdf);

    console.log(prevPdf, pdf);

    if (files.length > 0) {
      const [updatedPublication] = await publication.updatePublicationWithImage(
        q,
        title,
        description,
        isbn,
        staff,
        year,
        images.length > 0 ? images : prevImages,
        pdf.length > 0 ? pdf[0].filename : prevPdf
      );

      if (updatedPublication.affectedRows !== 1) {
        res.status(400).json({
          message: 'something went wrong',
        });
      }
    }

    const [updatedPublication] = await publication.updatePublication(
      q,
      title,
      description,
      isbn,
      staff,
      year
    );

    if (updatedPublication.affectedRows !== 1) {
      res.status(400).json({
        message: 'something went wrong',
      });
    }

    res.status(200).json({
      message: 'successful',
      image_url: images.length > 0 ? images : null,
      pdf_url: pdf.length > 0 ? pdf[0].filename : null,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);
    const [deletePublication] = await publication.deletePublicationById(q);
    console.log(deletePublication.affectedRows);

    res.status(200).json('successful');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};
