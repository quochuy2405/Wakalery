import { getDecodeSteg } from "@/apis/hiddenstage";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { GiHidden } from "react-icons/gi";
interface StegImageProps {
	photoName: string | null;
}

type StegMessage = {
	ownerId?: number;
	ownerName?: string;
	sharers?: Array<number>;
	msg?: string;
};
const StegImage: React.FC<StegImageProps> = ({ photoName }) => {
	const [steg, setSteg] = useState<StegMessage>({});
	const [viewMessage, setViewMesssage] = useState<boolean>(false);
	useEffect(() => {
		if (!photoName) return;
		getDecodeSteg({
			photoName
		}).then(({ data }) => {
			console.log("data", data);
			setSteg(data);
		});
	}, []);
	const renderHiddenMessage = () => {
		if (viewMessage)
			return (
				<Tooltip title='Click to hide'>
					<span className='cursor-pointer' onClick={() => setViewMesssage(false)}>
						{steg?.msg}
					</span>
				</Tooltip>
			);
		return (
			<Tooltip title='Click to view'>
				<span className='cursor-pointer flex items-center ' onClick={() => setViewMesssage(true)}>
					{steg?.msg?.split("").map(() => (
						<GiHidden size={8} />
					))}
				</span>
			</Tooltip>
		);
	};
	if (!steg.ownerId) return <></>;
	return (
		<div className='bg-neutral-100 rounded-lg p-4 select-none mb-3'>
			<p className='text-xs text-gray-500 font-semibold'>Author: {steg?.ownerName} </p>
			{steg.msg && (
				<p className='text-xs text-gray-500 font-semibold flex gap-2'>
					Message: {renderHiddenMessage()}
				</p>
			)}
			<p className='bg-neutral-200 rounded-md h-fit w-full'></p>
		</div>
	);
};

export default StegImage;
