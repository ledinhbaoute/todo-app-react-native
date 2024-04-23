import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const remove = async () => {
    try {
        await AsyncStorage.removeItem('TASKS')
    } catch (error) {
        console.error('Error retrieving AsyncStorage content:', error);
    }
}

const showAsyncStorageContent = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
  
      console.log('AsyncStorage Content:');
      items.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.error('Error retrieving AsyncStorage content:', error);
    }
  };

const SettingScreen = () => {
    // remove()
    showAsyncStorageContent()
    return (
        <View className="h-full flex justify-center items-center">
            <Text >Setting Screen</Text>
        </View>
    )
}

export default SettingScreen;