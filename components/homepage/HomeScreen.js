import * as React from 'react';
import { List, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {
  fetchAllTasks,
  setTaskStatus,
  tasksSelector,
} from '../../redux/TasksSlice';

import {
  Bars3CenterLeftIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/solid';
import { colors } from '../../theme/colors';
import { formatTime, isToday, isNextDay } from '../../helper/TimeFormat';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const tasks = useSelector(tasksSelector);

  const markDoneTask = taskId => {
    dispatch(setTaskStatus({ taskId }));
  };

  const gotoEditTask = id => {
    navigation.navigate('EditTask', {
      taskId: id,
    });
  };

  const gotoAddTask = () => {
    navigation.navigate('AddTask', {
      day: 'today',
    });
  };

  const gotoAddTmrTask = () => {
    navigation.navigate('AddTask', {
      day: 'tomorrow',
    });
  };

  React.useEffect(() => {
    dispatch(fetchAllTasks());
  }, []);

  const renderTasks = tasks.map(
    task =>
      isToday(task.time) && (
        <List.Item
          key={task.id}
          title={() => (
            <Text className={task.isDone === true && 'line-through'}>
              {task.name}
            </Text>
          )}
          right={() => <Text>{formatTime(new Date(task.time))}</Text>}
          left={() => (
            <Checkbox
              status={task.isDone === true ? 'checked' : 'unchecked'}
              color={colors.orange}
              onPress={() => markDoneTask(task.id)}
            />
          )}
          onPress={() => gotoEditTask(task.id)}
        />
      )
  );

  const renderTmrTasks = tasks.map(
    task =>
      isNextDay(task.time) && (
        <List.Item
          key={task.id}
          title={() => (
            <Text className={task.isDone === true && 'line-through'}>
              {task.name}
            </Text>
          )}
          right={() => <Text>{formatTime(new Date(task.time))}</Text>}
          left={() => (
            <Checkbox
              status={task.isDone === true ? 'checked' : 'unchecked'}
              color={colors.orange}
              onPress={() => markDoneTask(task.id)}
            />
          )}
          onPress={() => gotoEditTask(task.id)}
        />
      )
  );
  return (
    <SafeAreaView>
      <View className="container px-3">
        <View className="flex-row justify-between items-center">
          <Bars3CenterLeftIcon color={colors.black} size="30" />
        </View>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-3xl font-bold">Today</Text>
          <TouchableOpacity>
            <PlusCircleIcon
              color={colors.orange}
              size="45"
              onPress={gotoAddTask}
            ></PlusCircleIcon>
          </TouchableOpacity>
        </View>
        <ScrollView className="h-2/5">
          <List.Section>{renderTasks}</List.Section>
        </ScrollView>
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-3xl font-bold">Tomorrow</Text>
          <TouchableOpacity>
            <PlusCircleIcon
              color={colors.orange}
              size="45"
              onPress={gotoAddTmrTask}
            ></PlusCircleIcon>
          </TouchableOpacity>
        </View>
        <ScrollView className="h-1/3">
          <List.Section>{renderTmrTasks}</List.Section>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
