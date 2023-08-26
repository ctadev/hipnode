import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }, 
});

const upload = multer({ storage: storage });

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }

    next()
  });
};

export const handleImageUpload = (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Image uploaded successfully' });
}

export default uploadMiddleware;