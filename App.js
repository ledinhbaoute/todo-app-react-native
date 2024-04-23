import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store';
import NavBar from './navigation/NavBar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}
