import { getFavoriteByUserId } from "@/apis/project";
import favoriteIcon from "@/assets/favorite.svg";
import { SideBar } from "@/components/organims";
import { PhotoDirectory } from "@/types/image";
import clsx from "clsx";
import { useEffect, useState } from "react";

const Favorites = () => {
	const [favorite, setFavorite] = useState<PhotoDirectory[]>([]);
	useEffect(() => {
		getFavoriteByUserId("1").then(({ data }) => {
			setFavorite(data);
		});
	}, []);
	console.log("favorite", favorite);
	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='favorites' />
			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<div className='flex items-center gap-2 font-semibold text-sm mt-6'>
					<img src={favoriteIcon} alt='Home' className={clsx("w-7 h-7")} /> <p>Favorites</p>
				</div>
				<section className='py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
					{/* <ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem />
					<ProjectItem /> */}
				</section>
			</div>
		</div>
	);
};

export default Favorites;
