/* eslint-disable @typescript-eslint/no-explicit-any */
import { SideBar } from "@/components/organims";
import { Card, Col, Row } from "antd";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend);
let delayed = false;

const options = {
	plugins: {
		title: {
			display: true,
			text: "Classification For Each Month",
		},
	},
	responsive: true,
	options: {
		animation: {
			onComplete: () => {
				delayed = true;
			},
			delay: (context: any) => {
				let delay = 0;
				if (context.type === "data" && context.mode === "default" && !delayed) {
					delay = context.dataIndex * 300 + context.datasetIndex * 100;
				}
				return delay;
			},
		},
	},
	actions: {
		name: "Randomize",
		handler(chart: any) {
			chart.data.datasets.forEach((dataset: any) => {
				dataset.data = [100, 200, 300];
			});
			chart.update();
		},
	},
	scales: {
		x: {
			stacked: true,
		},
		y: {
			stacked: true,
		},
	},
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
	labels,
	datasets: [
		{
			label: "Chân dung",
			data: [100, 4000, 5000],
			backgroundColor: "rgb(255, 99, 132)",
		},
		{
			label: "Phong cảnh",
			data: [100, 4000, 5000],
			backgroundColor: "rgb(75, 192, 192)",
		},
		{
			label: "Nghệ thuật",
			data: [100, 4000, 5000],
			backgroundColor: "rgb(53, 162, 235)",
		},
	],
};

const dataPie = {
	labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderColor: [
				"rgba(255, 99, 132, 1)",
				"rgba(54, 162, 235, 1)",
				"rgba(255, 206, 86, 1)",
				"rgba(75, 192, 192, 1)",
				"rgba(153, 102, 255, 1)",
				"rgba(255, 159, 64, 1)",
			],
			borderWidth: 1,
		},
	],
};

const Analytics = () => {
	return (
		<div className='w-full h-screen flex overflow-hidden'>
			<SideBar page='analytics' />
			<div className='flex-1 bg-neutral-50 h-screen overflow-y-auto flex-col gap-1 flex p-10'>
				<Row gutter={4}>
					<Col span={8}>
						<Card className='w-full h-full'>
							<Pie data={dataPie} />
						</Card>
					</Col>

					<Col span={16}>
						<div className='h-full w-full bg-white p-4 rounded-md border'>
							{/* <GraphEdges /> */}
						</div>
					</Col>
				</Row>
				<Row gutter={4}>
					<Col span={24}>
						<Card>
							<Bar options={options} data={data} />;
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Analytics;