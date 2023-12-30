import FolderIcon from "@/assets/folder-icon.svg";
import { ProjectItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";

const Works = () => {
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar/>
			<div className='flex-1 bg-[#d1d8dd] h-full p-10'>
				<div className='flex items-center gap-2 font-semibold text-xl mt-6'>
					<img src={FolderIcon} /> <p>Recycle</p>
				</div>
				<section className='py-6 grid grid-cols-4 gap-10'>
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
