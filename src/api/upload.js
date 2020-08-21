import { coreAPI } from "./core";

export default {
  upload: (data, cb) => {
    let url = "upload";
    coreAPI
      .fileUpload(url, data)
      .then(res => {
        
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  },
  uploadThumbnail: (data, cb) => {
    let url = "uploadthumbnail";
    coreAPI
      .fileUpload2(url, data)
      .then(res => {
        
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  }
};
