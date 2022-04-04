

export const uploadPhoto = async(req, res) => {
    try {
        const images = req.files
        res.status(200).json({images});
    } catch (error) {
        console.log(error)
    }
}