import publication from '../model/publication.js'

export const showPublication =async (req, res) => {
    try {
        const [allPublication] = await publication.showUser();

        res.status(200).json({allPublication})
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "can't load data"
        })
    }
}
