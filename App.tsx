import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import TabNavigator from './src/navigators/TabNavigator';
import MovieScreen from './src/screens/MovieDetailsScreen';
import SetBookingScreen from './src/screens/SetBookingScreen';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={TabNavigator} options={{
          animation: "default"
        }} />
        <Stack.Screen name="MovieDetails" component={MovieScreen} options={{
          animation: "slide_from_right"
        }} />
        <Stack.Screen name="SeatBooking" component={SetBookingScreen} options={{
          animation: "slide_from_bottom"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
