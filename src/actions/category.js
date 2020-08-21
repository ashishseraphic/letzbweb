import { coreAPI } from "../api/core";

export function getCategories(cb) {
        let url = `getcategories`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}

export function deleteCategory(id,cb) {
    let url = `deletecategory/${id}`;       
    coreAPI
      .PATCH(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}


export function editCategory(data,id,cb) {
    let url = `editcategory/${id}`;       
    coreAPI
      .POST(url,data)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}

export function addCategory(data,cb) {
  let url = `addcategory`;       
  coreAPI
    .POST(url,data)
    .then(res => {
      cb(res);
    })
    .catch(error => {
      cb(error);
    });
}

export function getCategory(id,cb) {
  let url = `category/${id}`;       
  coreAPI
    .GET(url)
    .then(res => {
      cb(res);
    })
    .catch(error => {
      cb(error);
    });
}
