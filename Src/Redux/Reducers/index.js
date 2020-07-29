import {combineReducers} from 'redux';


//import Screens to the reducer
import SignIn from './SignIn.reducer';
import Dashboard from './DashBoard.reducer';
import ContactsMain from './ContactsMain.reducer';
import ViewContact from './ViewContact.reducer';
import AddNewContact from './AddNewContact.reducer';
import LeadsMain from './LeadsMain.reducer';
import AddNewLead from './AddNewLead.reducer';
import ViewLead from './ViewLead.reducer';
import CompanyMain from './CompanyMain.reducer';
import AddNewCompany from './AddNewCompany.reducer';
import ViewCompany from './ViewCompany.reducer';
import ProjectMain from './ProjectMain.reducer';
import AddNewProject from './AddNewProject.reducer';
import ViewProject from './ViewProject.reducer';
import TargetMain from './TargetMain.reducer';
import MapMain from './MapMain.reducer';
import SettingsMain from './SettingsMain.reducer';

export default combineReducers({
    SignIn,
    Dashboard,
    ContactsMain,
    ViewContact,
    AddNewContact,
    LeadsMain,
    AddNewLead,
    ViewLead,
    CompanyMain,
    AddNewCompany,
    ViewCompany,
    ProjectMain,
    AddNewProject,
    ViewProject,
    TargetMain,
    MapMain,
    SettingsMain,
  });