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

// Membuat objek konfigurasi untuk permintaan POST
export let requestOptionsPost = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

// Membuat objek konfigurasi untuk permintaan PUT
export let requestOptionsPut = {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
};

// Membuat objek konfigurasi untuk permintaan DELETE
export let requestOptionsDelete = {
  method: "DELETE",
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
export let UrlMachines = `${BaseUrl}/api/machines`;
export let UrlMachineDetails = `${BaseUrl}/api/details`;

// API USERS
export let UrlUsers = `${BaseUrl}/api/users`;

// API PRODUCTIONS
export let UrlProductions = `${BaseUrl}/api/productions`;
export let UrlProductionDetails = `${BaseUrl}/api/details`;

// API BAKU
export let UrlBakuModule = `${BaseUrl}/api/modules/`;
export let UrlBaku = `${BaseUrl}/api/modules/production`;