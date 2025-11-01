import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import KeyboardAwareScrollView from "../../components/KeyboardAwareScrollView";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CustomTextInput from "../../components/CustomTextInput";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaymentInfo,
  PaymentSchema,
  useCheckoutForm,
} from "../../context/CheckoutFormProvider";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomSwitch from "../../components/CustomSwitch";

// const PaymentSchema = z.object({
//   cardNumber: z.string().length(12),
//   expires: z
//     .string()
//     .min(1)
//     .regex(
//       /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/,
//       "Expiry date must be in MM/YY or MM/YYYY format"
//     ),
//   CVV: z.coerce.number().min(3, { message: "Please provide CVV number" }),
// });

// type PaymentInfo = z.infer<typeof PaymentSchema>;

const PaymentForm = () => {
  const { setPaymentInfo, paymentInfo } = useCheckoutForm();

  const form = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: paymentInfo,
  });

  const onNext: SubmitHandler<PaymentInfo> = (data) => {
    // console.log(data, "This is payment form");
    setPaymentInfo(data);
    router.push("/checkout/confirm");
  };

  // const onNext = (data) => {
  //   console.log(data, "This is payment form");
  //   router.push("/checkout/confirm");
  // };
  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        <CustomTextInput
          label="Card Number"
          name="cardNumber"
          placeholder="1234 5678 9012"
        />

        <View style={{ flexDirection: "row", gap: 6 }}>
          <CustomTextInput
            label="Expires"
            name="expires"
            placeholder="10/25"
            containerStyle={{ flex: 1 }}
          />

          <CustomTextInput
            label="CVV"
            name="CVV"
            placeholder="123"
            containerStyle={{ flex: 1 }}
            inputMode="numeric"
          />
        </View>

        <CustomCheckbox name="savecard" label="Save credit card" />
        <CustomSwitch name="switchValue" label="On or Off"/>

        <CustomButton
          onPress={form.handleSubmit(onNext)}
          // onPress={form.handleSubmit(()=> console.log('pressed'))}
          // onPress={()=> console.log("pressed")}
          title="Next"
          style={styles.button}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 10, gap: 8 },
  button: { marginTop: "auto" },
});
