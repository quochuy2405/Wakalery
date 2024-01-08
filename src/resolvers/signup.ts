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
	username: yup
		.string()
		.min(5, "Minimum 5 characters")
		.test("", "Username error", (value) => {
			if (!value) return true;
			return checkIsNonAscent(value);
		})
		.required("Nhập tên tài khoản"),
	phoneNumber: yup
		.string()
		.onlyNumber("Số điện thoại chỉ được chứa số")
		.required("Nhập số điện thoại"),
	password: yup
		.string()
		.min(8, "Mật khẩu phải ít nhất 8 ký tự")
		.test("", "Mật khẩu không được có dấu", (value) => {
			if (!value) return true;
			return checkIsNonAscent(value);
		})
		.required("Nhập mật khẩu"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), undefined], "Mật khẩu xác nhận không trùng khớp")
		.required("Nhập lại mật khẩu"),
	// Add more fields as needed for registration
});
