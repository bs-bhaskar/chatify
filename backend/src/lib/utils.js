import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
    return token;
};