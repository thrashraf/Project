import admin from '../model/admin.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import user from '../model/users.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, role, phone_number, password } = req.body;

    const id = crypto.randomBytes(16).toString('hex');

    //want to check if user exist
    const [checkExistingEmail] = await user.checkEmail(email);

    //if user already thrown an error
    if (checkExistingEmail.length > 0) {
      //console.log('email already exist');
      return res.status(400).json({
        message: 'email already exist',
      });
    }

    const hashPassword = bcrypt.hashSync(password);

    const [createUser] = await admin.createUser(
      id,
      name,
      email,
      role,
      phone_number,
      hashPassword
    );

    return res.status(200).json({ message: 'successfully update user!' });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'something went wrong',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, name, email, role, img_url, phone_number } = req.body;
    console.log(req.file, id, name, email, role, img_url);

    if (req.file !== undefined) {
      const [updateResult] = await admin.updateUserWithImages(
        id,
        name,
        email,
        role,
        req.file.filename
      );

      return updateResult.affectedRows === 1
        ? res.status(200).json({
            message: 'successfully update user!',
            img_url: req.file.filename,
          })
        : res.status(400).json({
            message: 'something went wrong...',
          });
    }

    const [updateResult] = await admin.updateUser(id, name, email, role);

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({
        message: 'something went wrong',
      });
    }

    return res
      .status(200)
      .json({ message: 'successfully update user!', img_url });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'something went wrong',
    });
  }
};

export const updateUserWithPassword = async (req, res) => {
  try {
    const { id, name, email, role, password } = req.body;
    // hash user password before update
    const hashPassword = bcrypt.hashSync(password);

    const [updateResult] = await admin.updateUserWithPassword(
      id,
      name,
      email,
      role,
      hashPassword
    );

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({
        message: 'something went wrong',
      });
    }

    return res.status(200).json({ message: 'successfully update user!' });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'something went wrong',
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { q } = req.query;
    const [deleteUserAction] = await admin.deleteUser(q);

    if (deleteUserAction.affectedRows === 0) {
      return res.status(400).json({
        message: 'something went wrong',
      });
    }

    return res
      .status(200)
      .json({ message: 'successfully update user!', id: q });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'something went wrong',
    });
  }
};
