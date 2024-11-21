import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import rootStore from './store'; //这里的rootStore时普通的store和persistor的结合体
import './i18n/configs'
import { PersistGate } from 'redux-persist/integration/react'; 


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store = {rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
      <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


