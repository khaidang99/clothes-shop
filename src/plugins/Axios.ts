import axios, { AxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';
import queryString from 'query-string';

const instance = axios.create({
  paramsSerializer: params => queryString.stringify(params)
});
instance.defaults.baseURL = 'http://localhost:5000/api/';
instance.defaults.headers.common.Accept = 'application/json';
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Interceptors
instance.interceptors.request.use(
    (config: AxiosRequestConfig<any>) => {
      if (Cookie.get('token')) {
        config!.headers!.Authorization = `Bearer ${Cookie.get('token')}`
      }
      return config
    }
)

instance.interceptors.response.use(response => response,
    async (error) => {
        console.log(error)
        var { status } = error.response
        if ([400, 403, 404, 422, 429].includes(status)) {
            alert('not connect API');
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)
  
export default instance
