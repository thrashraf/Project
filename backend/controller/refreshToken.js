import user from "../model/users.js";
import jwt from "jsonwebtoken"

export const refreshToken = async (req, res) => {
    try {
        //get refreshToken from cookie
        const refreshToken = req.cookies.refreshToken;

        //console.log('token: ' + req.cookies.refreshToken);
        //thrown an error if no token
        if (!refreshToken) return res.sendStatus(401);
        
        //find refreshToken
        const [userInfo] = await user.findRefreshToken(refreshToken);

        //if token not same then throw error
        if (!userInfo[0]) return res.sendStatus(403);

        //verify token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

            if (err) return res.sendStatus(403);

            const accessToken = jwt.sign({
                
                id: userInfo[0].id,
                name: userInfo[0].name,
                email: userInfo[0].email,
                role: userInfo[0].role,
                profile_picture: userInfo[0].profile_picture,
                phone_number: userInfo[0].phone_number,
                position: userInfo[0].position,
                signature: userInfo[0].signature,

            }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            //send new token
            res.json({
                accessToken
            });
        });

    } catch (error) {
        console.log(error)
    }
}