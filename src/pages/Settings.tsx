import { getUserInfo, updateSetting } from "@/apis/user";
import { SideBar } from "@/components/organims";
import { UserInfo } from "@/types/user";
import { SettingFilled } from "@ant-design/icons";
import { Card, Switch, message } from "antd";
import React, { useEffect, useState } from "react";

const Settings = () => {
	const [info, setInfo] = useState<UserInfo>({});
	const [loading, setLoading] = useState<"GNN" | "ANNOY" | "RESNET" | "CHATBOT" | "">("");

	const onSetting = (type: "GNN" | "ANNOY" | "RESNET" | "CHATBOT", value: boolean) => {
		setLoading(type);
		const upadateData = {
			isAutoBuildGnn: !!info?.isAutoBuildGnn,
			isAutoDetectMaterial: !!info?.isAutoDetectMaterial,
			isAutoBuildAnn: !!info?.isAutoBuildAnn,
			isUseChatBotAi: !!info?.isUseChatBotAi,
		};
		switch (type) {
			case "GNN": {
				upadateData.isAutoBuildGnn = !!value;
				break;
			}
			case "ANNOY": {
				upadateData.isAutoBuildAnn = !!value;
				break;
			}
			case "RESNET": {
				upadateData.isAutoDetectMaterial = !!value;
				break;
			}
			case "CHATBOT": {
				upadateData.isUseChatBotAi = !!value;
				break;
			}
		}
		updateSetting(upadateData)
			.then(({ data }) => {
				setInfo(data);
			})
			.catch(() => {
				message.error("Error setting!.");
			})
			.finally(() => {
				setLoading("");
			});
	};

	useEffect(() => {
		getUserInfo()
			.then(({ data }) => {
				setInfo(data);
			})
			.catch((e) => {
				console.log("e", e);
			});
	}, []);
	return (
		<div className='w-full h-screen !h-[100dvh] overflow-y-auto flex'>
			<SideBar page='settings' />
			<div className='flex-1 bg-neutral-100 h-full p-2 md:p-10'>
				<Card>
					<h2 className='text-xl text-emerald-500 font-bold mb-3'>
						<SettingFilled /> Settings
					</h2>
					<div className='flex flex-col gap-4'>
						<div className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>Auto Build Graph GNN</p>
							<Switch
								checked={!!info.isAutoBuildGnn}
								onChange={(value) => {
									onSetting("GNN", value);
								}}
								loading={loading === "GNN"}
								className='bg-gray-300'
							/>
						</div>
						<div className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>Auto Detect Material Image</p>
							<Switch
								checked={!!info.isAutoDetectMaterial}
								onChange={(value) => {
									onSetting("RESNET", value);
								}}
								loading={loading==='RESNET'}
								className='bg-gray-300'
							/>
						</div>
						<div className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>Auto Build ANN </p>
							<Switch
								checked={!!info.isAutoBuildAnn}
								onChange={(value) => {
									onSetting("ANNOY", value);
								}}
								loading={loading==='ANNOY'}
								className='bg-gray-300'
							/>
						</div>
						<div className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>ChatBot AI</p>
							<Switch
								checked={!!info.isUseChatBotAi}
								onChange={(value) => {
									onSetting("CHATBOT", value);
								}}
								loading={loading==='CHATBOT'}
								className='bg-gray-300'
							/>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Settings;
