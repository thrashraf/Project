import admin from "../model/admin.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  try {
    const { id, name, email, role } = req.body;
    const [updateResult] = await admin.updateUser(id, name, email, role);

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }

    return res.status(200).json({ message: "successfully update user!" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "something went wrong",
    });
  }
};
 
export const updateUserWithPassword = async (req, res) => {
  try {
    const { id, name, email, role, password } = req.body;
    // hash user password before update
    const hashPassword = bcrypt.hashSync(password);

    const [updateResult] = await admin.updateUserWithPassword(id, name, email, role, hashPassword);

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }

    return res.status(200).json({ message: "successfully update user!" });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "something went wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    
    const { id } = req.body;

    console.log(id)

    const [deleteUserAction] = await admin.deleteUser(id);

    if (deleteUserAction.affectedRows === 0) {
      return res.status(400).json({
        message: "something went wrong",
      });
    }

    return res.status(200).json({ message: "successfully update user!" });

  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: "something went wrong",
    });
  }
}
