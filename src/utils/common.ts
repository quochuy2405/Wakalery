/* eslint-disable @typescript-eslint/no-explicit-any */
import { PixelCrop } from "react-image-crop";
import { FOLDER_PREFIX } from "../constants";
import { unauth } from "@/apis/axios";

const lightColorPalette = [
	"#F9B572",
	"#FFDFDF",
	"#B3A492",
	"#00A9FF",
	"#89CFF3",
	"#2192FF",
	"#45FFCA",
	"#FF8787",
	"#7EAA92",
	"#9ED2BE",
	"#FFD9B7",
	"#967E76",
	"#9BABB8",
	"#EEE3CB",
	"#D7C0AE",
	"#C4DFDF",
	"#FF6969",
	"#3A98B9",
];

export function getRandomColor() {
	return lightColorPalette[Math.floor(Math.random() * lightColorPalette.length)];
}

export function bytesToGB(bytes: number) {
	const gigabyte = Math.pow(2, 30);
	return Number((bytes / gigabyte).toFixed(2));
}

export const arrayToTree = (folders: Array<string>, prefix: string) => {
	const tree = {};

	folders.forEach((path) => {
		// Remove the specified prefix
		const pathWithoutPrefix = path.startsWith(prefix) ? path.substring(prefix.length) : path;

		const pathParts = pathWithoutPrefix.split("/");
		let currentLevel: any = tree;

		pathParts.forEach((folder, index) => {
			if (!currentLevel[folder]) {
				currentLevel[folder] = index === pathParts.length - 1 ? null : {};
			}
			currentLevel = currentLevel[folder];
		});
	});

	return tree;
};
export const getObjectByPath = (path: string, tree: object) => {
	const pathParts = path.split("/");
	console.log("pathParts", pathParts);
	let currentLevel: any = { ...tree };

	for (const folder of pathParts) {
		console.log("folder", folder);
		console.log("currentLevel", currentLevel?.[folder]);
		if (currentLevel?.[folder] === null) {
			return currentLevel;
		}
		currentLevel = currentLevel?.[folder];
	}

	return currentLevel; // Return null if the path is not found
};

export const refactorPath = (directory: string, name: string) => {
	const dir = FOLDER_PREFIX + [directory, name].join("/");
	const regex = /\/+/g;
	return dir.replaceAll(regex, "/");
};
export const onDownload = async (src: string, onProgress: (percent: number) => void) => {
	await unauth()
		.get(src, {
			responseType: "arraybuffer",
			onDownloadProgress: function (progressEvent: any) {
				if (progressEvent) {
					// Calculate the percentage of completion
					const percentage = (progressEvent.loaded / progressEvent.total) * 100;

					// Call the provided onProgress callback with the percentage
					onProgress(percentage);
				}
			},
		})
		.then(({ data }) => {
			// Create a Blob object from the received data
			const url = URL.createObjectURL(new Blob([data]));

			// Extract the filename from the 'src' URL
			const filename = src.split("/").pop() + ".png" || "image.png";

			// Create a link element
			const link = document.createElement("a");

			// Set the link's href to the Object URL
			link.href = url;

			// Set the download attribute to specify the filename
			link.download = filename;

			// Programmatically click the link to trigger the download
			link.click();

			// Revoke the Object URL to free up resources
			URL.revokeObjectURL(url);

			// Remove the link element from the DOM
			link.remove();
		});
};
export async function canvasPreviewToBlob(
	image: HTMLImageElement,
	canvas: HTMLCanvasElement,
	crop: PixelCrop
): Promise<Blob> {
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("No 2d context");
	}

	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	const pixelRatio = window.devicePixelRatio;

	canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
	canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

	ctx.scale(pixelRatio, pixelRatio);
	ctx.imageSmoothingQuality = "high";

	const cropX = crop.x * scaleX;
	const cropY = crop.y * scaleY;

	const centerX = image.naturalWidth / 2;
	const centerY = image.naturalHeight / 2;

	ctx.save();

	ctx.translate(-cropX, -cropY);
	ctx.translate(centerX, centerY);
	ctx.translate(-centerX, -centerY);
	ctx.drawImage(
		image,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight
	);

	ctx.restore();

	const blob = await new Promise<Blob>((resolve) => {
		canvas.toBlob((b) => {
			if (!b) {
				throw new Error("Failed to convert canvas to blob");
			}
			resolve(b);
		}, "image/png");
	});

	return blob;
}
