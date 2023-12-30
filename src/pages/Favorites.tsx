import { ProjectItem } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import favorite from "@/assets/favorite.svg";
import clsx from "clsx";

const Favorites = () => {
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='favorites' />
			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<div className='flex items-center gap-2 font-semibold text-sm mt-6'>
					<img src={favorite} alt='Home' className={clsx("w-7 h-7")} /> <p>Favorites</p>
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

export default Favorites;
