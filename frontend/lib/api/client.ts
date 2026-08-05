import axios from 'axios';
import { env } from '../env';
import { tokenStore } from '../../auth/tokenStore';

export const client = axios.create({
 baseURL: env.NEXT_PUBLIC_API_BASE_URL,
 withCredentials: true,
});

// Request interceptor to attach bearer token
client.interceptors.request.use(
 (config) => {
 const token = tokenStore.getToken();
 if (token && config.headers) {
 config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
 },
 (error) => {
 return Promise.reject(error);
 }
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
 failedQueue.forEach((prom) => {
 if (error) {
 prom.reject(error);
 } else {
 prom.resolve(token);
 }
 });
 failedQueue = [];
};

// Response interceptor for token refresh on 401
client.interceptors.response.use(
 (response) => response,
 async (error) => {
 const originalRequest = error.config;

 // Guard: ignore if not 401 or if request was already retried
 if (!error.response || error.response.status !== 401 || originalRequest._retry) {
 return Promise.reject(error);
 }

 // Guard: ignore refresh endpoint calls
 if (originalRequest.url?.includes('/auth/refresh') || originalRequest.url?.includes('/auth/login')) {
 tokenStore.setToken(null);
 return Promise.reject(error);
 }

 if (isRefreshing) {
 return new Promise((resolve, reject) => {
 failedQueue.push({ resolve, reject });
 })
 .then((token) => {
 originalRequest.headers.Authorization = `Bearer ${token}`;
 return client(originalRequest);
 })
 .catch((err) => {
 return Promise.reject(err);
 });
 }

 originalRequest._retry = true;
 isRefreshing = true;

 try {
 // Hit the refresh token endpoint
 const refreshResponse = await axios.post(
 `${env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
 {},
 { withCredentials: true }
 );

 const newAccessToken = refreshResponse.data?.data?.accessToken;
 if (!newAccessToken) {
 throw new Error('No access token returned from refresh');
 }

 tokenStore.setToken(newAccessToken);
 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
 processQueue(null, newAccessToken);
 
 return client(originalRequest);
 } catch (refreshError) {
 tokenStore.setToken(null);
 processQueue(refreshError, null);
 
 // Dispatch custom event to let AuthProvider handle redirect
 if (typeof window !== 'undefined') {
 window.dispatchEvent(new Event('auth-expired'));
 }
 return Promise.reject(refreshError);
 } finally {
 isRefreshing = false;
 }
 }
);
