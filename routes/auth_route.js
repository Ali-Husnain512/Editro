const auth_controller = require("../controllers/auth_controller")

const router = require("express").Router()
const auth = require("../middlewares/middlewares")

router.post("/user-register", auth_controller.user_register)
router.post("/user-login", auth_controller.user_login)
router.get("/getUsers", auth, auth_controller.getUsers)
router.post("/user-forgot", auth_controller.forgotPassword)

module.exports = router
