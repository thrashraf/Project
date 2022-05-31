import kpi from '../model/kpi.js';

export const getKpiValue = async (req, res) => {
  try {
    const [kpi] = await kpi.showKpi();

    res.status(200).send(kpi);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};

export const updateKpiValue = async (req, res) => {
  try {
    const { event, publication, innovation } = req.body;
    const [kpi] = await kpi.updateKpi(event, publication, innovation);

    res.status(200).send({ message: 'successful' });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "can't load data",
    });
  }
};
