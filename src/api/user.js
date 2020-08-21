import { coreAPI } from "./core";

export default {
  signInAdmin: (data, cb) => {
    let url = "loginadmin";
    coreAPI
      .POST(url, data)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  },
  signOutAdmin: cb => {
    let url = "logout";
    coreAPI
      .DELETE(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  },
  forgotPassword: (data, cb) => {
    let url = "forgot-password";
    coreAPI
      .POST(url, data)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  },
  changePassword: (data, cb) => {
    let url = "change-password";
    coreAPI
      .PATCH(url, data)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  },
  changeEmailAdmin: (data, cb) => {
    let url = "adminemail";
    coreAPI
      .PATCH(url, data)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  }
};

