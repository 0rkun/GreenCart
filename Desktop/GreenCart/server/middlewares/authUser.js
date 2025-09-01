import jwt from "jsonwebtoken";
import User from "../models/User.js"; // kendi model yoluna göre ayarla

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    // Token decode et
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı DB'den bul
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    // Middleware üzerinden user bilgisini aktar
    req.user = user;

    // Eğer sadece middleware olup devam etsin istiyorsan:
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
