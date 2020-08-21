import { coreAPI } from "../api/core";

export function getAllSubscriptions(cb) {
        let url = `subscriptions`;       
        coreAPI
          .GET(url)
          .then(res => {
            cb(res);
          })
          .catch(error => {
            cb(error);
          });
}