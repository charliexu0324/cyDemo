// to-do

import axios from "axios";

export let externalApiClient;
export let internalApiClient;
export const defaultHeaders = {
  "content-type": "application/json"
};

export const configure = ({ externalApiUrl, internalApiUrl }) => {
  externalApiClient = axios.create({
    baseURL: externalApiUrl,
    headers: defaultHeaders
  });
  internalApiClient = axios.create({
    baseURL: internalApiUrl,
    headers: defaultHeaders
  });
};
