import { checkIsNonAscent } from "@/utils/common";
import yup from "./yup-global";

declare module "yup" {
	interface StringSchema {
		onlyNumber(message: string): StringSchema;
	}
}

export const signupSchema = yup.object().shape({
	firstName: yup.string().required("Enter your first name."),
	lastName: yup.string().required("Enter your last name."),
	email: yup.string().email().required("Enter your email."),
	phoneNumber: yup
		.string()
		.onlyNumber("Phone number can only contain digits")
		.required("Enter your phone number"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.test("", "Password cannot have accents", (value) => {
			if (!value) return true;
			return checkIsNonAscent(value);
		})
		.required("Enter your password"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), undefined], "Passwords do not match")
		.required("Confirm your password"),
	// Add more fields as needed for registration
});
