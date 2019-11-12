import { axiosApi } from '../utils/axios';

import { prepareSearchParams } from '../helpers/prepareSearchParams';

export default {
  getMarkers: (params) => {
    return axiosApi.get(`https://www.roomster.com/api/search?${prepareSearchParams(params)}`);
  },
  getStyles: () => {
    return axiosApi.get('https://map.roomster.com/styles/osm-bright/style.json?key=oxQ5YeTFJ13jkTv9eIN9pB67cKSSFhsV');
  }
};
