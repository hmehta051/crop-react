import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoginComponent = React.lazy(() => import("./pages/LoginComponent"));
const CropList = React.lazy(() => import("./pages/CropList"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/crop" element={<CropList />} />
      </Routes>
    </Suspense>
  );
};

export default App;
