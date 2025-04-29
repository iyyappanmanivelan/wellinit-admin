import axios  from "axios";

const defaultOptions = {
  baseURL:  "http://localhost:8000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" ,
    Accept: 'application/json',
  },
};


export const instance = axios.create(defaultOptions)
