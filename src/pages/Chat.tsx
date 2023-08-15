import { IMessage, Status } from '@/shared/IMessage';
import styles from './Chat.module.scss';
import sendIcon from '@/icons/send-button.svg';
import Message from '@/shared/Message';
import axios from 'axios';
import { useState } from 'react';

const inputPlaceholder = 'Start typing here...';

const url = 'http://185.46.8.130/api/v1/chat/send-message';

const Chat = () => {
	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<IMessage[]>([]);

	const send = async () => {
		setMessages((prev) => [
			...prev,
			{
				userMessage: true,
				status: Status.done,
				value: message,
			},
		]);

		setMessage('');

		try {
			const response = await axios.post(
				url,
				{
					message: message,
				},
				{
					responseType: 'arraybuffer',
				},
			);

			const chunk = new Uint8Array(response.data);
			const decodedChunk = new TextDecoder().decode(chunk);
			const json = decodedChunk.split('}{').join('},{');
			const parse = `[${json}]`;
			const messageObjects = JSON.parse(parse);

			const newMessage: IMessage = {
				status: Status.content,
				value: '',
			};

			messageObjects.map((object: IMessage) => {
				if (object.value) {
					newMessage.value += object.value;
					newMessage.status = object.status;
				}
			});

			setMessages((prev) => [...prev, newMessage]);
		} catch (error) {
			console.error('Error fetching chunks:', error);
		}
	};

	const resizeInput = (element: HTMLTextAreaElement) => {
		const el = element;

		setMessage(element.value);
		el.style.height = '22px';
		const height = el.scrollHeight;
		el.style.height = `${height}px`;
	};

	return (
		<div className={styles.chatPage}>
			<div className={styles.container}>
				<h1 className={styles.title}>Bot Chat</h1>
				<h2 className={styles.subtitle}>AI-based service</h2>
				<div className={styles.chat}>
					{messages.length === 0 && <p className={styles.empty}>Пусто</p>}
					{messages.length > 0 &&
						messages.map((message, index) => <Message {...message} key={index} />)}
				</div>
				<div className={styles.inputField}>
					<textarea
						className={styles.input}
						value={message}
						placeholder={inputPlaceholder}
						onChange={(event) => {
							setMessage(event.target.value);
							resizeInput(event.target);
						}}
					/>
					<button className={styles.sendButton} type='button' onClick={send}>
						<img src={sendIcon} alt='Send' className={styles.sendIcon} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
