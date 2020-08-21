import { Constant } from "../lib/constants";
export const coreAPI = {
  POST: (url, data) => {
    const formData = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          try {
            let result = JSON.parse(this.responseText);
            // if (result.status === 401) {
            //   localStorage.clear();
            //   window.location.reload();
            // }
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
      xhr.open("POST", Constant.DOMAIN_URL + url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader(
        "Authorization",
        `${localStorage.getItem("token")} `
      );
      xhr.send(formData);
    });
  },

  PATCH: (url, data) => {
    const formData = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          try {
            let result = JSON.parse(this.responseText);
            // if (result.status === 401) {
            //   localStorage.clear();
            //   window.location.reload();
            // }
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
      xhr.open("PATCH", Constant.DOMAIN_URL + url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader(
        "Authorization",
        `${localStorage.getItem("token")} `
      );
      xhr.send(formData);
    });
  },

  PUT: (url, data) => {
    const formData = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          try {
            let result = JSON.parse(this.responseText);
            // if (result.status === 401) {
            //   localStorage.clear();
            //   window.location.reload();
            // }
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
      xhr.open("PUT", Constant.DOMAIN_URL + url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader(
        "Authorization",
        `${localStorage.getItem("token")} `
      );
      xhr.send(formData);
    });
  },

  GET: url => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          try {
            let result = JSON.parse(this.responseText);
            // if (result.status === 401) {
            //   localStorage.clear();
            //   window.location.reload();
            // }
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
      xhr.open("GET", Constant.DOMAIN_URL + url);
      xhr.setRequestHeader(
        "Authorization",
        `${localStorage.getItem("token")} `
      );
      xhr.send();
    });
  },

  DELETE: url => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          try {
            let result = JSON.parse(this.responseText);
            // if (result.status === 401) {
            //   localStorage.clear();
            //   window.location.reload();
            // }
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      });
      xhr.open("DELETE", Constant.DOMAIN_URL + url);
      xhr.setRequestHeader(
        "Authorization",
        `${localStorage.getItem("token")} `
      );
      xhr.send();
    });
  },
  fileUpload: (url, data1) => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      var data = new FormData();
      xhr.withCredentials = false;
      data.append("videoUrl", data1);
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (error) {
            reject(error);
          }
        }
      });
      // xhr.open("POST", Constant.DOMAIN_URL/user/uploads);
      xhr.open("POST", Constant.DOMAIN_URL + url);
      xhr.setRequestHeader(
        "Authorization",
        `${localStorage.getItem("token")}` 
      );
      xhr.send(data);
    });
  },
  fileUpload2: (url, data1) => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      var data = new FormData();
      xhr.withCredentials = false;
      data.append("videoUrl", data1);
      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          try {
            resolve(JSON.parse(this.responseText));
          } catch (error) {
            reject(error);
          }
        }
      });
      // xhr.open("POST", Constant.DOMAIN_URL/user/uploads);
      xhr.open("POST", Constant.DOMAIN_URL + url);
      xhr.setRequestHeader(
        "Authorization",
        `${localStorage.getItem("token")}` 
      );
      xhr.send(data);
    });
  },
};
