import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import AllStudents from './pages/AllStudents';
import AddStudents from './pages/AddStudents';
import UpdateStudens from './pages/UpdateStudens';


console.ignoredYellowBox =true;
const App = createStackNavigator({
    AllStudents: { screen: AllStudents }, 
    AddStudents: { screen: AddStudents }, 
    UpdateStudens: { screen: UpdateStudens }, 
  },
  {
    initialRouteName: 'AllStudents',
  }
);
export default createAppContainer(App);