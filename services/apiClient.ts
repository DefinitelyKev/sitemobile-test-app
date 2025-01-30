import axios from "axios";

const API_KEY = "183daca270264bad86fc5b72972fb82a";

const ApiClient = axios.create({
  baseURL: "https://newsapi.org/v2",
  headers: {
    "X-Api-Key": API_KEY,
  },
});

export default ApiClient;
