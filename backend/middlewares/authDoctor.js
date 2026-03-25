import jwt from 'jsonwebtoken';

const authDoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) return res.json({ success: false, message: "Not Authorized. Login Again" });

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.docId = decoded.id;   // store doctor id in request
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not Authorized. Login Again" });
  }
};

export default authDoctor;
