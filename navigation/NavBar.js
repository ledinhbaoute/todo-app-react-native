import { View, Text, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import * as React from 'react';
import { colors } from '../theme/colors';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import { CheckCircleIcon, Cog6ToothIcon } from 'react-native-heroicons/outline';
import HomeStack from './HomeStack';
import Calendar from '../components/Calender';
import SettingScreen from '../components/SettingScreen';


const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 80,
        backgroundColor: colors.orange
    }
};

const NavBar = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName='HomeStack'>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View className="flex-col justify-center items-center">
                                <CheckCircleIcon color={colors.white} size={30} />
                                <Text style={{ color: colors.white }} size=''>Task</Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={Calendar}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View className="flex-col justify-center items-center">
                                <CalendarDaysIcon color={colors.white} size={30} />
                                <Text style={{ color: colors.white }}>Calendar</Text>
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View className="flex-col justify-center items-center">
                                <Cog6ToothIcon color={colors.white} size={30} />
                                <Text style={{ color: colors.white }}>Setting</Text>
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );

}

export default NavBar;