import user from '../model/users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    //get value from frontend
    const { userName, userEmail, userPassword } = req.body;
    //console.log(firstName, lastName, email, password);

    //want to check if user exist
    const [checkExistingEmail] = await user.checkEmail(userEmail);

    //if user already thrown an error
    if (checkExistingEmail.length > 0) {
      //console.log('email already exist');
      return res.status(400).json({
        message: 'email already exist',
      });
    }

    const id = crypto.randomBytes(16).toString('hex');

    //hash user password
    const hashPassword = bcrypt.hashSync(userPassword);

    console.log(hashPassword);

    //create user
    await user.register(id, userName, userEmail, hashPassword);

    //response successful create user 🎉
    res.status(200).json({
      message: 'successful create!',
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    let route;

    const { email, password } = req.body;

    console.log(email, password);

    //check for existing email
    const [checkExistingEmail] = await user.checkEmail(email);

    //thrown error if not found any
    if (checkExistingEmail.length === 0) {
      return res.status(400).json({
        message: 'Incorrect password',
      });
    }

    //User info
    const userInfo = checkExistingEmail[0];

    //compare password with req.password and database password
    //will return boolean
    const isValid = bcrypt.compareSync(password, userInfo.password);

    //thrown error if false
    if (!isValid) {
      return res.status(400).json({
        message: 'Incorrect password',
      });
    }

    //generate token if true
    const accessToken = jwt.sign(
      {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        profile_picture: userInfo.profile_picture,
        phone_number: userInfo.phone_number,
        position: userInfo.position,
        signature: userInfo.signature,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    );
    console.log(accessToken);

    const refreshToken = jwt.sign(
      {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        role: userInfo.role,
        profile_picture: userInfo.profile_picture,
        phone_number: userInfo.phone_number,
        position: userInfo.position,
        signature: userInfo.signature,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '365d',
      }
    );

    await user.updateRefreshToken(userInfo.id, refreshToken);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    //create dynamic routes based on role
    if (userInfo.role === 'admin') {
      route = '/admin/users';
    } else if (userInfo.role === 'hd') {
      route = '/kj/dashboard';
    } else {
      route = '/';
    }

    res.status(200).json({
      accessToken,
      route,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'Incorrect password',
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { q } = req.query;

    const keys = ['name'];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q.toLowerCase()))
      );
    };

    const [allUser] = await user.getAllUser();

    res.status(200).json(search(allUser).splice(0, 10));
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Something went wrong 🤔',
    });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  const [userInfo] = await user.findRefreshToken(refreshToken);

  if (!userInfo[0]) return res.sendStatus(204);
  const id = userInfo[0].id;
  await user.updateRefreshToken(id);

  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};

export const testDelete = async (req, res) => {
  try {
    res.status(200).json({
      message: 'auth',
    });
  } catch (error) {
    res.status(400).json({
      message: 'who are u?',
    });
  }
};

export const authUser = async (req, res) => {
  try {
    const { email, reqPassword } = req.body;

    console.log(email, reqPassword);

    const [userInfo] = await user.findByEmail(email);

    console.log(userInfo);

    const password = userInfo[0].password;
    const isValid = bcrypt.compareSync(reqPassword, password);

    if (!isValid) {
      return res.status(400).json({
        message: 'Incorrect password',
      });
      return;
    }

    return res.status(200).json({
      message: 'successful confirmation!',
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const { email } = req.body;
    const files = req.file;
    console.log(files);

    const [updateUser] = await user.updateSignature(files.key, email);

    res.status(200).json({
      message: 'Successful update',
      signature: files.key,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInformation = async (req, res) => {
  try {
    const { id, name, position, email, phoneNumber } = req.body;
    console.log(id, name, position, email, phoneNumber);
    const [updateUser] = await user.updateUserInformation(
      id,
      name ? name : '',
      position ? position : '',
      email ? email : '',
      phoneNumber ? phoneNumber : ''
    );

    res.status(200).json({
      message: 'Successful update',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const { email } = req.body;
    const files = req.file;
    console.log(files);

    const [updateUser] = await user.updatePicture(files.key, email);

    console.log(updateUser);
    res.status(200).json({
      message: 'Successful update',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword } = req.body;

    const [selectedUser] = await user.getUserById(id);
    const userInfo = selectedUser[0];

    const isValid = bcrypt.compareSync(currentPassword, userInfo.password);
    console.log(isValid);
    if (!isValid) {
      return res.status(400).json({
        message: 'Incorrect Password',
      });
    }

    const hashPassword = bcrypt.hashSync(newPassword);

    const [updatePassword] = await user.updatePassword(id, hashPassword);

    if (updatePassword.affectedRows === 1) {
      return res.status(200).json({
        message: 'Successful',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Something went wrong',
    });
  }
};

export const getAmountUser = async (req, res) => {
  try {
    const [amountUser] = await user.calculateUser();

    return res.status(200).json({
      amount: amountUser[0]['COUNT(*)'],
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Something went wrong',
    });
  }
};
