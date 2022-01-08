import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from '@src/layouts/App';
import { createAxiosResponseInterceptor } from '@src/api/api';
//import { setUpInterceptor } from '@src/api/api';

// setUpInterceptor();
createAxiosResponseInterceptor();
render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.querySelector('#root'),
);
