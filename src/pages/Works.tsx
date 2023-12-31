import { getAllFolderByUserId } from "@/apis/folder";
import FolderIcon from "@/assets/folder-icon.svg";
import Storage from "@/assets/storage.svg";
import { ProjectItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { PhotoDirectory } from "@/types/image";
import { useEffect, useState } from "react";

const Works = () => {
	const [folders, setFolders] = useState<PhotoDirectory[]>([]);
	useEffect(() => {
		getAllFolderByUserId("000001").then(({ data }) => {
			console.log("data", data);
		});
	}, []);
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
				<div className='flex items-center gap-2 font-semibold text-md mt-6'>
					<img src={FolderIcon} /> <p>Projects</p>
				</div>
				<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
				</section>
			</div>
		</div>
	);
};

export default Works;
