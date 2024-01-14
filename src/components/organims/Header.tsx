import { initToken } from "@/redux/features/cookie";
import { RootState } from "@/redux/store";
import { cookieAuthHandles, getUserInfoCookie } from "@/utils/cookies";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button, Popconfirm } from "antd";
import clsx from "clsx";
import React, { useEffect } from "react";
import { BiHomeCircle, BiInfoCircle, BiLogoDiscourse } from "react-icons/bi";
import { MdWorkOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
interface HeaderProps {
	page: "home" | "discovery" | "contact";
}
const Header: React.FC<HeaderProps> = ({ page }) => {
	const token = useSelector((state: RootState) => state.auth.cookie.token);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const user = getUserInfoCookie();
	const onLogout = () => {
		cookieAuthHandles.clear();
		dispatch(initToken());
	};
	useEffect(() => {
		dispatch(initToken());
	}, [dispatch, token]);
	return (
		<>
			<div className='h-fit lg:h-20 w-full shadow-sm sticky top-0 bg-white/70 flex items-center justify-between gap-16 z-20 px-8 py-2 lg:py-4'>
				<Link to='/' className='w-fit font-semibold text-base'>
					Wakalery
				</Link>
				<div className='flex-1 justify-end flex items-center gap-28'>
					<div className='flex-1 hidden lg:flex gap-16 text-sm items-center justify-end'>
						<Link
							to='/'
							className={clsx(
								"p-4 w-fit h-10 flex ease-linear duration-200 items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full font-medium box-border",
								{
									"bg-neutral-100": page === "home",
								}
							)}>
							Home
						</Link>
						<Link
							to='/discovery'
							className={clsx(
								"p-4 w-fit h-10 flex ease-linear duration-200 items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full font-medium box-border",
								{
									"bg-neutral-100": page === "discovery",
								}
							)}>
							Discovery
						</Link>
						{user?.user_id && (
							<Link
								to='/works'
								className='p-4 w-fit h-10 flex ease-linear duration-200 items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full font-medium box-border'>
							My Workspace
							</Link>
						)}

						<Link
							to='/info'
							className={clsx(
								"p-4 w-fit h-10 flex ease-linear duration-200 items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full font-medium box-border",
								{
									"bg-neutral-100": page === "contact",
								}
							)}>
							Contact
						</Link>
					</div>
					<div className='w-fit flex items-center gap-4 text-sm'>
						{!user?.user_id && (
							<>
								<Link
									to='/login'
									className='p-4 w-fit h-10 flex ease-linear duration-200 items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full font-medium box-border'>
									Login
								</Link>
								<Button
									href='/signup'
									className='bg-main flex items-center !text-xs text-white !rounded-full h-10 hover:!text-gray-100 font-semibold'>
									Sign up
								</Button>
							</>
						)}
						{user?.user_id && (
							<Popconfirm title={"Are you sure ?"} placement='bottomRight' onConfirm={onLogout}>
								<Button className='bg-main w-full flex items-center !text-xs text-white !rounded-full h-10 hover:!text-gray-100 font-semibold'>
									Sign out
								</Button>
							</Popconfirm>
						)}
					</div>
				</div>
			</div>
			<div className='fixed h-fit left-0 bottom-0 w-full z-[29] lg:hidden'>
				<div className='w-5/6 m-auto h-12 bg-white shadow-md rounded-full z-30 flex justify-evenly items-center'>
					<Link to='/' className='flex flex-col items-center'>
						<BiHomeCircle
							className={clsx("w-5 h-5", {
								"text-emerald-500": page === "home",
							})}
						/>
						<p className='text-xs font-medium'>Home</p>
					</Link>
					<Link to='/discovery' className='flex flex-col items-center'>
						<BiLogoDiscourse
							className={clsx("w-5 h-5", { "text-emerald-500": page === "discovery" })}
						/>
						<p className='text-xs font-medium'>Discovery</p>
					</Link>
					{user?.user_id && (
						<Link to='/works' className='flex flex-col items-center'>
							<MdWorkOutline className={clsx("w-5 h-5")} />
							<p className='text-xs font-medium'>Works</p>
						</Link>
					)}

					<Link to='/info' className='flex flex-col items-center'>
						<BiInfoCircle className={clsx("w-5 h-5", { "text-emerald-500": page === "contact" })} />
						<p className='text-xs font-medium'>Info</p>
					</Link>
				</div>
				<div className='h-5 w-5/6 m-auto bg-white rounded-tr-full rounded-tl-full mt-5'></div>
			</div>
		</>
	);
};

export default Header;
