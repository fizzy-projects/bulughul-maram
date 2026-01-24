import './App.css';

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './admin/AuthContext';
import AppRoutes from './AppRoutes';


function App(){

  return(
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
