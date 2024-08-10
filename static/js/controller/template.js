import { token } from "./cookies.js";

// Base Url
const BaseUrl = "http://localhost:5000";

// Membuat objek konfigurasi untuk permintaan GET
export let requestOptionsGet = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

// Membuat objek konfigurasi untuk permintaan GET
export let requestOptionsPost = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

// API AUTH
export let UrlLogin = `${BaseUrl}/api/auth/login`;
export let UrlRegister = `${BaseUrl}/api/auth/register`;

// API MACHINES
export let UrlCreateMachine = `${BaseUrl}/api/machines`;
export let UrlGetAllMachine = `${BaseUrl}/api/machines`;
export let UrlGetByIdMachine = `${BaseUrl}/api/machines`;
export let UrlUpdateMachine = `${BaseUrl}/api/machines`;
export let UrlDeleteMachine = `${BaseUrl}/api/machines`;

// API USERS
export let UrlGetAllUser = `${BaseUrl}/api/users`;
export let UrlCreateUser = `${BaseUrl}/api/users`;
