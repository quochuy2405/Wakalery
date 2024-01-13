import { getAllProjectByUserId } from "@/apis/project";
import FolderIcon from "@/assets/folder-icon.svg";
import Storage from "@/assets/storage.svg";
import { FloatButton } from "@/components/atoms";
import { ModalCreateProject, ProjectItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { RootState } from "@/redux/store";
import { ProjectType } from "@/types/project";
import { getUserInfoCookie } from "@/utils/cookies";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Works = () => {
	const [project, setProject] = useState<ProjectType[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [newProject, setNewProject] = useState<boolean>(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();

	useEffect(() => {
		const user = getUserInfoCookie();
		if (!user?.user_id) return;
		dispatch(startLoading());
		getAllProjectByUserId()
			.then(({ data }) => {
				setProject(data);
			})

			.finally(() => {
				dispatch(closeLoading());
			});
	}, [dispatch, refresh]);
	useEffect(() => {
		if (!newProject && project)
			getAllProjectByUserId()
				.then(({ data }) => {
					setProject(data);
				})

				.finally(() => {
					dispatch(closeLoading());
				});
	}, [dispatch, project, newProject]);

	return (
		<div className='w-full h-screen !h-[100dvh] overflow-y-auto flex'>
			<SideBar page='works' />
			<div className='flex-1 bg-neutral-100 h-full p-2 lg:p-10 flex flex-col'>
				<section>
					<div className='shadow-lg rounded-3xl w-full h-fit md:h-[20vh] overflow-hidden bg-white m-auto relative p-4 md:p-10 text-white flex'>
						<img
							src={Storage}
							alt='React Logo'
							className='w-[300px] h-[20vh] absolute top-0 right-0 bottom-3'
						/>
						<div className='flex flex-col gap-3 text-left text-black'>
							<h3 className='font-extrabold text-xl md:text-2xl z-20'>Get Started With Us</h3>
							<p className='text-xs md:text-sm z-10'>
								Your ceremony & reception venues, yourvision, your dress, your colours and
								anythingelse you would like to share with us.
							</p>
						</div>
					</div>
				</section>
				<div className='flex justify-between items-center gap-2 shadow-lg p-4 font-semibold text-md mt-6 bg-white rounded-xl'>
					<div className='flex gap-3'>
						<img aria-label='icon' className='w-4 h-4 lg:w-8 lg:h-8' src={FolderIcon} />{" "}
						<p className='text-sm lg:text-base'>Projects</p>
					</div>
					<Button
						onClick={() => setNewProject(true)}
						className='font-semibold !text-sm lg:!text-base'>
						New Project
					</Button>
				</div>

				<div className='flex flex-1 flex-col overflow-y-auto'>
					<section className='py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center overflow-y-auto pb-32'>
						{project.map((item) => {
							return <ProjectItem refresh={() => setRefresh((e) => !e)} data={item} />;
						})}
					</section>
				</div>
				<ModalCreateProject open={newProject} onClose={() => setNewProject(false)} />
			</div>
			<FloatButton onSearch={() => null} isPrivate />
		</div>
	);
};

export default Works;
