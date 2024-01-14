import { Header } from "@/components/organims";
import { RootState } from "@/redux/store";
import { getUserInfoCookie } from "@/utils/cookies";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LandingPage = () => {
	const [isLogin, setIsLogin] = useState(false);
	const token = useSelector((state: RootState) => state.auth.cookie.token);

	useEffect(() => {
		const user = getUserInfoCookie();
		setIsLogin(!user?.user_id);
	}, [token]);
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
								src='https://i.pinimg.com/originals/66/2a/96/662a96e52d0aa301c7e55c7a615c9d7f.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-7'>
							<img
								src='https://i.pinimg.com/originals/4f/b6/0e/4fb60ef6240c5ffabd5765b2cbadb0ed.jpg'
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
								src='https://i.pinimg.com/originals/bb/53/36/bb53369dded322e74ec3db8b2146444a.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-12'>
							<img
								src='https://i.pinimg.com/originals/a1/60/db/a160db240abd6963521f42e4af8f5a30.jpg'
								className='h-full w-full object-cover'
								alt=''
							/>
						</div>
						<div className='hidden lg:block' id='sec-item-13'>
							<img
								src='https://i.pinimg.com/originals/38/58/51/3858517f540c6cc88313a9f98656f965.jpg'
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
								src='https://i.pinimg.com/originals/69/84/6e/69846ee6584ba9a9a8205f06e9f0a3f2.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec2-item-1'>
							<img
								src='https://i.pinimg.com/originals/19/0c/36/190c3651c7523ee7b9ffa5d31b30ab69.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div id='sec2-item-2'>
							<img
								src='https://i.pinimg.com/originals/60/78/16/6078160fac7a13c538a9fb7f9f131f46.jpg'
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
							{isLogin && (
								<Button
									href='/signup'
									className='rounded-full !text-sm h-10 font-semibold bg-purple-600  flex items-center justify-center w-fit text-white'>
									Sign Up Now
								</Button>
							)}
							{!isLogin && (
								<Button
									href='/signup'
									className='rounded-full !text-sm h-10 font-semibold bg-purple-600  flex items-center justify-center w-fit !text-white'>
									Go to workspace
								</Button>
							)}
						</div>
					</div>
				</section>
				<section className='max-w-screen overflow-hidden'>
					<div className='sec3-grid'>
						<div id='sec3-item-0'>
							<img
								src='https://i.pinimg.com/564x/41/0f/ec/410fecb2c951ee9b149b7cbc3fcaca09.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-1'></div>
						<div className='hidden lg:block' id='sec3-item-2'>
							<img
								src='https://i.pinimg.com/564x/26/df/c6/26dfc66f34e68c3636c1b8d535f97835.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-3'>
							<img
								src='https://i.pinimg.com/736x/35/4a/11/354a119533feb57c6e3f2ef11860720b.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-4'>
							<img
								src='https://i.pinimg.com/564x/37/c6/ce/37c6ce31052a197bc0a448ad0e5c01ed.jpg'
								alt=''
								className='h-full w-full object-cover'
							/>
						</div>
						<div className='hidden lg:block' id='sec3-item-5'></div>
						<div className='hidden lg:block' id='sec3-item-6'>
							<img
								src='https://i.pinimg.com/originals/85/41/ee/8541ee1d3de281d2a9a6bee021dffdf9.jpg'
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
							<Button
								href='/discovery'
								className='rounded-full flex items-center justify-center w-fit !text-sm h-10 font-semibold bg-main !text-white'>
								Dicovery now
							</Button>
						</div>
					</div>
				</section>
				<section className='pb-24'>
					<div className='bg-black rounded-3xl md:w-4/5 h-fit mb-44 lg:mb-4 lg:h-[40vh] overflow-hidden flex flex-col md:flex-row justify-center items-center m-auto relative p-4 lg:p-10 text-white'>
						<img
							src='https://i.pinimg.com/564x/1b/aa/e6/1baae61e5d2d7acef5b250a2eea1b4dc.jpg'
							alt='image i can do it'
							className='flex-1 w-full h-full object-cover'
						/>
						<div className='flex flex-col gap-3 text-left relative z-40'>
							<h3 className='font-extrabold text-base lg:text-6xl'>Get Started With Us</h3>
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
