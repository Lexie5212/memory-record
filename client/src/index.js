import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import './index.css';
import reducers from './reducers';
import {BrowserRouter} from "react-router-dom"
import {GoogleOAuthProvider} from "@react-oauth/google"
import App from './App';
const store = configureStore({
  reducer: reducers,

});
const container = document.getElementById('root'); 
const root = createRoot(container); 

root.render(

    <Provider store={store}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="236629896745-fvh6il2sk8fik7fn8fas89b1l3h93git.apps.googleusercontent.com" >
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </Provider>,

  );
