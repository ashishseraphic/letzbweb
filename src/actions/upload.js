import UploadApi from "../api/upload";

export function upload(data, cb) {  
  return (dispatch, getState) => {
    UploadApi.upload(data, res => {
      cb(res);
    });
  };
}

export function uploadThumbnail(data, cb) {  
  return (dispatch, getState) => {
    UploadApi.uploadThumbnail(data, res => {
      cb(res);
    });
  };
}
