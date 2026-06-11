import fs from 'fs';
import path from 'path';

export const getUploadPage = (req, res) => {
  const uploadedFiles = fs.readdirSync('uploads');
  const error = req.query.error || null;
  const success = req.query.success || null;
  res.render('index', { files: uploadedFiles, user: req.session.user, error, success });
};

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.redirect(`/welfare-board/api/upload?error=${encodeURIComponent('No file uploaded.')}`);
  }
  res.redirect(`/welfare-board/api/upload?success=${encodeURIComponent(`File "${req.file.filename}" uploaded successfully!`)}`);
};

export const deleteFile = (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join('uploads', filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.redirect('/welfare-board/api/upload');
};

// Add a default export that aggregates the functions:
export default {
  getUploadPage,
  uploadFile,
  deleteFile,
};
