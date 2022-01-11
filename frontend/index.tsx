import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from '@src/layouts/App';

render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.querySelector('#root'),
);
