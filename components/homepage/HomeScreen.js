import * as React from 'react';
import { List, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import {
  fetchAllTasks,
  updateTasks,
  setTaskStatus,
  fetchAllTmrTasks,
  updateTmrTasks,
  setTmrTaskStatus,
} from '../../redux/TasksSlice';

import {
  Bars3CenterLeftIcon,
  PlusCircleIcon,
} from 'react-native-heroicons/solid';
import { colors } from '../../theme/colors';
import { formatTime } from '../../helper/TimeFormat';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const tasksSelector = createSelector(
    state => state.tasks,
    tasks => {
      return tasks.listTasks;
    }
  );

  const tasks = useSelector(tasksSelector);

  const tmrTasksSelector = createSelector(
    state => state.tasks,
    tasks => {
      return tasks.listTmrTasks;
    }
  );

  const tmrTasks = useSelector(tmrTasksSelector);

  const markDoneTask = taskId => {
    dispatch(setTaskStatus({ taskId, tasks }));
  };

  const markDoneTmrTask = taskId => {
    dispatch(setTmrTaskStatus({ taskId, tmrTasks }));
  };

  const _handleTask = id => {
    navigation.navigate('EditTask', {
      taskId: id,
    });
  };

  const _handleTmrTask = id => {
    navigation.navigate('EditTmrTask', {
      taskId: id,
    });
  };

  const _handlePressAddTask = () => {
    navigation.navigate('AddTask');
  };

  const _handlePressAddTmrTask = () => {
    navigation.navigate('AddTmrTask');
  };

  React.useEffect(() => {
    dispatch(fetchAllTasks());
    dispatch(fetchAllTmrTasks());
  }, []);

  const renderTasks = tasks.map(task => (
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
      onPress={() => _handleTask(task.id)}
    />
  ));

  const renderTmrTasks = tmrTasks.map(task => (
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
          onPress={() => markDoneTmrTask(task.id)}
        />
      )}
      onPress={() => _handleTmrTask(task.id)}
    />
  ));
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
              onPress={_handlePressAddTask}
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
              onPress={_handlePressAddTmrTask}
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
