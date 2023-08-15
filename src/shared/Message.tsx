import styles from './Message.module.scss';
import botAvatar from '@/icons/bot-avatar.svg';
import userAvatar from '@/icons/my-avatar.svg';
import { IMessage } from './IMessage';

const Message = ({ userMessage, value }: IMessage) => {
	if (userMessage) {
		return (
			<div className={styles.userMessage}>
				{value && <p className={styles.userText}>{value}</p>}
				<img src={userAvatar} alt='User' className={styles.avatar} draggable={false} />
			</div>
		);
	} else {
		return (
			<div className={styles.message}>
				<img src={botAvatar} alt='Bot' className={styles.avatar} draggable={false} />
				{value && <p className={styles.text}>{value}</p>}
			</div>
		);
	}
};

export default Message;
