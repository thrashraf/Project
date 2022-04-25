import activities from "../model/activities.js";

export const allActivities = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q)

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
