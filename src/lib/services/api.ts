// lib/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  timeout: 30000,
});

// api.interceptors.request.use((config) => {
//   if (typeof window !== 'undefined') {
//     const token = localStorage.getItem('token'); // or get from Redux store
//     console.log(token, "mytoken")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }


//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });


// api.interceptors.request.use(
//   (config) => {
//     if (typeof window !== 'undefined') {
//       try {
//         const userStr = localStorage.getItem('user');
//         if (userStr) {

//           const parsedOuter = JSON.parse(userStr); // First parse
//           const parsedInner = JSON.parse(parsedOuter.user); // Second parse

//           const token = parsedInner?.loggedinUserData?.token;
//           console.log(token, 'mytoken');



//           // const parsedUser = JSON.parse(userStr);
//           // const token = parsedUser?.loggedinUserData?.token;

//           // console.log(token, 'mytoken');

//           if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//           }
//         }
//       } catch (error) {
//         console.error('Error parsing token from localStorage:', error);
//       }
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


export default api;
