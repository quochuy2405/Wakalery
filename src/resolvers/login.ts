import { checkIsNonAscent } from "@/utils/common";
import yup from "./yup-global";

declare module "yup" {
	interface StringSchema {
		onlyNumber(message: string): StringSchema;
	}
}

export const loginSchema = yup.object().shape({
	email: yup.string().email("Email must be a valid email.").required("Enter your email."),

	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.test("", "Password can't have accents", (value) => {
			if (!value) return true;
			return checkIsNonAscent(value);
		})
		.required("Enter your password"),
});
