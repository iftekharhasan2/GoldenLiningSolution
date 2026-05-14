import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import WorksPage from '@/pages/WorksPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/works" element={<WorksPage />} />
    </Routes>
  );
};

export default App;