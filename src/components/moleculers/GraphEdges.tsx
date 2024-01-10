/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { GraphView } from "react-digraph";
import { getGraphRNN } from "../../apis/graph-rnn";

const NODE_KEY = "id"; // Allows D3 to correctly update DOM
const GraphEdges = () => {
	const [graph, setGraph] = useState({
		edges: [],
		nodes: [],
	});

	const GraphConfig = {
		NodeTypes: {
			node: {
				typeText: "Image Related",
				shapeId: "#node",
				shape: (
					<symbol viewBox='0 0 100 100' id='node' key='0'>
						<circle cx='50' cy='50' r='45' fill='#00DFA2'></circle>
					</symbol>
				),
			},
			nodecrop: {
				typeText: "Face Detect",
				shapeId: "#nodecrop",
				shape: (
					// <svg id='nodecrop' viewBox='0 0 160 40' xmlns='http://www.w3.org/2000/svg'>
					<symbol viewBox='0 0 60 60' id='nodecrop' key='0'>
						<defs>
							<clipPath id='circleClip'>
								<circle cx='30' cy='30' r='30' />
							</clipPath>
						</defs>
						<image
							href='https://cdn.vox-cdn.com/thumbor/MbYxeyxG82sFlibdnv9Br1aCLg8=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/24395697/bkq6gtrpcnw43vsm5zm62q3z.png'
							className='object-contain rounded-full overflow-hidden h-full w-full'
							clipPath='url(#circleClip)'
						/>
					</symbol>
				),
			},
		},
		NodeSubtypes: {},
		EdgeTypes: {
			emptyEdge: {
				shapeId: "#emptyEdge",
				shape: (
					<symbol viewBox='0 0 50 50' id='emptyEdge' key='0'>
						<circle cx='10' cy='10' r='0' fill='#F05941'></circle>
					</symbol>
				),
			},
		},
	};
	const [config, setConfig] = useState(GraphConfig.NodeTypes);
	const NodeSubtypes = GraphConfig.NodeSubtypes;
	const EdgeTypes = GraphConfig.EdgeTypes;

	const fetch = async () => {
		await getGraphRNN("1").then(({ data }: any) => {
			console.log("data", data);
			const radius = data.nodes.length * 25; // Adjust the radius of the circle as needed
			const centerX = data.nodes.length * 100; // Adjust the x-coordinate of the circle center
			const centerY = data.nodes.length * 100; // Adjust the y-coordinate of the circle center
			let NodeTypes = { ...config };
			const nodes = data.nodes.map((item: any, index: any) => {
				const angle = (index / data.nodes.length) * 2 * Math.PI; // Calculate the angle based on the index
				const x = centerX + radius * Math.cos(angle);
				const y = centerY + radius * Math.sin(angle);
				const isNode = item.node.includes("face");
				const keyNode = isNode ? "nodemain" : "noderelated";
				const typeText = isNode ? "Faces" : "Related image";

				// const url = isNode ? IMAGE_PREFIX_CROP + "1/" + item.node : IMAGE_PREFIX + "1/" + item.node;
				NodeTypes = {
					...NodeTypes,
					[keyNode + index]: {
						typeText,
						shapeId: `#${keyNode}${index}`,
						shape: (
							// <svg id='nodecrop' viewBox='0 0 160 40' xmlns='http://www.w3.org/2000/svg'>
							<symbol viewBox='0 0 30 30' id={keyNode + index} key={index}>
								<defs>
									<clipPath id={`circleClip${index}`}>
										<circle cx='15' cy='15' r={isNode ? "15" : "18"} />
									</clipPath>
								</defs>
								{/* <image
									href={url}
									className='object-contain rounded-full overflow-hidden w-full h-full'
									clipPath={`url(#circleClip${index})`}
								/> */}
							</symbol>
						),
					},
				};

				return {
					id: index,
					title: item.node,
					x,
					y,
					type: keyNode + index,
				};
			});
			setConfig(NodeTypes);

			const edges: any = data.edges.map((item: any) => {
				const _temp = item.edge
					.replaceAll("(", "")
					.replaceAll(")", "")
					.replaceAll("'", "")
					.replaceAll(" ", "")
					.replaceAll("'", "")
					.split(",");
				const target = nodes.findIndex((item: any) => item.title === _temp[1]);
				const source = nodes.findIndex((item: any) => item.title === _temp[0]);
				const edge = {
					source: source,
					target: target,
					type: "emptyEdge",
				};

				return edge;
			});
			setGraph({ edges, nodes });
		});
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<div className='w-full h-full'>
			<GraphView
				nodeKey={NODE_KEY}
				nodes={graph.nodes}
				edges={graph.edges}
				edgeArrowSize={1}
				minZoom={0}
				nodeTypes={config}
				nodeSubtypes={NodeSubtypes}
				edgeTypes={EdgeTypes}
			/>
		</div>
	);
};
export default GraphEdges;
