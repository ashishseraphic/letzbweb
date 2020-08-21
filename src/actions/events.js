import { coreAPI } from "../api/core";

export function getApprovedEvents(cb) {
        let url = `approvedevents`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}


export function getUnApprovedEvents(cb) {
    let url = `pendingevents`;       
    coreAPI
      .GET(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}

export function deleteEvent(id,cb) {
    let url = `deleteevent/${id}`;       
    coreAPI
      .PATCH(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}

export function approveEvent(id,cb) {
  let url = `approveevent/${id}`;       
  coreAPI
    .PATCH(url)
    .then(res => {
      cb(res);
    })
    .catch(error => {
      cb(error);
    });
}


export function disapproveEvent(id,cb) {
  let url = `disapproveevent/${id}`;       
  coreAPI
    .PATCH(url)
    .then(res => {
      cb(res);
    })
    .catch(error => {
      cb(error);
    });
}
