// import jwt from 'jsonwebtoken';

// const authUser = (req, res, next) => {
//   try {
//     const token = req.headers.token || req.headers.authorization?.split(" ")[1]; 

//     if (!token) {
//       return res.json({ success: false, message: "Not Authorized. Login Again" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Make sure token contains id
//     if (!decoded.id) {
//       return res.json({ success: false, message: "Invalid token payload" });
//     }

//     req.userId = decoded.id;  
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Not Authorized. Login Again" });
//   }
// };

// export default authUser;



import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token =
      req.headers.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }

    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Not Authorized" });
  }
};

export default authUser;