const express = require("express")
const router = express.Router()
const data = require("../middleware/controllers/getPlc")
const newUser = require("../middleware/controllers/createUser")


router.get("/", data)

router.post('/', newUser)







module.exports = router