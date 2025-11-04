import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useController } from "react-hook-form";

type CustomDateTimePicker = {
  name: string;
};

export default function CustomDateTimePicker({ name }: CustomDateTimePicker) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn("A date has been picked: ", date);
    onChange(date);
    hideDatePicker();
  };

  return (
    <View>
      <Text
        onPress={showDatePicker}
        style={{
          borderWidth: 1,
          borderColor: "gainsboro",
          padding: 10,
          borderRadius: 5,
          marginTop: 4,
          color: "black",
        }}
      >
        {value?.toLocaleDateString() || "Select a date"}
      </Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text style={{ color: "crimson" }} numberOfLines={1}>
        {error?.message}
      </Text>
    </View>
  );
}
