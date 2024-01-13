import { LoginForm } from "@/components/forms";
import React from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className='w-full h-screen !h-[100dvh] flex items-center justify-center'>
			<Link
				to={"/"}
				className='absolute top-3 left-3 p-4 w-14 h-14 flex items-center justify-center hover:bg-neutral-100 ease-linear duration-200 cursor-pointer rounded-full'>
				<svg
					className='Hn_ gUZ R19 U9O kVc'
					height='20'
					width='20'
					viewBox='0 0 24 24'
					aria-hidden='true'
					aria-label=''
					role='img'>
					<path d='M8.415 4.586a2 2 0 1 1 2.828 2.828L8.657 10H21a2 2 0 0 1 0 4H8.657l2.586 2.586a2 2 0 1 1-2.828 2.828L1 12l7.415-7.414z'></path>
				</svg>
			</Link>
			<div className='flex-[1.5] h-full'>
				<LoginForm />
			</div>
			<div className='hidden lg:block flex-[2] h-full'>
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
