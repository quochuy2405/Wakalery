import { Button, Divider, Input, InputRef, Select, Space } from "antd";
import React, { useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
interface InputTagProps {
	onChange?: (value: Array<string>) => void;
	value?: Array<string>;
}
const InputTag: React.FC<InputTagProps> = ({ value, onChange }) => {
	const [items, setItems] = useState(["tree", "cat", "person", "hat"]);
	const [name, setName] = useState("");
	const inputRef = useRef<InputRef>(null);

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
		e.preventDefault();
		setItems([...items, name]);
		setName("");
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};
	return (
		<Select
			style={{ width: 300 }}
			placeholder='Enter tags'
			mode='multiple'
			onChange={onChange}
			value={value}
			dropdownRender={(menu) => (
				<>
					{menu}
					<Divider style={{ margin: "8px 0" }} />
					<Space style={{ padding: "0 8px 4px" }}>
						<Input
							placeholder='Please enter tag'
							ref={inputRef}
							value={name}
							onChange={onNameChange}
							className='!border !border-emerald-400'
							onKeyDown={(e) => e.stopPropagation()}
						/>
						<Button type='text' icon={<BsPlus />} onClick={addItem}>
							Add item
						</Button>
					</Space>
				</>
			)}
			options={items.map((item) => ({ label: item, value: item }))}
			allowClear
		/>
	);
};

export default InputTag;
