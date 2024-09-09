import * as React from 'react';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { nanoid } from '@reduxjs/toolkit';
import { updateTasks, tasksSelector } from '../../redux/TasksSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { colors } from '../../theme/colors';
import { tomorrow } from '../../helper/TimeFormat';
import TimePicker from '../TimePicker';
import { PlusCircleIcon } from 'react-native-heroicons/solid';

const AddTask = ({ route, navigation }) => {
  const { day } = route.params;
  const [taskName, setTaskName] = React.useState('');
  const [time, setTime] = React.useState(
    day === 'today' ? new Date() : tomorrow()
  );
  const [note, setNote] = React.useState('');

  const dispatch = useDispatch();

  const tasks = useSelector(tasksSelector);

  const handleAddTask = () => {
    if (taskName && time) {
      const newListTasks = tasks.concat({
        id: nanoid(),
        name: taskName,
        time: time.toISOString(),
        note: note,
        isDone: false,
      });
      dispatch(updateTasks(newListTasks));
      navigation.navigate('HomeScreen');
    }
  };

  const handleTimeChange = newTime => {
    setTime(newTime);
  };

  return (
    <SafeAreaView>
      <View className="container px-3">
        <View className="flex-row justify-between items-center">
          <ArrowLeftIcon
            color="black"
            size="30"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-2xl font-bold">
            {day === 'today' ? 'Add new task' : 'Add new tomorrow task'}
          </Text>
        </View>
        <View className="h-full max-h-80 w-full flex justify-content mt-4">
          <Text className="mt-4">Task name</Text>
          <View className="mt-4 w-full shadow-2xl">
            <TextInput
              placeholder="example: wake up"
              value={taskName}
              onChangeText={taskName => setTaskName(taskName)}
            />
          </View>
          <Text className="mt-4">Time</Text>
          <View className="mt-4 w-full h-1/4">
            <TimePicker time={time} onTimeChange={handleTimeChange} />
          </View>
          <Text className="mt-4">Note</Text>
          <View className="mt-4 bg-black w-full">
            <TextInput
              placeholder="Tap here to add note"
              value={note}
              onChangeText={note => setNote(note)}
            />
          </View>
          <View className="mt-4 flex-row justify-center item-center">
            <TouchableOpacity>
              <PlusCircleIcon
                color={colors.orange}
                size="70"
                onPress={handleAddTask}
              ></PlusCircleIcon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTask;
