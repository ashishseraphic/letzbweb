import { coreAPI } from "../api/core";

export function getFeedbacks(cb) {
        let url = `feedbacks`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}


export function deleteFeedback(id,cb) {
    let url = `deletefeedback/${id}`;       
    coreAPI
      .PATCH(url)
      .then(res => {
        cb(res);
      })
      .catch(error => {
        cb(error);
      });
}
