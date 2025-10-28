import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import * as z from "zod";
import { router } from "expo-router";

export const PersonalInfoSchema = z.object({
  fullName: z
    .string({ message: "Full name is required!" })
    .min(1, { message: "Full name must be longer than 1" }),
  address: z.string().min(1, { message: "Please provide your address!" }),
  city: z.string().min(1, { message: "City is required!" }),
  postcode: z.string().min(1, { message: "Postal code is required!" }),
  country: z.string().length(2),
  phone: z.string().min(1, { message: "Phone is required!" }),
  birthdate: z.date(),
});

export const PaymentSchema = z.object({
  cardNumber: z.string().length(12),
  expires: z
    .string()
    .min(1)
    .regex(
      /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/,
      "Expiry date must be in MM/YY or MM/YYYY format"
    ),
  CVV: z.coerce.number().min(3, { message: "Please provide CVV number" }),
  savecard: z.boolean().optional(),
  switchValue: z.boolean().optional(),
});

export type PaymentInfo = z.infer<typeof PaymentSchema>;

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

type CheckoutForm = {
  personalInfo: PersonalInfo | undefined;
  setPersonalInfo: (val: PersonalInfo | undefined) => void;
  paymentInfo: PaymentInfo | undefined;
  setPaymentInfo: (val: PaymentInfo | undefined) => void;
  onSubmit: () => void;
};

const CheckoutFormContext = createContext<CheckoutForm>({
  personalInfo: undefined,
  setPersonalInfo: () => {},
  paymentInfo: undefined,
  setPaymentInfo: () => {},
  onSubmit: () => {},
});

export default function CheckoutFormProvider({ children }: PropsWithChildren) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();

  const onSubmit = () => {
    if (!personalInfo || !paymentInfo) {
      console.log("The form is not complete");
      return;
    }

    setPaymentInfo(undefined);
    setPersonalInfo(undefined);

    router.dismissAll();
    router.back();
  };

  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        paymentInfo,
        setPaymentInfo,
        onSubmit,
      }}
    >
      {children}
    </CheckoutFormContext.Provider>
  );
}

export const useCheckoutForm = () => useContext(CheckoutFormContext);
