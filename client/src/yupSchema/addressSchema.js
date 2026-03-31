import * as yup from 'yup';

export const addressSchema = yup.object({
	firstName: yup.string().min(2, "Atleast 2 characters are required.").required("First Name field is required."),
	lastName: yup.string().min(2, "Atleast 2 characters are required.").required("Last Name field is required."),
	email: yup.string().email("It must be an Email").required("Email field is required."),
	phone: yup.string().required("Phone field is required."),
	street: yup.string().required("Street field is required."),
	city: yup.string().required("City field is required."),
	state: yup.string().required("State field is required."),
	zip: yup.string().required("Zip Code field is required."),
	country: yup.string().required("Country field is required."),
});
 