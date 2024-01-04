import { getAllProjectByUserId } from "@/apis/project";
import FolderIcon from "@/assets/folder-icon.svg";
import Storage from "@/assets/storage.svg";
import { ModalCreateProject, ProjectItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { closeLoading, startLoading } from "@/redux/features/loading";
import { ProjectType } from "@/types/project";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Works = () => {
	const [project, setProject] = useState<ProjectType[]>([]);
	const [refresh, setRefresh] = useState<boolean>(false);
	const [newProject, setNewProject] = useState<boolean>(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!newProject) dispatch(startLoading());
		getAllProjectByUserId("1")
			.then(({ data }) => {
				setProject(data);
			})
			.finally(() => {
				dispatch(closeLoading());
			});
	}, [dispatch, newProject, refresh]);
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='works' />
			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<section>
					<div className='shadow-lg rounded-3xl w-full h-[230px] overflow-hidden bg-white m-auto relative p-10 text-white flex'>
						<img
							src={Storage}
							alt='React Logo'
							className='w-[300px] h-[260px] absolute top-0 right-0 '
						/>
						<div className='flex flex-col gap-3 text-left text-black'>
							<h3 className='font-extrabold text-2xl z-20'>Get Started With Us</h3>
							<p className='text-sm z-10'>
								Your ceremony & reception venues, yourvision, your dress, your colours and
								anythingelse you would like to share with us.
							</p>
						</div>
					</div>
				</section>
				<div className='flex justify-between items-center gap-2 shadow-lg p-4 font-semibold text-md mt-6 bg-white rounded-xl'>
					<div className='flex gap-3'>
						<img src={FolderIcon} /> <p>Projects</p>
					</div>
					<Button onClick={() => setNewProject(true)} className='font-semibold'>
						New Project
					</Button>
				</div>
				<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 overflow-y-auto'>
					{project.map((item) => {
						return <ProjectItem refresh={() => setRefresh((e) => !e)} data={item} />;
					})}
				</section>
				<ModalCreateProject open={newProject} onClose={() => setNewProject(false)} />
			</div>
		</div>
	);
};

export default Works;
