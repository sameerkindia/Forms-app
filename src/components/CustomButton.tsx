// import { View, Text, StyleProp, ViewStyle, Pressable } from "react-native";
// import React, { ComponentProps, forwardRef, ReactNode } from "react";

// type CustomButton = {
//   rightIcon?: ReactNode;
//   title: string;
//   style?: StyleProp<ViewStyle>;
// } & ComponentProps<typeof Pressable>;

// const CustomButton = ({
//   rightIcon,
//   title,
//   style,
//   ...pressableProps
// }: CustomButton) => {
//   return (
//     <Pressable >
//       <Text>CustomButton</Text>
//     </Pressable>
//   );
// };

// export default CustomButton;


// const CustomButton = forwardRef<View, CustomButton>({rightIcon, title, style, ...pressableProps}, ref) => {
//   return (
//     <View>
//       <Text>CustomButton</Text>
//     </View>
//   )
// }

import { View, Text, StyleProp, ViewStyle, Pressable, StyleSheet } from "react-native";
import React, { ComponentProps, forwardRef, ReactNode } from "react";

type CustomButtonProps = {
  rightIcon?: ReactNode;
  title: string;
  style?: StyleProp<ViewStyle>;
} & ComponentProps<typeof Pressable>;

const CustomButton = forwardRef<View, CustomButtonProps>(
  ({ rightIcon, title, style, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} style={[styles.button, style]} {...pressableProps}>
        <Text style={styles.buttonText}>{title}</Text>
        {rightIcon}
      </Pressable>
    );
  }
);

export default CustomButton;


const styles = StyleSheet.create({
  button:{
    backgroundColor: '#005055',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%'
  },
  buttonText: {
    color : 'white',
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5
  },
  rightIconContainer:{
    position: 'absolute',
    right: 20
  }
})