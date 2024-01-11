import { initToken } from "@/redux/features/cookie";
import { RootState } from "@/redux/store";
import { cookieAuthHandles } from "@/utils/cookies";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button, Popconfirm } from "antd";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
interface HeaderProps {
	page: "home" | "discovery" | "contact";
}
const Header: React.FC<HeaderProps> = ({ page }) => {
	const token = useSelector((state: RootState) => state.auth.cookie.token);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	const onLogout = () => {
		cookieAuthHandles.clear();
		dispatch(initToken());
	};
	useEffect(() => {
		dispatch(initToken());
	}, [dispatch, token]);
	return (
		<div className='h-20 w-screen shadow-sm sticky top-0 bg-white/70 flex items-center justify-between gap-16 z-20 px-8 py-4'>
			<h1 className='w-fit font-semibold text-base'>Wakalery</h1>
			<div className='flex-1 flex items-center gap-28'>
				<ul className='flex-1 flex gap-16 text-sm items-center justify-end'>
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
					{token && (
						<Link
							to='/works'
							className='p-4 w-fit h-10 flex ease-linear duration-200 items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-full font-medium box-border'>
							My works
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
				</ul>
				<div className='w-fit flex items-center gap-4 text-sm'>
					{!token && (
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
					{token && (
						<Popconfirm title={"Are you sure ?"} placement='bottomRight' onConfirm={onLogout}>
							<Button className='bg-main w-full flex items-center !text-xs text-white !rounded-full h-10 hover:!text-gray-100 font-semibold'>
								Sign out
							</Button>
						</Popconfirm>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
