import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";

export default function index() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      {/* <Link href="/checkout">Checkout</Link> */}
      <Link href="/checkout" asChild>
        <CustomButton title="Checkout" />
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
