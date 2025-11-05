import React, { ComponentProps } from "react";
import { useController } from "react-hook-form";
import { Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

type CustomPicker = {
  name: string;
} & Omit<ComponentProps<typeof RNPickerSelect>, "onValueChange">;

export default function CustomPicker({ name, ...pickerProps }: CustomPicker) {
  const {
    field: { value, onBlur, onChange },
    fieldState: { error },
  } = useController({ name });
  return (
    <View style={{ marginVertical: 4 }}>
      <RNPickerSelect
        {...pickerProps}
        value={value}
        onValueChange={onChange}
        onClose={onBlur}
        useNativeAndroidPickerStyle
        style={{
          viewContainer: {
            marginTop: 4,
            marginBottom: 4,
          },
          inputIOS: {
            borderColor: error ? "crimson" : "gainsboro",
            borderWidth: 1,
            width: "100%",
            padding: 10,
            borderRadius: 5,
          },
          inputAndroid: {
            borderColor: error ? "crimson" : "gainsboro",
            borderWidth: 1,
            width: "100%",
            padding: 10,
            borderRadius: 5,
          },
        }}
      />
      <Text numberOfLines={1} style={{ color: "crimson", height: 17 }}>
        {error?.message}
      </Text>
    </View>
  );
}
