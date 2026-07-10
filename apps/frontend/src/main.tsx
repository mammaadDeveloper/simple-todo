import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import './styles.css';
import About from './app/about';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/page-2" element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
