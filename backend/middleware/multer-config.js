const multer = require('multer');
const path = require('path');
const mkdirp = require('mkdirp');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/*enregistrer les images*/
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); /*enregistrer les fichiers dans le dossier images*/
    },
    filename: (req, file, callback) => { 
        const name = file.originalname.split(' ').join('_');//utiliser le nom d'origine
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');