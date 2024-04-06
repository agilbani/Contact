import API from './axiosConfig';
import { setData, detailData } from './slice/contactSlice';

export default {
   getContact: async (dispatch: any) => {
      return API(`contact`, {
         method: 'GET',
         body: {},
         params: {}
      })
         .then((response) => dispatch(setData(response.data)))
         .catch((err) => {
            console.log('err service', err);
            return err;
         });
   },
   getContactById: async (dispatch: any, id: string) => {
      return API(`contact/${id}`, {
         method: 'GET',
         body: {},
         params: {}
      })
         .then((response) => dispatch(detailData(response.data)))
         .catch((err) => {
            console.log('err service', err);
            return err;
         });
   },
   postContact: async (dispatch: any, params: any) => {
      return API(`contact`, {
         method: 'POST',
         body: params,
         params: {},
      })
         .then((response) => response.data)
         .catch((err) => {
            console.log('err service', err);
            return err;
         });
   },
   editContact: async (dispatch: any, params: any, id: string) => {
      return API(`contact/${id}`, {
         method: 'PUT',
         body: params,
         params: {},
      })
         .then((response) => {
            console.log('res api edit', response);

            return response.status
         })
         .catch((err) => {
            console.log('err service', err);
            return err;
         });
   },
   deleteContact: async (id: string) => {
      return API(`contact/${id}`, {
         method: 'DELETE',
         body: {},
         params: {}
      })
         .then((response) => {
            console.log('res api delete', response);
            return response.status
         })
         .catch((err) => {
            console.log('err service', err);
            return err;
         });
   },
}