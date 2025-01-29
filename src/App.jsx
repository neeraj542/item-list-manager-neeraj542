import React from 'react';
import ItemListManager from './component/ItemListManager';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemListManager />} />
        <Route path="/auth/redirect" element={<ItemListManager />} /> 
      </Routes>
    </Router>
  );
}

export default App;
