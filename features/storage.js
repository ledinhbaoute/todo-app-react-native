import AsyncStorage from '@react-native-async-storage/async-storage';

export const _retrieveTasks = async () => {
  try {
    const tasks = await AsyncStorage.getItem('TASKS');
    if (tasks !== null) {
      return JSON.parse(tasks) || [];
    }
  } catch (error) {
    console.log(error);
  }
};

export const _storeTask = async task => {
  try {
    await AsyncStorage.setItem('TASKS', JSON.stringify(task));
  } catch (error) {
    console.log(error);
  }
};
