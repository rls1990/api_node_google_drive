import { Router } from "express";
import {} from "../config.js";
import { uploadFile } from "../controller/googledrivercontroller.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hola");
});

router.get("/uploadfile", uploadFile);

export default router;
