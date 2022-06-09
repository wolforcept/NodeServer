import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppIndex from './index/AppIndex';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<AppIndex />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
