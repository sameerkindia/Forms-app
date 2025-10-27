import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import KeyboardAwareScrollView from "../../components/KeyboardAwareScrollView";
import { useCheckoutForm } from "../../context/CheckoutFormProvider";

// const personalInfo = {
//   fullName: "Sameer khan",
//   address: "Poblenou",
//   city: "Barcelona",
//   postcode: "1234",
//   phone: "1234567890",
//   country: "ES",
// };

// const paymentInfo = {
//   cardNumber: "123456789012",
//   expires: "01.30",
//   CVV: "123",
// };

const ConfirmForm = () => {
  const { personalInfo, paymentInfo, onSubmit } = useCheckoutForm();

  // const onNext = () => {
  //   // router.push("/");
  //   router.dismissAll();
  //   router.back();
  // };
  return (
    <KeyboardAwareScrollView>
      <View style={{ gap: 10, flex: 1 }}>
        {personalInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Personal</Text>
              <Link href={"/checkout"} style={{ color: "#005055" }}>
                Edit
              </Link>
            </View>

            {Object.entries(personalInfo).map(([key, value]) => (
              <View key={key}>
                <Text>
                  {key} : {value?.toString()}
                </Text>
              </View>
            ))}
          </View>
        )}

        {paymentInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Payment</Text>
              <Link href={"/checkout/payment"} style={{ color: "#005055" }}>
                Edit
              </Link>
            </View>

            {Object.entries(paymentInfo).map(([key, value]) => (
              <View key={key}>
                <Text>
                  {key} : {value?.toString()}
                </Text>
              </View>
            ))}
          </View>
        )}

        <CustomButton onPress={onSubmit} title="Submit" style={styles.button} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ConfirmForm;

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flex: 1, padding: 15, gap: 15 },
  button: { marginTop: "auto", marginBottom: 25 },
  dataContainer: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    borderRadius: 10,
    gap: 3,
  },
  dataContainerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
});
