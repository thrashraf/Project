import inno from '../model/inno.js'

export const showInno =async (req, res) => {
    try {
        const [allInno] = await inno.showUser();

        res.status(200).json({allInno})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "can't load data"
        })
    }
}

