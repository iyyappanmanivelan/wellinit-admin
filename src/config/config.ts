import axios  from "axios";

const BASEURL = import.meta.env.VITE_API_URL;

const defaultOptions = {
  baseURL:  BASEURL,
  headers: {
    "Content-Type": "application/json" ,
    Accept: 'application/json',
  },
};


export const instance = axios.create(defaultOptions)
