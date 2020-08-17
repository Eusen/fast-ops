import {ApiConfig} from "../src/core/config/api/api";

export const apis = ApiConfig.create({
  root: '/demo/api/',
  swaggers: [
    {
      name: '',
      url: '',
      groups: [],
    }
  ],
});
