import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const uploadDir = path.join(process.cwd(), "uploads");

// ודא שהתיקייה קיימת
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // יצירת התיקייה אם לא קיימת
}

// הגדרת טיפוסים עבור Request ו-File
interface CustomRequest extends Request {
  file?: Express.Multer.File; // הוספת השדה file של multer
}

// הגדרת אחסון התמונות
const storage = multer.diskStorage({
  destination: (req: CustomRequest, file, cb) => {
    cb(null, uploadDir); // שומר את התמונות בתיקיית uploads
  },
  filename: (req: CustomRequest, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // שם ייחודי לכל תמונה
  },
});

// יצירת middleware להעלאת תמונות
const upload = multer({ storage });

// נתיב להעלאת תמונה
router.post("/", upload.single("image"), (req: CustomRequest, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
  
  res.json({ imageUrl: `/uploads/${req.file.filename}` }); // מחזיר את הנתיב של התמונה
});

export default router;
