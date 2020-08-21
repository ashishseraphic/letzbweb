import { coreAPI } from "../api/core";

export function getLocations(cb) {
        let url = `getlocations`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}


export function deleteLocation(id,cb) {
    let url = `deletelocation/${id}`;       
    coreAPI
      .PATCH(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}

export function editLocation(data,id,cb) {
    let url = `editlocation/${id}`;       
    coreAPI
      .POST(url,data)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}

export function addLocation(data,cb) {
  let url = `addlocation`;       
  coreAPI
    .POST(url,data)
    .then(res => {
      cb(res);
    })
    .catch(error => {
      cb(error);
    });
}


export function getLocation(id,cb) {
  let url = `location/${id}`;       
  coreAPI
    .GET(url)
    .then(res => {
      cb(res);
    })
    .catch(error => {
      cb(error);
    });
}
