const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const verifyToken = require('../middleware/verifyAuth')

router.post("/register",authController.registerUser)
router.post("/login",authController.loginUser)
router.post("/add-temp-user",authController.addTempUser)
router.get("/get-all-temp-user", verifyToken , authController.getAllTempUser)

module.exports = router;