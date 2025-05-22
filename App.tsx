import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '@/screens/home';
import FavoritesScreen from '@/screens/favorites';
import TopRatedScreen from '@/screens/top-rated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appRouteNames } from '@/routes';
import { z } from 'zod';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, StyleSheet, ScrollView } from 'react-native';

const Tab = createBottomTabNavigator();

const envSchema = z.object({
  EXPO_PUBLIC_SERVER_IP: z.string().ip(),
  EXPO_PUBLIC_SERVER_PORT: z.string().length(4),
});

const result = envSchema.safeParse(process.env);
if (result.error) {
  console.error(result.error);
}
console.info('[app]: ENV', result.data);

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" animated />

      <Tab.Navigator
        initialRouteName={appRouteNames.root}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'tab-home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'tab-top-rated') {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            } else if (route.name === 'tab-favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            }

            return (
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="tab-home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="tab-top-rated"
          component={TopRatedScreen}
          options={{
            title: 'Top Rated',
            tabBarLabel: 'Top Rated',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Tab.Screen
          name="tab-favorites"
          component={FavoritesScreen}
          options={{
            title: 'Favorites',
            tabBarLabel: 'Favorites',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
