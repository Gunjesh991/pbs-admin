import * as yup from "yup";

const hireFormSchema = yup.object().shape({
  fullName: yup.string().required().min(3),
  email: yup.string().email().required(),
  phone: yup.string().length(10).required(),
  additionalInformation: yup.string().optional(),
  location: yup.string().required(),
  date: yup
    .date()
    .required()
    .transform((_, oVal) => new Date(oVal))
    .min(Date.now(), "Event date must be in future."),
});

export const hireFormValidator = async (hireData = {}) => {
  const vald = await hireFormSchema.validate(hireData);

  return vald;
};
