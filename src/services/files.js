import multer from 'multer';

const path = require('path');
const uuidv1 = require('uuid/v1');

const storage = multer.diskStorage({
  destination: './files',
  filename(req, file, cb) {
    cb(null, `${uuidv1()}.${path.extname(file.originalname)}`);
  },
});

const uploadMulter = multer({ storage });


const uploadFile = async (req, res) => {
  const { file } = req;

  res.json({
    success: true,
    data: {
      filename: file.filename
    }
  });

};

export { uploadFile, uploadMulter };
