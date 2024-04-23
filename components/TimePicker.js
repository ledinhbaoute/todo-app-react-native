import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../theme/colors';
import { formatTime } from '../helper/TimeFormat';

const TimePicker = ({time, onTimeChange}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      console.log(selectedTime)
      onTimeChange(selectedTime);
      setShowPicker(false);
    }
    
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showTimePicker} style={styles.timePicker}>
        <Text style={styles.time}>{formatTime(time)}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  timePicker: {
    padding: 10,
    borderRadius: 5,
  },
  time: {
    color: colors.white,
    fontSize: 30,
    backgroundColor: colors.orange,
  },
});

export default TimePicker;
