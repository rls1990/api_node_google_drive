import fs from "fs";
import { google } from "googleapis";
import { GOOGLE_API_FOLDER_ID } from "../config.js";
import path from "path";

export const uploadFile = async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve("src", "googledriver.json"),
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driverService = google.drive({
      version: "v3",
      auth,
    });

    const fileMetaData = {
      name: `${Date.now()}.jpg`,
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: "image/jpg",
      body: fs.createReadStream(path.resolve("src", "data", "descarga.jpg")),
    };

    const respose = await driverService.files.create({
      resource: fileMetaData,
      media: media,
      fields: "id",
    });

    res.json({
      id: respose.data.id,
      url: `https://drive.google.com/uc?export=view&id=${respose.data.id}`, //url image
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
};
