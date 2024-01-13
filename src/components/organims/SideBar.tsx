import analys from "@/assets/analys.svg";
import favorite from "@/assets/favorite.svg";
import home from "@/assets/home.svg";
import image from "@/assets/image.svg";
import manager from "@/assets/manager.svg";
import search from "@/assets/search.svg";
import storage from "@/assets/storage.svg";
import { initToken } from "@/redux/features/cookie";
import { RootState } from "@/redux/store";
import { cookieAuthHandles } from "@/utils/cookies";
import { LogoutOutlined } from "@ant-design/icons";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Popconfirm } from "antd";
import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserInfo } from "../atoms";
interface SideBarProps {
	page: string;
}
const SideBar: React.FC<SideBarProps> = ({ page }) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	const onLogout = () => {
		cookieAuthHandles.clear();
		dispatch(initToken());
	};

	return (
		<div className='max-w-[20vw] lg:min-w-[300px] h-full p-1 lg:p-4 flex justify-between flex-col'>
			<div className='flex items-center flex-col w-full'>
				<div className='flex w-full'>
					<div className='flex flex-col justify-between w-full'>
						<h2 className='font-semibold  text-xs lg:text-sm'>Wakalery</h2>
						<p className='hidden lg:block text-xs'>My works</p>
					</div>
					<div className='hidden lg:flex w-full gap-4 items-center justify-end'>
						{/* <FaBell size={18} /> */}
						<UserInfo />
					</div>
				</div>
				<div className='lg:grid grid-cols-2 pt-6 gap-4 w-full'>
					<Link
						to='/'
						className={
							"lg:border w-fit m-auto lg:m-0 my-4 lg:my-0 lg:w-full h-fit lg:h-24 flex flex-col justify-between ease-linear duration-200 rounded-lg lg:rounded-3xl p-1 lg:p-3 group hover:bg-blue-400 hover:text-white hover:border-blue-300"
						}>
						<img
							src={home}
							alt='Home'
							className={clsx(
								"w-7 h-7 m-auto lg:m-0 group-hover:bg-white group-hover:border group-hover:rounded-md",
								{
									"lg:border rounded-md bg-white": page === "analytics",
								}
							)}
						/>
						<p className='hidden lg:block font-semibold text-sm'>Home</p>
					</Link>
					<Link
						to='/discovery'
						className='lg:border w-fit m-auto lg:m-0 my-4 lg:my-0 lg:w-full h-fit lg:h-24 flex flex-col justify-between ease-linear duration-200 rounded-lg lg:rounded-3xl p-1 lg:p-3 group hover:bg-red-400 hover:text-white hover:border-red-300'>
						<img
							src={image}
							alt='Home'
							className='w-7 h-7 m-auto lg:m-0 group-hover:bg-white group-hover:border group-hover:rounded-md'
						/>
						<p className='hidden lg:block font-semibold text-sm'>Discovery</p>
					</Link>
					<Link
						to='/works'
						className={clsx(
							"lg:border w-fit m-auto lg:m-0 my-4 lg:my- lg:w-full h-fit lg:h-24 flex flex-col justify-between ease-linear duration-200 rounded-lg lg:rounded-3xl p-1 lg:p-3 group hover:bg-blue-400 hover:text-white hover:border-blue-300",
							{
								"bg-blue-400  text-white lg:border-2 border-blue-300": page === "works",
							}
						)}>
						<img
							src={search}
							alt='Home'
							className={clsx(
								"w-7 h-7 m-auto lg:m-0 group-hover:bg-white group-hover:border group-hover:rounded-md",
								{
									"border rounded-md bg-white": page === "works",
								}
							)}
						/>
						<p className='hidden lg:block font-semibold text-sm group-hover:text-white'>Works</p>
					</Link>
					<Link
						to='/works/favorites'
						className={clsx(
							"lg:border w-fit m-auto lg:m-0 my-4 lg:my-0 lg:w-full h-fit lg:h-24 flex flex-col justify-between ease-linear duration-200 rounded-lg lg:rounded-3xl p-1 lg:p-3 group hover:bg-red-400 hover:text-white hover:border-red-300",
							{
								"bg-red-400 text-white border-2 border-red-300": page === "favorites",
							}
						)}>
						<img
							src={favorite}
							alt='Home'
							className={clsx(
								"w-7 h-7 m-auto lg:m-0 group-hover:bg-white group-hover:border group-hover:rounded-md",
								{
									"border rounded-md bg-white": page === "favorites",
								}
							)}
						/>
						<p className='hidden lg:block font-semibold text-sm group-hover:text-white'>
							Favorites
						</p>
					</Link>
					<Link
						to='/works/analytics'
						className={clsx(
							"lg:border w-fit m-auto lg:m-0 my-4 lg:my-0 lg:w-full h-fit lg:h-24 flex flex-col justify-between ease-linear duration-200 rounded-lg lg:rounded-3xl p-1 lg:p-3 group hover:text-white hover:border-emerald-400 hover:bg-emerald-500",
							{
								"bg-emerald-400 text-white border-2 border-emerald-300": page === "analytics",
							}
						)}>
						<img
							src={analys}
							alt='Home'
							className={clsx(
								"w-7 h-7 m-auto lg:m-0 group-hover:bg-white group-hover:border group-hover:rounded-md",
								{
									"border rounded-md bg-white": page === "analytics",
								}
							)}
						/>
						<p className='hidden lg:block font-semibold text-sm group-hover:text-white'>
							Analytics
						</p>
					</Link>
					<Link
						to={"/works/public-manage"}
						className={clsx(
							"lg:border w-fit m-auto lg:m-0 my-4 lg:my-0 lg:w-full h-fit lg:h-24 flex flex-col justify-between ease-linear duration-200 rounded-lg lg:rounded-3xl p-1 lg:p-3 cursor-pointer hover:bg-blue-400 group hover:text-white hover:border-blue-300",
							{
								"bg-blue-400 text-white border-2 border-blue-300": page === "mpublic",
							}
						)}>
						<img
							src={storage}
							alt='Home'
							className={clsx(
								"w-7 h-7 m-auto lg:m-0 bg-white group-hover:bg-white group-hover:border rounded-md ",
								{
									"border rounded-md ": page === "mpublic",
								}
							)}
						/>
						<p className='hidden lg:block font-semibold text-sm group-hover:text-white'>
							Public Manage
						</p>
					</Link>
				</div>
			</div>

			<div className='bg-purple-900 max-h-[20vh] h-full rounded-3xl hidden xl:flex w-full flex-1 my-2 m-auto relative p-4 text-white'>
				<img
					src={manager}
					alt='React Logo'
					className='w-2/3 h-[200%] absolute -top-[20%] -right-[30%]'
				/>
				<div className='flex flex-col gap-2 text-left drop-shadow-xl'>
					<h3 className='font-extrabold text-[120%] z-20 drop-shadow-xl'>Get Started With Us</h3>
					<p className='text-xs z-10'>Your ceremony & reception venues, yourvision</p>
				</div>
			</div>

			<div className='flex flex-col gap-3'>
				<Link to='/works/recycle' className='flex items-center gap-2'>
					<div
						className={clsx(
							"w-8 h-8 m-auto lg:m-0 p-2 bg-slate-100 rounded-lg flex items-center justify-center",
							{
								"!bg-emerald-400": page === "trash",
							}
						)}>
						<svg
							width='40'
							height='40'
							viewBox='0 0 22 22'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M17.3608 7.97235C17.5436 7.97235 17.7094 8.0521 17.8404 8.18685C17.9626 8.33076 18.0241 8.50951 18.0063 8.69834C18.0063 8.76068 17.5177 14.9389 17.2387 17.5395C17.0639 19.1354 16.0351 20.1043 14.4919 20.1309C13.3053 20.1575 12.1455 20.1666 11.0035 20.1666C9.79103 20.1666 8.60533 20.1575 7.45439 20.1309C5.9629 20.0951 4.93321 19.1088 4.76739 17.5395C4.48032 14.9298 4.00069 8.76068 3.99178 8.69834C3.98286 8.50951 4.04349 8.33076 4.16651 8.18685C4.28776 8.0521 4.46249 7.97235 4.64614 7.97235H17.3608ZM12.8927 1.83331C13.703 1.83331 14.427 2.39889 14.6365 3.20555L14.7862 3.87471C14.9075 4.42012 15.38 4.80603 15.9238 4.80603H18.5965C18.9531 4.80603 19.25 5.10211 19.25 5.47886V5.82719C19.25 6.19477 18.9531 6.50002 18.5965 6.50002H3.40437C3.04687 6.50002 2.75 6.19477 2.75 5.82719V5.47886C2.75 5.10211 3.04687 4.80603 3.40437 4.80603H6.0771C6.62003 4.80603 7.09253 4.42012 7.21466 3.87563L7.35463 3.25047C7.57216 2.39889 8.28804 1.83331 9.10733 1.83331H12.8927Z'
								fill={page === "trash" ? "white" : "#00B897"}
							/>
						</svg>
					</div>
					<p className='font-semibold text-sm hidden lg:block'>Recycle</p>
				</Link>
				<Link to='/works/settings' className='flex items-center gap-2'>
					<div
						className={clsx(
							"w-8 h-8 m-auto lg:m-0 p-2 bg-slate-100 rounded-lg flex items-center justify-center",
							{
								"!bg-emerald-400": page === "settings",
							}
						)}>
						<svg
							width='40'
							height='40'
							viewBox='0 0 22 22'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M11.6573 1.83344C12.3505 1.83344 12.9782 2.21844 13.3248 2.78677C13.4934 3.06177 13.6058 3.40094 13.5777 3.75844C13.559 4.03344 13.6433 4.30844 13.7932 4.5651C14.271 5.34427 15.3295 5.6376 16.1539 5.1976C17.0813 4.66594 18.2523 4.98677 18.7863 5.89427L19.4139 6.97594C19.9573 7.88344 19.6575 9.0476 18.7207 9.5701C17.9244 10.0376 17.6434 11.0734 18.1212 11.8618C18.2711 12.1093 18.4397 12.3201 18.702 12.4484C19.0299 12.6226 19.2828 12.8976 19.4608 13.1726C19.8074 13.7409 19.7793 14.4376 19.4421 15.0518L18.7863 16.1518C18.4397 16.7384 17.7933 17.1051 17.1282 17.1051C16.8003 17.1051 16.4349 17.0134 16.1352 16.8301C15.8916 16.6743 15.6106 16.6193 15.3108 16.6193C14.3834 16.6193 13.6058 17.3801 13.5777 18.2876C13.5777 19.3418 12.7159 20.1668 11.6386 20.1668H10.3645C9.27784 20.1668 8.41599 19.3418 8.41599 18.2876C8.39725 17.3801 7.61971 16.6193 6.69228 16.6193C6.38314 16.6193 6.1021 16.6743 5.86791 16.8301C5.56813 17.0134 5.19341 17.1051 4.8749 17.1051C4.20041 17.1051 3.55402 16.7384 3.20741 16.1518L2.56102 15.0518C2.21441 14.4559 2.19567 13.7409 2.54229 13.1726C2.69217 12.8976 2.97321 12.6226 3.29172 12.4484C3.55402 12.3201 3.72265 12.1093 3.8819 11.8618C4.3503 11.0734 4.06926 10.0376 3.27299 9.5701C2.34556 9.0476 2.04579 7.88344 2.57976 6.97594L3.20741 5.89427C3.75075 4.98677 4.91238 4.66594 5.84917 5.1976C6.66418 5.6376 7.72276 5.34427 8.20052 4.5651C8.35041 4.30844 8.43472 4.03344 8.41599 3.75844C8.39725 3.40094 8.5003 3.06177 8.67829 2.78677C9.0249 2.21844 9.65255 1.85177 10.3364 1.83344H11.6573ZM11.0109 8.4151C9.54014 8.4151 8.35041 9.5701 8.35041 11.0093C8.35041 12.4484 9.54014 13.5943 11.0109 13.5943C12.4817 13.5943 13.6433 12.4484 13.6433 11.0093C13.6433 9.5701 12.4817 8.4151 11.0109 8.4151Z'
								fill={page === "settings" ? "white" : "#00B897"}
							/>
						</svg>
					</div>
					<p className='font-semibold text-sm hidden lg:block'>Settings</p>
				</Link>
				<Link to='/works/profile' className='flex items-center gap-2'>
					<div
						className={clsx(
							"w-8 h-8 m-auto lg:m-0 p-2 bg-slate-100 rounded-lg flex items-center justify-center",
							{
								"!bg-emerald-400": page === "profile",
							}
						)}>
						<svg
							width='40'
							height='40'
							viewBox='0 0 22 22'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M10.9998 13.9094C14.9769 13.9094 18.3332 14.5557 18.3332 17.049C18.3332 19.5433 14.9549 20.1666 10.9998 20.1666C7.02368 20.1666 3.6665 19.5204 3.6665 17.027C3.6665 14.5328 7.04477 13.9094 10.9998 13.9094ZM10.9998 1.83331C13.694 1.83331 15.8527 3.99117 15.8527 6.68344C15.8527 9.37572 13.694 11.5345 10.9998 11.5345C8.30658 11.5345 6.14702 9.37572 6.14702 6.68344C6.14702 3.99117 8.30658 1.83331 10.9998 1.83331Z'
								fill={page === "profile" ? "white" : "#00B897"}
							/>
						</svg>
					</div>
					<p className='font-semibold text-sm hidden lg:block'>Profile</p>
				</Link>
				<Popconfirm title={"Are you sure ?"} placement='topRight' onConfirm={onLogout}>
					<div className='flex items-center gap-2 group hover:bg-main m-auto lg:m-0  w-fit lg:pr-4 rounded-md cursor-pointer transition-all ease-linear duration-200'>
						<div
							className={clsx(
								"w-8 h-8 m-auto lg:m-0 p-2 rounded-lg flex items-center justify-center transition-all ease-linear duration-200"
							)}>
							<LogoutOutlined className='group-hover:text-white transition-all ease-linear duration-200' />
						</div>
						<p className='font-semibold text-sm group-hover:text-white transition-all ease-linear duration-200 hidden lg:block'>
							Sign out
						</p>
					</div>
				</Popconfirm>
			</div>
		</div>
	);
};

export default SideBar;
