import { coreAPI } from "./core";

export default {
  

  getUsersList: cb => {
    let url = 'users';
    coreAPI
      .GET(url)
      .then(res => {
       
        
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  },
};
