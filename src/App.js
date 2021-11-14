import React, 
 { useEffect, useReducer } from 'react';
import { API } from 'aws-amplify';
import { List } from 'antd';
import 'antd/dist/antd.css'
import { listnotes } from './graphql/queries'
import './App.css';

const initialState = {
  notes: [],
  loading: true,
  error: false,
  form: {name: '', description: ''}

}

const reducer = (state, action) => {
  switch(action.type) {
  case 'SET_NOTES':
  return { ...state, notes: action.notes, loading: false }
  case 'ERROR':
  return { ...state, loading: false, error: true }
  default: return state
  }}

function App() {
  
  return 
}

export default App;
