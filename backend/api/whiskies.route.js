import express from "express";
import whiskiesController from "./whiskies.controller.js";
const router = express.Router();
router.route("/").get(whiskiesController.apiGetWhiskies);

router.route("/distilleries").get(whiskiesController.apiGetWhiskeyDistilleries);

router
  .route("/action")
  .post(whiskiesController.apiAddWhiskey)
  .put(whiskiesController.apiEditWhiskey)
  .delete(whiskiesController.apiDeleteWhiskey);

export default router;
