import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon component
import ClockScreen from './screens/ClockScreen';
import CounterScreen from './screens/CounterScreen';
import GraphScreen from './screens/GraphScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Define icons based on route name
            if (route.name === 'Clock') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Counter') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Graph') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            // Return the icon component
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007aff', // Color for active tab
          tabBarInactiveTintColor: 'gray',  // Color for inactive tab
          tabBarStyle: { paddingBottom: 5, height: 60 },
          tabBarLabelStyle: { fontSize: 12 },
        })}
      >
        <Tab.Screen name="Clock" component={ClockScreen} />
        <Tab.Screen name="Counter" component={CounterScreen} />
        <Tab.Screen name="Graph" component={GraphScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
