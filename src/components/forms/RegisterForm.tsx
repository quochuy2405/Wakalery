import { Button } from "antd";
import { TextField, TextFieldPassword } from "../atoms";
import { Link } from "react-router-dom";

const RegisterForm: React.FC = () => {
	return (
		<div className='flex flex-col gap-4 h-full flex-1 w-4/5 m-auto justify-center items-center'>
			<h1 className='font-bold text-center text-4xl mb-5'>Sign up</h1>

			<div className='flex w-full h-fit flex-col'>
				<div className='flex flex-col gap-4 justify-center items-center w-full'>
					<div className='flex justify-center gap-4 w-full'>
						<TextField title='First name' />
						<TextField title='Last name' />
					</div>
					<TextField title='Phone number' />
					<TextField title='Username' />
					<TextFieldPassword title='Password' />
					<TextFieldPassword title='Confirm Password' />

					<Button type='primary' className='bg-main button-form mt-6'>
						Sign up
					</Button>
				</div>

				<span className='text-xs font-semibold text-center text-black/70 h-10 mt-5'>
					{"Already have an account. Let's"}
					<Link to='/login' className='px-1 text-main hover:underline cursor-pointer'>sign in</Link>
					{"now."}
				</span>
			</div>
		</div>
	);
};

export default RegisterForm;
