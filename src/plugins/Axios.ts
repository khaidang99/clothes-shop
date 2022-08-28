import axios, { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";
import queryString from "query-string";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const getFirebaseToken = () => {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    return currentUser.getIdToken();
  }
  const hasRememberedAccount = localStorage.getItem(
    "firebaseui:rememberedAccounts"
  );
  if (hasRememberedAccount) return null;
  return new Promise((resolve, reject) => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          reject(null);
        }
        const token = user?.getIdToken();
        resolve(token);
        unregisterAuthObserver();
      });
  });
};

const instance = axios.create({
  paramsSerializer: (params) => queryString.stringify(params),
});
instance.defaults.baseURL = "http://localhost:5000/api/";
instance.defaults.headers.common.Accept = "application/json";
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Interceptors
instance.interceptors.request.use(async (config: AxiosRequestConfig<any>) => {
  const token = await getFirebaseToken();
  if (token) {
    config!.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(error);
    var { status } = error.response;
    if ([400, 403, 404, 422, 429].includes(status)) {
      alert("not connect API");
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
