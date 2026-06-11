import path from 'path';
import fs from 'fs';
import express from 'express';
import multer from 'multer';
import uploadController from '../controllers/upload.controller.js';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

function sanitizeImageName(name) {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const providedName = req.body.imageName ? sanitizeImageName(req.body.imageName) : null;
    if (!providedName) return cb(new Error('Image name is required.'));
    
    const ext = path.extname(file.originalname).toLowerCase();
    const newFileName = providedName + ext;
    const filePath = path.join('uploads', newFileName);
    
    if (fs.existsSync(filePath)) {
      return cb(new Error(`A file named "${newFileName}" already exists. Please choose a different name.`));
    }
    cb(null, newFileName);
  }
});

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, gif, webp) are allowed.'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 2 * 1024 * 1024 } 
});

// Protected Routes
router.get('/', authController.isAuthenticated, uploadController.getUploadPage);

router.post('/', authController.isAuthenticated, (req, res, next) => {
  upload.single('myFile')(req, res, (err) => {
    if (err) {
      return res.redirect(`/welfare-board/api/upload?error=${encodeURIComponent(err.message)}`);
    }
    next();
  });
}, uploadController.uploadFile);

router.get('/delete/:filename', authController.isAuthenticated, uploadController.deleteFile);

export default router;
