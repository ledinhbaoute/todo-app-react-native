import HomeScreen from '../components/homepage/HomeScreen';
import AddTask from '../components/addtodo/AddTask';
import EditTask from '../components/edittodo/EditTask';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="EditTask" component={EditTask} />
    </Stack.Navigator>
  );
};

export default HomeStack;
