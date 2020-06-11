import axios from "axios";
import { getToken } from "../Auth";
import { HOST } from "../Url";

const request = (options, onSuccess, onError) => {
  const { headers, ...restOptions } = options;
  const client = axios.create({
    baseURL: HOST,
    headers: {
      source: "admin",
      "Content-Type": "application/json;charset=UTF-8",
      accept: "application/json",
      "USER-TOKEN": getToken(),
      ...headers
    }
  });

  options = {
    ...restOptions
  };

  const requestPromise = client(options);
  if (onSuccess) {
    return requestPromise.then(onSuccess).catch((error, ...rest) => {
      onError(error);
    });
  }
  return requestPromise;
};

export default request;
