import activities from "../model/activities.js";

export const allActivities = async (req, res) => {
  try {
    const [allActivities] = await activities.getAllActivities();
    res.status(200).json({ allActivities });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};
