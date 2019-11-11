import { axiosApi } from '../utils/axios';

import { prepareSearchParams } from '../helpers/prepareSearchParams';

export default {
  getMarkers: (params) => {
    return axiosApi.get(`https://www.roomster.com/api/search?${prepareSearchParams(params)}`);
  }
};
