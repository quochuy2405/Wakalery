import { SideBar } from "@/components/organims";
import { SettingFilled } from "@ant-design/icons";
import { Card, Switch } from "antd";
import React from "react";

const Settings = () => {
	return (
		<div className='w-full h-screen !h-[100dvh] overflow-y-auto flex'>
			<SideBar page='settings' />
			<div className='flex-1 bg-neutral-100 h-full p-10'>
        <Card>
          <h2 className='text-xl text-emerald-500 font-bold mb-3'><SettingFilled/> Settings</h2>
					<div className='flex flex-col gap-4'>
						<div  className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>Auto Build Graph GNN</p>
							<Switch className="bg-gray-300" />
						</div>
						<div className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>Auto Detect Material Image</p>
							<Switch className="bg-gray-300" />
            </div>
            <div  className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>Auto Build ANN </p>
							<Switch className="bg-gray-300" />
						</div>
						<div className='flex items-center justify-between bg-neutral-50 shadow-sm py-4 px-2 rounded-md'>
							<p className='text-sm font-semibold'>ChatBot AI</p>
							<Switch className="bg-gray-300" />
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Settings;
