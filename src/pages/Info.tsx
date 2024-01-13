import { Header } from "@/components/organims";
import React from "react";

const Info = () => {
	return (
		<div className='flex flex-col w-full h-screen overflow-y-auto bg-white overflow-x-hidden'>
			<Header page='contact' />
			<div className='flex flex-col justify-center items-center w-5/6 m-auto pb-24'>
				<h2 className='uppercase text-sm font-semibold'>Hello! 😘</h2>
				<h1 className='text-4xl lg:text-4xl font-semibold'>Wakalery</h1>
				<h3 className='text-3xl font-bold text-red-500'>We Are A Champions</h3>
				<p className='text-sm mb-2'>Connect with Wakalery</p>

				<div className='flex flex-col lg:flex-row justify-between gap-8 mt-3'>
					<div className='w-full flex flex-col justify-center'>
						<p className='font-normal text-md leading-6 text-white bg-black shadow-md p-4 rounded-md'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia tempora, autem omnis
							cupiditate ea temporibus amet modi beatae. Numquam, odio. Reprehenderit, illo commodi.
							Recusandae neque voluptatum veniam quo vero laboriosam? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Quia tempora, autem omnis cupiditate ea temporibus amet
							modi beatae. Numquam, odio. Reprehenderit, illo commodi. Recusandae neque voluptatum
							veniam quo vero laboriosam?
						</p>
					</div>
				</div>

				<div className='flex lg:flex-row flex-col justify-between gap-8 pt-12'>
					<div className='w-full lg:w-5/12 flex flex-col justify-center'>
						<h1 className='text-3xl lg:text-4xl text-center font-bold leading-6 text-black pb-4'>
							Develop Teams
						</h1>
						<p className='font-normal text-sm leading-6 text-gray-600 bg-white shadow-md p-4 rounded-md'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nemo voluptas quaerat
							ad, voluptatem quam pariatur temporibus voluptates doloremque quisquam, eaque ipsum,
							nesciunt natus voluptatum sed cupiditate beatae ullam aliquid?
						</p>
					</div>
					<div className='w-full lg:w-8/12 lg:pt-8'>
						<div className='flex justify-center lg:justify-start gap-2 shadow-lg p-5 rounded-md'>
							<div className='p-4 pb-6 flex justify-center flex-col items-center'>
								<div className='rounded-lg h-56 w-36 overflow-hidden'></div>

								<h1 className='font-semibold text-sm leading-5 text-gray-800 mt-4'>Quoc Huy Bui</h1>
							</div>
							<div className='p-4 pb-6 flex justify-center flex-col items-center'>
								<div className=' rounded-lg h-56 w-36 overflow-hidden'></div>
								<h1 className='font-semibold text-sm leading-5 text-gray-800 mt-4'>
									Hoang Nhat Vo
								</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Info;
