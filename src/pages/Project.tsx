import { FolderItem, ImageItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";

const Project = () => {
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='works' />
			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<div className='flex items-center justify-between bg-white w-full rounded-xl p-3 shadow-lg'>
					<Breadcrumb
						items={[
							{
								title: "Projects",
							},
							{
								title: <Link to='/'>Project 0001</Link>,
							},
						]}
					/>
					<div className='flex items-center gap-4'>
						<Button className='font-normal items-center flex justify-center text-xs !rounded-lg'>
							Create folder
						</Button>
						<Button className='font-normal items-center flex justify-center text-xs !rounded-lg'>
							Upload
						</Button>
					</div>
				</div>
				<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
					<FolderItem />
					<FolderItem />
					<FolderItem />
					<FolderItem />
					<FolderItem />
					<FolderItem />
					<FolderItem />
					<ImageItem />
				</section>
			</div>
		</div>
	);
};

export default Project;
