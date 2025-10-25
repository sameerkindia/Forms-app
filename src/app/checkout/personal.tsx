import { View, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import CustomTextInput from "../../components/CustomTextInput";
import KeyboardAwareScrollView from "../../components/KeyboardAwareScrollView";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import RNPickerSelect from "react-native-picker-select";
import countries from "../../../assets/countries.json";
import {
  PersonalInfo,
  PersonalInfoSchema,
  useCheckoutForm,
} from "../../context/CheckoutFormProvider";
import CustomPicker from "../../components/CustomPicker";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";

// const PersonalInfoSchema = z.object({
//   fullName: z
//     .string({ message: "Full name is required!" })
//     .min(1, { message: "Full name must be longer than 1" }),
//   address: z.string().min(1, { message: "Please provide your address!" }),
//   city: z.string().min(1, { message: "City is required!" }),
//   postcode: z.string().min(1, { message: "Postal code is required!" }),
//   phone: z.string().min(1, { message: "Phone is required!" }),
// });

// type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

const PersonalDetailForm = () => {
  // const {
  //   handleSubmit,
  //   formState: { errors },
  //   control,
  // } = useForm();
  const { setPersonalInfo, personalInfo } = useCheckoutForm();

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: personalInfo,
  });

  // console.log(form , "this is form")

  const onNext: SubmitHandler<PersonalInfo> = (data) => {
    // console.log(data, "this is data");
    setPersonalInfo(data);
    router.push("/checkout/payment");
  };

  return (
    <KeyboardAwareScrollView>
      <FormProvider {...form}>
        {/* <Controller
        control={control}
        name="fullName"
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <CustomTextInput
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label="Full name"
            placeholder="Sameer khan"
          />
        )}
      /> */}

        <CustomTextInput
          label="Full name"
          name="fullName"
          placeholder="Sameer khan"
        />

        <CustomTextInput
          label="Address"
          name="address"
          placeholder="Address"
          style={{ height: 100 }}
        />

        <View style={{ flexDirection: "row", gap: 6 }}>
          <CustomTextInput
            label="City"
            name="city"
            placeholder="City"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            label="Post code"
            name="postcode"
            placeholder="306 401"
            containerStyle={{ flex: 1 }}
          />
        </View>

        
        <CustomPicker
          name="country"
          placeholder={{ label: "Select country" }}
          items={countries.map((country) => ({
            label: country.name,
            value: country.code,
          }))}
        />

        <CustomTextInput
          label="Phone number"
          name="phone"
          placeholder="1234567890"
          inputMode="tel"
        />

        <CustomDateTimePicker name="birthdate" />

        <CustomButton
          onPress={form.handleSubmit(onNext)}
          title="Next"
          style={styles.button}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1, backgroundColor: "white" }}
    //   keyboardVerticalOffset={110}
    // >
    //   <ScrollView
    //     style={{ backgroundColor: "white" }}
    //     contentContainerStyle={styles.container}
    //     keyboardShouldPersistTaps="handled"
    //   >
    //     <SafeAreaView edges={["bottom"]}>
    //     </SafeAreaView>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default PersonalDetailForm;

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 10, gap: 8 },
  button: { marginTop: "auto" },
});
