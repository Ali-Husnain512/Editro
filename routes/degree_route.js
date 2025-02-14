const degree_controller = require("../controllers/degree_controller")

const router = require("express").Router()

router.post("/docs-verification", degree_controller.docs_verification)
router.post("/docs-register", degree_controller.degree_register)
// router.post("/createDegree", auth, degree_controller.createDegreeData)
// router.get("/userDesign/:design_id", auth, degree_controller.getDegreeData)

module.exports = router
