const express = require("express");
const {
  registerOrg,
  loginOrg,
  refreshToken,
  logoutOrg,
} = require("../controllers/orgAuth.comtroller");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerOrg);
router.post("/login", loginOrg);
router.get("/refresh", refreshToken);
router.post("/logout", logoutOrg);

// example protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Protected Org Profile!" });
});

module.exports = router;
