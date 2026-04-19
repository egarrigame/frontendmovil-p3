import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlayerListScreen from './src/screens/PlayerListScreen';
import PlayerDetailScreen from './src/screens/PlayerDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PlayerList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="PlayerList"
          component={PlayerListScreen}
          options={{ title: 'Jugadores' }}
        />
        <Stack.Screen
          name="PlayerDetail"
          component={PlayerDetailScreen}
          options={{ title: 'Detalle del Jugador' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}