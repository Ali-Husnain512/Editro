const designController = require("../controllers/design_controllers")

const router = require("express").Router()
const auth = require("../middlewares/middlewares")

router.post("/createUserDesign", auth, designController.createUserDesign)
router.delete(
  "/deleteUserDesign/:design_id",
  auth,
  designController.deleteUserDesign
)
router.get("/userDesign/:design_id", auth, designController.getUserDesign)
router.put(
  "/updateUserDesign/:design_id",
  auth,
  designController.updateUserDesign
)
router.post("/addUserImage", auth, designController.addUserImage)
router.get("/getUserImage", auth, designController.getUserImage)

router.get("/getDesignImage", auth, designController.getDesignImage)
router.get("/getBackgroundImage", auth, designController.getBackgroundImage)

router.get("/getDesigns", auth, designController.getDesigns)

module.exports = router
