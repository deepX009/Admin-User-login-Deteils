import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import { DropdownButton, Dropdown } from 'react-bootstrap';

// import Employe from './Employe';


const Dashboard = () => {
 
 

  return (
    < >
   
      <nav>
      <header className='header'>
      <h4><CIcon icon={icon.cibApacheFlink} size="sm" />DEEPAK JAGLAN</h4>
      <DropdownButton id="split-button-dropdown" title="Profile">
      <Dropdown.Item eventKey="5"><Link to="/employeuser">Emp.Info</Link></Dropdown.Item>
      <Dropdown.Item eventKey="5"><Link to="/logout">Logout</Link></Dropdown.Item>
      <Dropdown.Divider />
      </DropdownButton>
      </header>
      </nav>
      <div className='deshboard'>
      {/* <Employe /> */}
      <h1>Your are in best place</h1>
      </div>
    </>
  );
};

export default Dashboard;
