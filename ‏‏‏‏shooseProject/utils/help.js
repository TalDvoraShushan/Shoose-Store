import jwt from "jsonwebtoken";

export function generateToken(user) {
    let token = jwt.sign({ userId: user.idusers, role: user.role, username: user.name }, process.env.SECRET_KEY, { expiresIn: "10m" })
    return token;
}

export const checkToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).json("מצטערים עליך לבצע כניסה קודם")

    try {
        let result = jwt.verify(token, process.env.SECRET_KEY)
        req.user = result;
        next()
    }
    catch (err) {
        return res.status(401).json("מצטערים עליך לבצע כניסה קודם" + err.message)
    }
}

export const checkAdmin = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).json("מצטערים עליך לבצע כניסה קודם")

    try {
        let result = jwt.verify(token, process.env.SECRET_KEY)
        if (result.role != "maneger")
            return res.status(403).json("אין לך הרשאה לעשות את הפעולה הזאת" + err.message)
        req.user = result;
        next()
    }
    catch (err) {
        return res.status(401).json("מצטערים עליך לבצע כניסה קודם" + err.message)
    }
}