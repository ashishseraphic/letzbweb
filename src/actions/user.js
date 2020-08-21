import UserApi from "../api/user";

export function signInAdmin(data, cb) {
  return (dispatch, getState) => {
    UserApi.signInAdmin(data, res => {
      cb(res);
    });
  };
}

export function signOutAdmin(cb) {
  return (dispatch, getState) => {
    UserApi.signOutAdmin(res => {
      cb(res);
    });
  };
}

export function forgotPassword(data, cb) {
  return (dispatch, getState) => {
    UserApi.forgotPassword(data, res => {
      cb(res);
    });
  };
}

export function changePassword(data, cb) {
  return (dispatch, getState) => {
    UserApi.changePassword(data, res => {
      cb(res);
    });
  };
}

export function changeEmailAdmin(data, cb) {
  return (dispatch, getState) => {
    UserApi.changeEmailAdmin(data, res => {
      cb(res);
    });
  };
}
