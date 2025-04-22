"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
const uploadDir = path_1.default.join(process.cwd(), "uploads");
// ודא שהתיקייה קיימת
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir); // יצירת התיקייה אם לא קיימת
}
// הגדרת אחסון התמונות
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // שומר את התמונות בתיקיית uploads
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // שם ייחודי לכל תמונה
    },
});
// יצירת middleware להעלאת תמונות
const upload = (0, multer_1.default)({ storage });
// נתיב להעלאת תמונה
router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` }); // מחזיר את הנתיב של התמונה
});
exports.default = router;
