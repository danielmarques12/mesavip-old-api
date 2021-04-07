import fs from 'fs';
import path from 'path';
import cloudinary from 'cloudinary';
import cloudinaryConfig from '../config/cloudinary';

class FileUploadHelper {
  // deleteTmpFolder() {
  //   fs.rm(
  //     path.resolve(__dirname, '..', '..', '..', 'tmp'),
  //     { recursive: true },
  //     () => {}
  //   );
  // }

  async cloudinaryUpload() {
    const transformations = {
      banner: 'mesavip-banner-restaurante',
      lista: 'mesavip-lista-de-restaurante',
    };

    // cloudinary.config(cloudinaryConfig);
    // const { secure_url } = await cloudinary.v2.uploader.upload(tempFilePath, {
    //   folder: 'Mesavip/Uploads',
    //   transformation,
    // });

    // return secure_url;
  }
}

export default new FileUploadHelper();
