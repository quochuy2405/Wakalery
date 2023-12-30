import React, { useState, useEffect } from "react";
interface TypeWriterProps {
	text: string;
	delay: number;
}
const TypeWriter: React.FC<TypeWriterProps> = ({ text, delay }) => {
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setCurrentText((prevText) => prevText + text[currentIndex]);
				setCurrentIndex((prevIndex) => prevIndex + 1);
			}, delay);

			return () => clearTimeout(timeout);
		}
	}, [currentIndex, delay, text]);

	return <pre className='w-full h-fit p-2 rounded-lg animate-typing whitespace-pre-line'>{currentText}</pre>;
};

export default TypeWriter;
