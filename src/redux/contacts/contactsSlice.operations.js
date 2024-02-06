import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://65c2baddf7e6ea59682bac9c.mockapi.io/api',
  });


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
        const { data } = await instance.get('/contacts');
      return data;
    }catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
        const { data } = await instance.post('/contacts', contact);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
        const { data } = await instance.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);