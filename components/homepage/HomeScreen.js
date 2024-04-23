import * as React from 'react';
import { List, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { fetchAllTasks, updateTasks } from '../../redux/TasksSlice';
import { fetchAllTmrTasks, updateTmrTasks } from '../../redux/TomorrowTasksSlice';
import { Bars3CenterLeftIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { colors } from '../../theme/colors';
import { formatTime } from '../../helper/TimeFormat';

const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch();

    const tasks = useSelector(state => state.tasks.listTasks);
    const tmrTasks = useSelector(state => state.tmrTasks.listTasks);

    const _handleCheckbox = (taskId) => {
        // dispatch(markDone({ id: taskId }))
        // console.log('tick')
        const newListTasks = tasks.concat()
        const selectedTask = tasks.find(task => task.id === taskId);
        const index = newListTasks.findIndex(task => task.id === taskId)
        newListTasks[index] = {
            id: selectedTask.id, name: selectedTask.name,
            time: selectedTask.time, isDone: !selectedTask.isDone
        }
        // console.log("update:", newListTasks)
        dispatch(updateTasks(newListTasks))
    }

    const _handleTmrCheckbox = (taskId) => {
        const newListTasks = tmrTasks.concat()
        const selectedTask = tmrTasks.find(task => task.id === taskId);
        const index = newListTasks.findIndex(task => task.id === taskId)
        newListTasks[index] = {
            id: selectedTask.id, name: selectedTask.name,
            time: selectedTask.time, isDone: !selectedTask.isDone
        }
        dispatch(updateTmrTasks(newListTasks))
    }

    const _handleTask = (id) => {
        navigation.navigate('EditTask', {
            taskId: id
        })
    }

    const _handleTmrTask = (id) => {
        navigation.navigate('EditTmrTask', {
            taskId: id
        })
    }

    const _handlePressAddTask = () => {
        navigation.navigate('AddTask');
    }

    const _handlePressAddTmrTask = () => {
        navigation.navigate('AddTmrTask');
    }



    React.useEffect(() => {
        dispatch(fetchAllTasks())
        dispatch(fetchAllTmrTasks())
    }, []
    )


    const renderTasks = tasks.map(task => (<List.Item key={task.id}
        title={() => <Text className={task.isDone === true && 'line-through'}>{task.name}</Text>}
        right={() => <Text>{formatTime(new Date(task.time))}</Text>}
        left={() => <Checkbox status={task.isDone === true ? 'checked' : 'unchecked'}
            color={colors.orange}
            onPress={() => _handleCheckbox(task.id)} />}
        onPress={() => _handleTask(task.id)} />)
    )

    const renderTmrTasks = tmrTasks.map(task => (<List.Item key={task.id}
        title={() => <Text className={task.isDone === true && 'line-through'}>{task.name}</Text>}
        right={() => <Text>{formatTime(new Date(task.time))}</Text>}
        left={() => <Checkbox status={task.isDone === true ? 'checked' : 'unchecked'}
            color={colors.orange}
            onPress={() => _handleTmrCheckbox(task.id)} />}
        onPress={() => _handleTmrTask(task.id)} />)
    )
    return (
        <SafeAreaView>
            <View className='container px-3'>
                <View className="flex-row justify-between items-center">
                    <Bars3CenterLeftIcon color={colors.black} size="30" />
                </View>
                <View className="flex-row justify-between items-center mt-4">
                    <Text className="text-3xl font-bold">
                        Today
                    </Text>
                    <TouchableOpacity>
                        <PlusCircleIcon color={colors.orange} size="45" onPress={_handlePressAddTask}></PlusCircleIcon>
                    </TouchableOpacity>
                </View>
                <ScrollView className="h-2/5">
                    <List.Section>
                        {renderTasks}
                    </List.Section>
                </ScrollView>
                <View className="flex-row justify-between items-center mt-4">
                    <Text className="text-3xl font-bold">
                        Tomorrow
                    </Text>
                    <TouchableOpacity>
                        <PlusCircleIcon color={colors.orange} size="45" onPress={_handlePressAddTmrTask}></PlusCircleIcon>
                    </TouchableOpacity>
                </View>
                <ScrollView className="h-1/3">
                    <List.Section>
                        {renderTmrTasks}
                    </List.Section>
                </ScrollView>
                
            </View>

        </SafeAreaView>
    )
};

export default HomeScreen;