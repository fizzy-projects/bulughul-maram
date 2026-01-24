import { useState } from 'react'
import '../App.css'
import AddHadithForm from './admin/AddHadithForm.jsx';
import CompiledGallery from './CompiledGallery.jsx';
import ProtectedComponent from '../admin/ProtectedComponent.jsx';

function BulughulmaramPage(){
  const [refreshToggle,setRefreshToggle]=useState(false);
  // <div className='container'></div>

  return(
    <div className='container'>
      <ProtectedComponent>
        <AddHadithForm setRefreshToggle={setRefreshToggle}/>;
      </ProtectedComponent>
      <CompiledGallery/>
    </div>
  );
}

export default BulughulmaramPage;
