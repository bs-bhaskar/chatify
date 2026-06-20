import jwt from "jsonwebtoken"

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,// Prevent client-side JavaScript from accessing the cookie xxs attacks: cross site scripting attacks
        sameSite: "strict", // Prevent CSRF attacks
        secure: process.env.NODE_ENV === "development"?false:true, // Use secure cookies in production
    });
    return token;
}
//localhost:3000/api/auth/signup                     ----->     not secure because we are in development mode and not using https
//https://chatify-app.onrender.com/api/auth/signup   ----->     secure because we are in production mode and using https