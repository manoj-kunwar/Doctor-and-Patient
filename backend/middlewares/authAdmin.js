import jwt from 'jsonwebtoken';

const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) return res.json({ success: false, message: "Not Authorized. Login Again" });

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not Authorized. Login Again" });
  }
};

export default authAdmin;


