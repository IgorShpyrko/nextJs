export const prepareSearchParams = (params: any): string => {
  let _params = '';

  Object.keys(params).map(param => {
    if (params[param]) {
      if (typeof params[param] !== 'object') {
        _params += `&search_params.${param}=${params[param]}`;
      } else {
        _params += prepareSearchParams(params[param])
      }
    }
  });

  return _params;
};
