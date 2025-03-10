import { useEffect, useState } from "react";
import { Model } from "@/apis/wikipedia";
import { Select as AntdSelect, SelectProps } from "antd";

const Select = ({
	model,
	setModel,
	models,
}: {
	model: string;
	models: Record<string, Model>;
	setModel: (model: string) => void;
}) => {
	const [options, setOptions] = useState<SelectProps["options"]>([]);

	useEffect(() => {
		setOptions(
			Object.keys(models).map((key) => ({
				label: key,
				value: key,
			}))
		);
		setModel(Object.keys(models)[0]);
	}, [models]);

	return (
		<AntdSelect
			style={{
				minWidth: "200px",
				height: "36px",
				maxWidth: "300px",
				borderRadius: "9999px",
			}}
			options={options}
			value={model}
			onChange={(value) => {
				setModel(value);
			}}
		/>
	);
};

export default Select;
