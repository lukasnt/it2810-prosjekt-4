import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SearchPage from './components/search/searchpage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoviePage from './components/movie/moviepage';

const statusBarHeight : number = Constants.statusBarHeight

export default function App() {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Search">
            <Stack.Screen
              name="Search"
              component={SearchPage}
              options={{ title: 'Search Page' }}
            />
            <Stack.Screen
              name="Movie"
              component={MoviePage}
              options={{ title: 'Movie Page' }}
            />

          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: statusBarHeight + "px"
  },
});

export const backendURL : string = "http://it2810-24.idi.ntnu.no:3000";
