import { getDeletedByUserId } from "@/apis/project";
import { TableTrash } from "@/components/moleculers";
import { SideBar } from "@/components/organims";
import { PhotoDirectory } from "@/types/image";
import { useEffect, useState } from "react";

const Deleted = () => {
	const [trash, setTrash] = useState<PhotoDirectory[]>([]);
	useEffect(() => {
		getDeletedByUserId("1").then(({ data }) => {
			setTrash(data);
		});
	}, []);

	return (
		<div className='w-full h-screen overflow-y-auto flex'>
			<SideBar page='trash' />
			<div className='flex-1 bg-neutral-100 h-full p-10'>
				<div className='flex items-center gap-2 font-semibold text-xl mt-6'>
					<svg
						width='24'
						height='24'
						viewBox='0 0 22 22'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M17.3608 7.97235C17.5436 7.97235 17.7094 8.0521 17.8404 8.18685C17.9626 8.33076 18.0241 8.50951 18.0063 8.69834C18.0063 8.76068 17.5177 14.9389 17.2387 17.5395C17.0639 19.1354 16.0351 20.1043 14.4919 20.1309C13.3053 20.1575 12.1455 20.1666 11.0035 20.1666C9.79103 20.1666 8.60533 20.1575 7.45439 20.1309C5.9629 20.0951 4.93321 19.1088 4.76739 17.5395C4.48032 14.9298 4.00069 8.76068 3.99178 8.69834C3.98286 8.50951 4.04349 8.33076 4.16651 8.18685C4.28776 8.0521 4.46249 7.97235 4.64614 7.97235H17.3608ZM12.8927 1.83331C13.703 1.83331 14.427 2.39889 14.6365 3.20555L14.7862 3.87471C14.9075 4.42012 15.38 4.80603 15.9238 4.80603H18.5965C18.9531 4.80603 19.25 5.10211 19.25 5.47886V5.82719C19.25 6.19477 18.9531 6.50002 18.5965 6.50002H3.40437C3.04687 6.50002 2.75 6.19477 2.75 5.82719V5.47886C2.75 5.10211 3.04687 4.80603 3.40437 4.80603H6.0771C6.62003 4.80603 7.09253 4.42012 7.21466 3.87563L7.35463 3.25047C7.57216 2.39889 8.28804 1.83331 9.10733 1.83331H12.8927Z'
							fill={"#00B897"}
						/>
					</svg>{" "}
					<p>Recycle</p>
				</div>
				<section className='mt-2'>
					<TableTrash data={trash} />
				</section>
			</div>
		</div>
	);
};

export default Deleted;
