import Submathing from "@/assets/sunbathing.svg";
import { Header } from "@/components/organims";
import { Button } from "antd";
import React from "react";

const LandingPage = () => {
	return (
		<>
			<Header page='home' />
			<div className='flex flex-col gap-4 px-4'>
				<section className='max-w-screen h-fit'>
					<div className='home-grid h-fit select-none'>
						<div id='sec-item-0' className='!p-4 md:!p-10'>
							<h2 className='font-extrabold text-6xl leading-[80px]'>
								A Photo Galery of The Nature
							</h2>
							<p className='w-full'>
								The Nature is Beautiful find your favorite picture around the world.
							</p>
						</div>
						<div className='hidden lg:block' id='sec-item-1'>
							&nbsp;
						</div>
						<div className='hidden lg:block' id='sec-item-2'>
							&nbsp;
						</div>
						<div id='sec-item-3'>
							<img
								className='h-full w-full object-cover'
								alt=''
								src='https://i.pinimg.com/564x/fa/07/6b/fa076b66be32669fd759847e3f52c799.jpg'
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-4'>
							<img
								src='https://i.pinimg.com/564x/1a/92/99/1a929903b78525cc078ae4f3350a65c0.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div id='sec-item-5'>
							<img
								src='https://i.pinimg.com/564x/f4/c7/ec/f4c7ec385c628fbf7ab0b4dc6cafd6da.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div id='sec-item-6'>
							<img
								src='https://i.pinimg.com/564x/79/d5/24/79d524ebb9f34e36c2950690fb85a08c.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-7'>
							<img
								src='https://i.pinimg.com/564x/cd/70/55/cd70552c7f4734faf7ec5a61d7b3798f.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-8'>
							&nbsp;
						</div>
						<div className='hidden lg:block' id='sec-item-9'>
							&nbsp;
						</div>
						<div className='hidden lg:block' id='sec-item-10'>
							&nbsp;
						</div>
						<div id='sec-item-11' className='hidden lg:block'>
							<img
								src='https://i.pinimg.com/564x/cd/70/55/cd70552c7f4734faf7ec5a61d7b3798f.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-12'>
							<img
								src='https://i.pinimg.com/564x/cd/70/55/cd70552c7f4734faf7ec5a61d7b3798f.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-13'>
							<img
								src='https://i.pinimg.com/564x/cd/70/55/cd70552c7f4734faf7ec5a61d7b3798f.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
					</div>
				</section>
				<section className='max-w-screen overflow-hidden'>
					<div className='sec2-grid'>
						<div className='hidden lg:block' id='sec2-item-0'>
							<img
								src='https://i.pinimg.com/564x/76/a0/5d/76a05d188f791702e619fdff9be44df9.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec2-item-1'>
							<img
								src='https://i.pinimg.com/564x/2a/71/c2/2a71c21ae28afffe15a034dacae6554b.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div id='sec2-item-2'>
							<img
								src='https://i.pinimg.com/564x/2a/71/c2/2a71c21ae28afffe15a034dacae6554b.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div id='sec2-item-3' className='p-4 md:p-10'>
							<h2 className='font-extrabold leading-[80px] text-6xl'>
								Where creative process happens
							</h2>
							<p className='py-4 lg:text-lg'>
								Your creativity, our inspiration Whatever your story, set if free.
							</p>
							<Button className='rounded-full !text-sm h-10 font-semibold bg-purple-500 text-white'>
								Get in Touch
							</Button>
						</div>
					</div>
				</section>
				<section className='max-w-screen overflow-hidden'>
					<div className='sec3-grid'>
						<div id='sec3-item-0'>
							<img
								src='https://i.pinimg.com/564x/75/96/61/759661a0c2eb97d6784c12fbdb8b0924.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-1'></div>
						<div className='hidden lg:block' id='sec3-item-2'>
							<img
								src='https://i.pinimg.com/564x/75/96/61/759661a0c2eb97d6784c12fbdb8b0924.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-3'>
							<img
								src='https://i.pinimg.com/564x/75/96/61/759661a0c2eb97d6784c12fbdb8b0924.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-4'>
							<img
								src='https://i.pinimg.com/564x/75/96/61/759661a0c2eb97d6784c12fbdb8b0924.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-5'></div>
						<div className='hidden lg:block' id='sec3-item-6'>
							<img
								src='https://i.pinimg.com/564x/75/96/61/759661a0c2eb97d6784c12fbdb8b0924.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div id='sec3-item-7' className='p-4 md:p-10'>
							<h3 className='font-medium text-lg'>GET TO KNOW US</h3>
							<h2 className='font-extrabold text-6xl leading-[80px]'>Why we make it happens </h2>
							<p className='py-4 text-lg'>
								Your creativity, our inspiration Whatever your story, set if free.
							</p>
							<Button className='rounded-full !text-sm h-10 font-semibold bg-purple-500 text-white'>
								Get in Touch
							</Button>
						</div>
					</div>
				</section>
				<section className='pb-24'>
					<div className='bg-purple-900 rounded-3xl md:w-4/5 h-fit mb-44 lg:mb-4 lg:h-[60vh] m-auto relative p-4 lg:p-10 text-white flex'>
						<img
							src={Submathing}
							alt='React Logo'
							className='p-10 hidden md:w-[30vw] h-fit md:h-[30vw] absolute -top-36 -right-[10vw]'
						/>
						<div className='flex flex-col gap-3 text-left relative z-40'>
							<h3 className='font-extrabold text-base lg:text-7xl'>Get Started With Us</h3>
							<p className='text-sm lg:text-lg'>
								Your ceremony & reception venues, yourvision, your dress, your colours and
								anythingelse you would like to share with us.
							</p>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default LandingPage;
