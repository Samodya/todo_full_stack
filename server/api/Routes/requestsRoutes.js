const express = require("express");
const router = express.Router();

const requestController = require("../controllers/requestController");
const authMiddleware = require("../middleware/authCheckmiddleware");

router.post("/", authMiddleware, requestController.createRequest);
router.get("/", authMiddleware, requestController.getRequests);
router.get("/request/:reqId", authMiddleware, requestController.getRequestById);
router.get(
  "/user/:userId",
  authMiddleware,
  requestController.getRequestsByUser
);
router.get(
  "/to_user/:userId",
  authMiddleware,
  requestController.getRequestsByReciever
);
router.put("/:reqId", authMiddleware, requestController.editRequests);
router.delete("/:reqId", authMiddleware, requestController.deleterequests);

module.exports = router;
