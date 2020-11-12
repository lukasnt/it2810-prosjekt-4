import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoviePage from './components/movie/moviepage';
import SearchPage from "./components/search/searchpage";


export default function App() {

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={navTheme}>
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
        </PaperProvider>
    </Provider>
  );
}

const theme : ReactNativePaper.Theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    backdrop: '#BADA55',
  }
};

const navTheme : Theme = {
  dark: false,
  colors: {
      ...theme.colors,
      card: "white",
      text: "black",
      border: theme.colors.primary,
  }
}