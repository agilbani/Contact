import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './url';

const API = async (
   url: string,
   options = {
      method: 'GET',
      body: {},
      params: {},
   },
   type = 'application/json',
) => {

   function buildResponse(response: any) {
      if (response) {
         if (response.data && response.status === 0) {
            return response.data;
         } else {
            return response;
         }
      }
   }

   const request = {
      baseURL: BASE_URL,
      method: options.method,
      timeout: 10000,
      url,
      responseType: 'json',
      params: options.params ?? {},
   };
   if (request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH' || request.method === 'DELETE') request.data = options.body;
   try {
      const res = await axios(request);
      if (res.status === 200) {
         return buildResponse(res);
      }
      return res;
   } catch (error) {
      if (error?.response) {
         return buildResponse(error?.response);
      }
   }
}

export default API;
