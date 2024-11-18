import { api } from '../api';
import { useEffect } from 'react';
import { useAuth } from './useAuth';
import axios from 'axios';

const useAxios = () => {
  const { setAuth, auth } = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use((config) => {
      const authToken = auth?.authtoken;
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    });

    (error) => Promise.reject(error);

    const responseIntercept = api.interceptors.response.use(
      (response) => response,

      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const { token } = response.data;
            setAuth((prevAuth) => ({
              ...prevAuth,
              authtoken: token,
            }));

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } catch {
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth.authToken]);

  return { api };
};

export default useAxios;
