import { upload } from "../routes/issue-attachments.route.js";
import fs from "fs/promises";

const uploadImage = async (req, res) => {
  upload(req, res, (error) => {
    if (error) return res.status(500).send();

    return res.send("Image successfully uploaded");
  });
};

const indexImages = async (req, res) => {
  const { id } = req.params;
  const dir = `uploads/attachments/issues/${id}`;

  try {
    const files = await fs.readdir(dir);
    if (files.length > 0) res.send({ rows: files, rowCount: files.length });
  } catch (error) {
    res.status(404).send();
  }
};

export default { uploadImage, indexImages };
