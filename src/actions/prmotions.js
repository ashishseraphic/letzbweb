import { coreAPI } from "../api/core";

export function getApprovedPromotions(cb) {
        let url = `approvedpromotions`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}


export function getUnApprovedPromotions(cb) {
    let url = `pendingpromotions`;       
    coreAPI
      .GET(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}

export function deletePromotion(id,cb) {
    let url = `deletepromotion/${id}`;  
    coreAPI
      .PATCH(url)
      .then(res => {      
        cb(res);
      })
      .catch(error => {      
        cb(error);
      });
  }
  
  export function approvePromotion(id,cb) {
    let url = `approvepromotion/${id}`;       
    coreAPI
      .PATCH(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  }
  
  
  export function disapprovePromotion(id,cb) {
    let url = `disapprovepromotion/${id}`;       
    coreAPI
      .PATCH(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
  }
  