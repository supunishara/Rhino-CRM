import React, {Component} from 'react';

//importing React-navigation 5 Libraries
import {NavigationContainer} from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';


import {Header} from '../Components/index';

import {Burger} from '../Config/Images';

//import Screens
import Splash from '../Screens/1.0/Splash';
import SignIn from '../Screens/2.0/SignIn';

//Dashboard Stack Screens
import Dashboard from '../Screens/5.0/Dashboard';

//Contacts Stack Screens
import ContactsMain from '../Screens/5.0/Contacts/ContactsMain';
import ViewContact from '../Screens/5.0/Contacts/ViewContact';
import AddNewContact from '../Screens/5.0/Contacts/AddNewContact';

//Leads  Stack Screens
import LeadsMain from '../Screens/5.0/Leads/LeadssMain';
import AddNewLead from '../Screens/5.0/Leads/AddnewLead';
import ViewLead from '../Screens/5.0/Leads/ViewLead';

//Company Stack Screens
import CompanyMain from '../Screens/5.0/Companies/CompanyMain';
import AddNewCompany from '../Screens/5.0/Companies/AddNewCompany';
import ViewCompany from '../Screens/5.0/Companies/ViewCompany';

//Project Stack Screens
import ProjectMain from '../Screens/5.0/Projects/ProjectMain';
import AddNewProject from '../Screens/5.0/Projects/AddNewProject';
import ViewProject from '../Screens/5.0/Projects/ViewProject';

//target Stack Screens
import TargetMain from '../Screens/5.0/Targets/TargetMain';

//Map Stack Screens
import MapMain from '../Screens/5.0/Map/MapMain';

//Settings Screens
import SettingsMain from '../Screens/5.0/Setting/SettingsMain';

//import Custom Drawer
import SideMenu from '../Screens/Drawer/SideMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DashboardStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"

                          />,
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}

function ContactStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"
                          />,
      }}>
      <Stack.Screen name="ContactsMain" component={ContactsMain} />
      <Stack.Screen name="ViewContact" component={ViewContact} />
      <Stack.Screen name="AddNewContact" component={AddNewContact} />
      
    </Stack.Navigator>
  );
}

function LeadStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"
                          />,
      }}>
      <Stack.Screen name="LeadsMain" component={LeadsMain} />
      <Stack.Screen name="AddNewLead" component={AddNewLead} />
      <Stack.Screen name="ViewLead" component={ViewLead} />
    </Stack.Navigator>
  );
}

function CompanyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"
                          />,
      }}>
      <Stack.Screen name="CompanyMain" component={CompanyMain} />
      <Stack.Screen name="ViewCompany" component={ViewCompany} />
      <Stack.Screen name="AddNewCompany" component={AddNewCompany} />
    </Stack.Navigator>
  );
}

function ProjectStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"
                          />,
      }}>
      <Stack.Screen name="ProjectMain" component={ProjectMain} />
      <Stack.Screen name="ViewProject" component={ViewProject} />
      <Stack.Screen name="AddNewProject" component={AddNewProject} />
      
    </Stack.Navigator>
  );
}

function TargetStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"
                          />,
      }}>
      <Stack.Screen name="TargetMain" component={TargetMain} />
      
    </Stack.Navigator>
  )
}


function MapStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"
                          />,
      }}>
      <Stack.Screen name="MapMain" component={MapMain} />
      
    </Stack.Navigator>
  )
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: props => <Header {...props} 
                              type="typeThird"
                              leftIcon={Burger}
                              title="Test Cover"
                          />,
      }}>
      <Stack.Screen name="SettingsMain" component={SettingsMain} />
      
    </Stack.Navigator>
  )
}

///Drawer Main Stack
function DrawerStack() {
  return (
    <Drawer.Navigator drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardStack} />
      <Drawer.Screen name="Leads" component={LeadStack} />
      <Drawer.Screen name="Contacts" component={ContactStack} /> 
      <Drawer.Screen name="Company" component={CompanyStack} /> 
      <Drawer.Screen name="Project" component={ProjectStack} /> 
      <Drawer.Screen name="Target" component={TargetStack} /> 
      <Drawer.Screen name="Map" component={MapStack} /> 
      <Drawer.Screen name="Settings" component={SettingsStack} /> 
    </Drawer.Navigator>
  );
}

//
export default function MyStack() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Dashboard" component={DrawerStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }