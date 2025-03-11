import { getModels, wikipedia } from "@/apis/wikipedia";
import Functions from "@/components/chat/input/Functions";
import TextArea from "@/components/chat/input/Textarea";
import Upload from "@/components/chat/input/Upload";
import { MessageProps, MessageRole } from "@/components/chat/message";
import { Form } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useRef, useState } from "react";
import Submit from "@/components/chat/input/Submit";

const useStyles = createStyles(({ css, token }) => ({
	container: css`
		position: relative;
		padding-bottom: 1rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	`,
	form: css`
		position: relative;
		border-radius: 1.5rem;
		background-color: var(--background-color);
		box-shadow: ${token.boxShadow};
	`,
	textarea: css`
		padding-bottom: 3rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	`,
	buttons: css`
		max-width: 100%;
		border-color: transparent;
		border-width: 2px;
		padding: 0.75rem;
		position: absolute;
		gap: 0.375rem;
		display: flex;
		left: 0;
		right: 0;
		bottom: 0;
		button {
			height: 36px;
		}
	`,
}));

const Input = ({
	setMessages,
}: {
	setMessages: (
		messageCreator: (prevMessages: MessageProps[]) => MessageProps[]
	) => void;
}) => {
	const initialLocalValues = {
		message: "",
		model: "deepseek",
		image: null,
		thinking: false,
		models: {},
	};
	const abort = useRef<AbortController | null>(null);
	const [generating, setGenerating] = useState(false);
	const [form] = Form.useForm();

	const { styles } = useStyles();

	const selectModel = (): string => {
		const { model, models, thinking } = form.getFieldsValue([
			"model",
			"models",
			"thinking",
		]);
		if (thinking) {
			return models[model].reasoner_model;
		}
		return models[model].chat_model;
	};

	const onFinish = async (_: any) => {
		const { message, model, image } = form.getFieldsValue(true);
		if (message.trim() === "" || abort.current !== null || generating) {
			return;
		}
		setGenerating(true);
		abort.current = new AbortController();
		const randomId = Date.now();

		setMessages((prev) => [
			...prev,
			{
				id: randomId.toString(),
				role: MessageRole.USER,
				content: message,
			},
		]);

		form.setFieldValue("message", "");
		const assistantMessageId = (randomId + 1).toString(); // 确保 ID 唯一
		setMessages((prev) => [
			...prev,
			{
				id: assistantMessageId,
				role: MessageRole.ASSISTANT,
				content: "",
				loading: true,
			},
		]);

		try {
			await wikipedia(
				model,
				selectModel(),
				message,
				image,
				(resp) => {
					if (resp.length == 0) return;
					setMessages((prevMessages) => {
						const lastId = prevMessages.findIndex(
							(msg) => msg.id === assistantMessageId
						);
						if (lastId === -1) return prevMessages;
						const messages = [...prevMessages];
						messages[lastId] = {
							...messages[lastId],
							content: resp,
							loading: false,
						};
						return messages;
					});
				},
				abort.current.signal
			);
		} catch (error: any) {
			console.log("error", error);
		} finally {
			abort.current = null;
			setGenerating(false);
		}
	};

	const abortGenerating = () => {
		abort.current?.abort();
		abort.current = null;
		setGenerating(false);
	};

	useEffect(() => {
		getModels().then((res) => {
			form.setFieldsValue({
				...initialLocalValues,
				model: Object.keys(res.data)[0],
				models: res.data,
			});
		});
	}, []);

	return (
		<div className={styles.container}>
			<Form
				form={form}
				className={styles.form}
				onFinish={onFinish}
				initialValues={initialLocalValues}
			>
				<div className={styles.textarea}>
					<Form.Item noStyle name="message">
						<TextArea />
					</Form.Item>
				</div>
				<div className={styles.buttons}>
					<Form.Item noStyle name="image" valuePropName="fileList">
						<Upload />
					</Form.Item>
					<Form.Item noStyle name="model">
						<Functions />
					</Form.Item>
					<Form.Item noStyle label={null}>
						<Submit
							generating={generating}
							onSubmit={() => form.submit()}
							onStop={abortGenerating}
						/>
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

export default Input;
