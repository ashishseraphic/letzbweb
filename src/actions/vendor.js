import { coreAPI } from "../api/core";

export function getVendors(data,cb) {
        let url = `vendors?text=${data}`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}


// export function deleteUser(data,cb) {
//   let url = `deleteuser/${data}`;  
//   coreAPI
//     .DELETE(url,data)
//     .then(res => {      
//       cb(res);
//     })
//     .catch(error => {      
//       cb(error);
//     });
// }

