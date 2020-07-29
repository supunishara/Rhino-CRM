import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, RESET, SETTING_THEME} from '../Actions/ActionTypes';

// import Images
import {User, DashboardGrayRed, LeadsGrayRed, ContactsGrayRed, CompaniesGrayRed, ProjectsGrayRed, TargetsGrayRed, MapsGrayRed, SettingsGrayRed, LogoutGrayRed, 
  DashboardBlueOrange, LeadsBlueOrange, ContactsBlueOrange, CompaniesBlueOrange, ProjectsBlueOrange, TargetsBlueOrange, MapsBlueOrange, SettingsBlueOrange, LogoutBlueOrange,
  DashboardGreenOrange, LeadsGreenOrange, ContactsGreenOrange, CompaniesGreenOrange, ProjectsGreenOrange, TargetsGreenOrange, MapsGreenOrange, SettingsGreenOrange, LogoutGreenOrange} from '../../Config/Images';

  //
const initialState = {
  isLoading:false,
  data: null,
  errors: null,
  items: [
    {
      id: 1,
      navName: 'Dashboard',
      screenToNavigate: 'Dashboard',
      icon: DashboardGrayRed

    },
    {
      id: 2,
      navName: 'Leads',
      screenToNavigate: 'Leads',
      icon: LeadsGrayRed
    },
    {
      id: 3,
      navName: 'Contacts',
      screenToNavigate: 'Contacts',
      icon: ContactsGrayRed
    },
    {
      id: 4,
      navName: 'Companies',
      screenToNavigate: 'Company',
      icon: CompaniesGrayRed
    },
    {
      id: 5,
      navName: 'Projects',
      screenToNavigate: 'Project',
      icon: ProjectsGrayRed
    },
    {
      id: 6,
      navName: 'Targets',
      screenToNavigate: 'Target',
      icon: TargetsGrayRed
    },
    {
      id: 7,
      navName: 'Map',
      screenToNavigate: 'Map',
      icon: MapsGrayRed
    },
    {
      id: 8,
      navName: 'Settings',
      screenToNavigate: 'Settings',
      icon: SettingsGrayRed
    },
    {
      id: 9,
      navName: 'Logout',
      screenToNavigate: 'Marketplace',
      icon: LogoutGrayRed
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case FETCHING_DATA_SUCCESS: 
      return{
          ...state,
          isLoading: false,
          data: action.data
      };
    case FETCHING_DATA_FAILURE:
        return {
            ...state,
            isLoading: false,
            errors: action.error
        }
    case SETTING_THEME:
      if(action.payload.theme == '#7C1E4E'){
        console.log(action.payload.theme);
        return {
          ...state,
          items: [
            {
              id: 1,
              navName: 'Dashboard',
              screenToNavigate: 'Dashboard',
              icon: DashboardGrayRed
        
            },
            {
              id: 2,
              navName: 'Leads',
              screenToNavigate: 'Leads',
              icon: LeadsGrayRed
            },
            {
              id: 3,
              navName: 'Contacts',
              screenToNavigate: 'Contacts',
              icon: ContactsGrayRed
            },
            {
              id: 4,
              navName: 'Companies',
              screenToNavigate: 'Company',
              icon: CompaniesGrayRed
            },
            {
              id: 5,
              navName: 'Projects',
              screenToNavigate: 'Project',
              icon: ProjectsGrayRed
            },
            {
              id: 6,
              navName: 'Targets',
              screenToNavigate: 'Target',
              icon: TargetsGrayRed
            },
            {
              id: 7,
              navName: 'Map',
              screenToNavigate: 'Map',
              icon: MapsGrayRed
            },
            {
              id: 8,
              navName: 'Settings',
              screenToNavigate: 'Settings',
              icon: SettingsGrayRed
            },
            {
              id: 9,
              navName: 'Logout',
              screenToNavigate: 'Marketplace',
              icon: LogoutGrayRed
            },
          ],
      }
      }else if(action.payload.theme == '#EFAC4E'){
        console.log(action.payload.theme);
        return {
          ...state,
          items: [
            {
              id: 1,
              navName: 'Dashboard',
              screenToNavigate: 'Dashboard',
              icon: DashboardBlueOrange
        
            },
            {
              id: 2,
              navName: 'Leads',
              screenToNavigate: 'Leads',
              icon: LeadsBlueOrange
            },
            {
              id: 3,
              navName: 'Contacts',
              screenToNavigate: 'Contacts',
              icon: ContactsBlueOrange
            },
            {
              id: 4,
              navName: 'Companies',
              screenToNavigate: 'Company',
              icon: CompaniesBlueOrange
            },
            {
              id: 5,
              navName: 'Projects',
              screenToNavigate: 'Project',
              icon: ProjectsBlueOrange
            },
            {
              id: 6,
              navName: 'Targets',
              screenToNavigate: 'Target',
              icon: TargetsBlueOrange
            },
            {
              id: 7,
              navName: 'Map',
              screenToNavigate: 'Map',
              icon: MapsBlueOrange
            },
            {
              id: 8,
              navName: 'Settings',
              screenToNavigate: 'Settings',
              icon: SettingsBlueOrange
            },
            {
              id: 9,
              navName: 'Logout',
              screenToNavigate: 'Marketplace',
              icon: LogoutBlueOrange
            },
          ],
      }
      }else if(action.payload.theme == '#EB6138'){
        console.log(action.payload.theme);
        return {
          ...state,
          items: [
            {
              id: 1,
              navName: 'Dashboard',
              screenToNavigate: 'Dashboard',
              icon: DashboardGreenOrange
        
            },
            {
              id: 2,
              navName: 'Leads',
              screenToNavigate: 'Leads',
              icon: LeadsGreenOrange
            },
            {
              id: 3,
              navName: 'Contacts',
              screenToNavigate: 'Contacts',
              icon: ContactsGreenOrange
            },
            {
              id: 4,
              navName: 'Companies',
              screenToNavigate: 'Company',
              icon: CompaniesGreenOrange
            },
            {
              id: 5,
              navName: 'Projects',
              screenToNavigate: 'Project',
              icon: ProjectsGreenOrange
            },
            {
              id: 6,
              navName: 'Targets',
              screenToNavigate: 'Target',
              icon: TargetsGreenOrange
            },
            {
              id: 7,
              navName: 'Map',
              screenToNavigate: 'Map',
              icon: MapsGreenOrange
            },
            {
              id: 8,
              navName: 'Settings',
              screenToNavigate: 'Settings',
              icon: SettingsGreenOrange
            },
            {
              id: 9,
              navName: 'Logout',
              screenToNavigate: 'Marketplace',
              icon: LogoutGreenOrange
            },
          ],
      }
      }
    case RESET:
        return {
            ...state,
            errors: initialState.errors
        }
    default:
      return state;
  }
};

export default reducer;
