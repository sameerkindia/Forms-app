import { Switch, Text, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";
import { useController } from "react-hook-form";

type CustomSwitch = {
  name: string;
  label?: string;
};

export default function CustomSwitch({ name, label }: CustomSwitch) {
  const {
    field: { value, onChange },
  } = useController({ name });
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 5,
        marginVertical: 8,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "700" }}>{label}</Text>
      <Switch style={{}} value={value} onValueChange={onChange} />
    </View>
  );
}
