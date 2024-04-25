import * as React from 'react';
import { Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { editTask } from '../../redux/TasksSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { colors } from '../../theme/colors';
import TimePicker from '../TimePicker';

const EditTomorrowTask = ({ route, navigation }) => {
  const { taskId } = route.params;

  const dispatch = useDispatch();

  const tmrTasksSelector = createSelector(
    state => state.tasks,
    tasks => {
      return tasks.listTmrTasks;
    }
  );

  const tasks = useSelector(tmrTasksSelector);

  const selectedTask = tasks.find(task => task.id === taskId);

  const [taskName, setTaskName] = React.useState(selectedTask.name);
  const [time, setTime] = React.useState(new Date(selectedTask.time));
  const [note, setNote] = React.useState(selectedTask.note);

  const _handleEditTask = () => {
    if (taskName && time) {
      const editedTask = {
        id: selectedTask.id,
        name: taskName,
        time: time.toISOString(),
        note: note,
        isDone: false,
      };
      dispatch(editTask({ editedTask, isToday: false }));
      setTaskName('');
      setTime(new Date());
      navigation.navigate('HomeScreen');
    }
  };

  const _handleTimeChange = newTime => {
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
          <Text className="text-2xl font-bold">Edit task</Text>
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
            <TimePicker time={time} onTimeChange={_handleTimeChange} />
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
                onPress={_handleEditTask}
              ></PlusCircleIcon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditTomorrowTask;
