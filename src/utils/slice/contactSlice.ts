import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axiosService from '../axiosService'
import Toast from 'react-native-root-toast';
import LoadingManager from '../../utils/LoadingManager';
import axios from 'axios'

interface Contact {
   id: string,
   firstName: string,
   lastName: string,
   age: number,
   photo: string
}

interface ContactState {
   dataContact: Array<Contact>,
   detailContact: object
}

const initialState: ContactState = {
   dataContact: [],
   detailContact: {}
}

export const contactSlice = createSlice({
   name: 'getContact',
   initialState,
   reducers: {
      setData: (state, action: PayloadAction<any>) => {
         state.dataContact = action.payload.data;
         // return action.payload;
      },
      postData: (state, action) => {
         return action.payload;
      },
      detailData: (state, action) => {
         state.detailContact = action.payload.data
         // return action.payload;
      }
   }
})

export const { setData, postData, detailData } = contactSlice.actions;
export default contactSlice.reducer;