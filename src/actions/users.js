
import { coreAPI } from "../api/core";

export function getUsersAdmin(data,cb) {
        let url = `usersadmin?text=${data}`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}


export function deleteUser(id,cb) {
  let url = `deleteuser/${id}`;  
  coreAPI
    .PATCH(url)
    .then(res => {      
      cb(res);
    })
    .catch(error => {      
      cb(error);
    });
}

