import { buildGraphGNN, cropFaces, prepareDataGraphGNN } from "@/apis/detect";
import { closeTrain, startTrain } from "@/redux/features/detect";
import { RootState } from "@/redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Timeline, message } from "antd";
import React, { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

type StatusType = {
	items: Array<{ title: string }>;
	pending: string;
};
const BuildGNN = () => {
	const detect = useSelector((state: RootState) => state.detect);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<ThunkDispatch<RootState, never, any>>();
	const [status, setStatus] = useState<StatusType>({
		items: [],
		pending: "",
	});

	const delayTime = async () => {
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve(1);
			}, 3000);
		});
	};

	const process = async () => {
		dispatch(startTrain());
		setStatus((curr) => ({
			...curr,
			pending: `Analysis face detecting...`,
		}));
		await delayTime();
		await cropFaces()
			.then(async () => {
				await delayTime();
				setStatus((curr) => ({
					...curr,
					items: [...curr.items, { title: "Analysis face completed." }],
				}));
				//   dispatch(startTrain());
				setStatus((curr) => ({
					...curr,
					pending: ` Preparing data for graph Artificial neural network...`,
				}));
				await prepareDataGraphGNN()
					.then(async () => {
						await delayTime();
						setStatus((curr) => ({
							...curr,
							pending: `Building Artificial neural network...`,
						}));
						setStatus((curr) => ({
							...curr,
							items: [
								...curr.items,
								{ title: "Data for graph Artificial neural network prepared." },
							],
						}));
						await buildGraphGNN()
							.then(async () => {
								await delayTime();
								setStatus((curr) => ({
									...curr,
									pending: "",
									items: [...curr.items, { title: "Artificial neural network is builded." }],
								}));
							})
							.catch(() => {
								message.error("Error Build Face");
							})
							.finally(() => {
								dispatch(closeTrain());
							});
					})
					.catch(() => {
						message.error("Error Prepared Data");
					})
					.finally(() => {
						dispatch(closeTrain());
					});
			})
			.catch(() => {
				message.error("Analysis face");
			})
			.finally(() => {
				dispatch(closeTrain());
			});
	};
	useEffect(() => {
		if (detect) {
			process();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [detect]);

	return (
		<div className='flex flex-col gap-2 w-full overflow-hidden'>
			<h2 className='uppercase px-2 font-semibold text-xs text-black/50'>Progress Analysis</h2>
			<div className='p-8'>
				<Timeline
					pending={
						status.pending && (
							<p className='text-xs font-normal hidden md:block text-emerald-400'>{status.pending}</p>
						)
					}
					reverse={false}
					className='!text-xs !font-semibold flex flex-col gap-3'
					items={status.items.map((item) => ({
						dot: (
							<span className='animate-[wiggle_1s_ease-in-out_forwards]'>
								<BiCheckCircle color='#34d399' size={20} />
							</span>
						),
						children: <p className='text-xs font-semibold hidden md:block'>{item.title}</p>,
					}))}
				/>
			</div>
		</div>
	);
};

export default BuildGNN;
