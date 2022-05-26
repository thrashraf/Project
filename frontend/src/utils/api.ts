import axios from "axios"
import jwt_decode from 'jwt-decode'
import { instance } from "../features/user/User"
import url from '../utils/url'

let store: any;

export const injectStore = (_store: any) => {
    store = _store
}

const api = axios.create({baseURL: process.env.REACT_APP_API_URL,});

api.interceptors.request.use(async (config) => {
  
  const state = store.getState();
  const expired = state.user?.expired

  
  const currentDate = new Date();
  console.log(expired * 1000 < currentDate.getTime());

  
  console.log(state.user)
  console.log(expired)

    if (expired && state.user) {
      console.log('expired')
      console.log(expired * 1000 < currentDate.getTime())
      if (expired * 1000 < currentDate.getTime()) {
        
        console.log('new token')
        const response = await axios.get(`${url}/api/user/token`, {withCredentials: true,});
  
        console.log('set New token');
  
        if (!config?.headers) {
          throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        config.headers["authorization"] = `Bearer ${response.data.accessToken}`;
  
        const user: any = jwt_decode(response.data.accessToken);
        console.log("user", user)

        store.dispatch(instance(response.data.accessToken));
        console.log(user);
        
      } else {
        console.log(state.user.token)
        if (state.user.token) {

          api.defaults.headers.common = {'authorization': `bearer ${state.user.token}`}
        }

      }
    }
    //console.log(config)
    return config
  }, (err) => {
    console.log(err);
    return Promise.reject(err)
})

export default api;









