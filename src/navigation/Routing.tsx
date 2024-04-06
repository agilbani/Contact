import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//screens
import Home from '../screens/Home';
import AddContact from '../screens/AddContact';

const Stack = createStackNavigator<RootStackParam>();

const Routing = () => {
   return(
      <NavigationContainer>
         <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
               name="Home"
               component={Home}
            />
            <Stack.Screen
               name="AddContact"
               component={AddContact}
            />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default Routing;