import {
  TextInput,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { ComponentProps } from "react";
import { useController } from "react-hook-form";

type CustomTextInput = {
  label?: string;
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
} & ComponentProps<typeof TextInput>;

export default function CustomTextInput({
  label,
  name,
  containerStyle,
  ...textInputProps
}: CustomTextInput) {
  // const {
  //   field: { value, onBlur, onChange },
  // } = useController({ name });
  // const error: { message?: string } = { message: "" };
  const {
    field: { value, onChange, onBlur },
    // field,
    fieldState: { error },
  } = useController({ name });

  // const {field} = useController({name})

  // console.log(value , "this is value")

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...textInputProps}
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        multiline
        style={[
          styles.input,
          textInputProps.style,
          error ? styles.errorInput : {},
        ]}
      />
      <Text numberOfLines={1} style={styles.error}>
        {error?.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  errorInput: {
    borderColor: "crimson",
  },
  label: {
    fontWeight: "600",
    color: "dimgray",
  },
  error: {
    color: "crimson",
    height: 17,
  },
});
