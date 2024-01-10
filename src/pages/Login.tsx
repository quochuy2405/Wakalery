import { LoginForm } from "@/components/forms";
import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";

const Login = () => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			<div className='flex-[1.5] h-full'>
				<LoginForm />
			</div>
			<div className='flex-[2] h-full'>
				<div className='grid grid-cols-2 w-full  h-full grid-rows-2 '>
					<div className='row-span-2'>
						<img
							className='h-full w-full object-cover'
							alt={"Thumb"}
							src='/login-image.png'
							loading='lazy'
						/>
					</div>
					<div>
						<img
							className='h-full w-full object-cover'
							alt={"Thumb"}
							src='/login-image.png'
							loading='lazy'
						/>
					</div>
					<div className='col-start-2 row-start-2'>
						<img
							className='h-full w-full object-cover'
							alt={"Thumb"}
							src='/login-image.png'
							loading='lazy'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
