export const API = {
    // baseURL: 'https://projects.aenc.asia/crm/',
    baseURL: 'https://stas.services/',
  };

  export const API_KEY = "AIzaSyBs8S9q90Y0qJPDPs15ODvWmStENTMZmRQ";
  
  export const APIEndPoints = {
    login: 'api/login',
    logout: 'api/logout',
    contacts: 'api/contacts',
    getContacts: 'api/getContacts',
    getContactById: 'api/contact/',
    storeContact: 'api/contact/', //store New Contact
    addContact: 'api/contact',


    //get Contact DropDown Data
    titleList: 'api/getTitleList',
    companyList: 'api/getCompanies', //also Used in Lead Screen
    projectList:'api/getProjects/',
    contactList: 'api/getContacts', //For Lead Screen
    singleCompanyList:'api/getCompany/',

    // ProjectList: 'api/'
    qualityList: 'api/getQualityList',  //For Lead Screen
    statusList:'api/getStatusList',  //For Lead Screen
    sources: 'api/getSourceList',  //For Lead Screen
    addLeadList: 'api/lead', // store new Lead record
    StageList: 'api/getStagesList',
 
    //get Lead Data
    leadMainList: 'api/leads',
    viewOneLead: 'api/lead/',
    addOneLead: 'api/lead',
    updateNewLead: 'api/lead/',
    addLeadToMap: 'api/leadcity',

    //get Company Data
    mainCompanies: 'api/companies',
    addNewCompany: 'api/company',
    viewOneCompany : 'api/company/',
    updateNewCompany: 'api/company/',

    //get Project Data
    mainProjects: 'api/projects',
    addNewProject: 'api/project',
    viewOneProject: 'api/project/',
    updateNewProject: 'api/project/',

    //get Target data
    getAllTargets: 'api/getTargetYears',
    viewOnetarget: 'api/getSalesmanTargets/',

    //get Map data
    getMapData: 'api/leadcity',

    //get Settings Data
    getSettingsData: 'api/settings',

    //get Tenants
    getTenantData: 'api/getTenantUsers',
    shareTenant: 'api/shareStore/',

    getDashboardData: 'api/dashboard'

  };
  