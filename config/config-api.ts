import {ApiConfig} from "src/core/config/api/api";

export const api = ApiConfig.create({
  root: '/src/services/api/',
  swaggers: [
    {
      name: '',
      url: '',
      groups: [],
    }
  ],
});
