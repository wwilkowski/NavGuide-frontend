import React, { useState, useEffect, useRef } from 'react';
import { Avatar, Typography, Button, makeStyles } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
  container: {
    height: '75vh',
    padding: '0 1rem',
    position: 'relative',
  },
  list: {
    padding: '0 1rem',
    overflowY: 'scroll',
    maxHeight: '60vh',
  },
  item: {
    margin: '1rem 0',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  selfMessageContainer: {
    flexDirection: 'row-reverse',
  },
  message: {
    padding: '1rem',
    backgroundColor: '#e1e3ff',
    borderRadius: '30px',
    margin: '0 1rem',
  },
  selfMessage: {
    color: '#ffffff',
    backgroundColor: '#7781ff',
  },
  input: {
    padding: '1rem',
    width: '100%',
  },
  actions: {
    display: 'flex',
    width: '100%',
    padding: '1rem',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

interface ShortUser {
  avatar: string;
  id: number;
}

interface Message {
  author: ShortUser;
  date: Date;
  description: string;
  id: number;
}

interface Props {
  messages: Message[] | undefined;
  mode: string;
  userId: number;
  purchaseId: number;
  onSend: (message: string, id: number) => void;
}

const Chat = ({ messages, userId, purchaseId, onSend }: Props) => {
  const {t} = useTranslation();
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const send = () => {
    onSend(message, purchaseId);
    setMessage('');
  };

  const ref = useRef<HTMLUListElement | null>(null);

  const scrollTo = (ref: any) => (ref.current.scrollTop = ref.current.scrollHeight);

  useEffect(() => {
    if (ref) {
      scrollTo(ref);
    }
  }, [ref, messages]);

  return (
    <div className={classes.container}>
      <Typography variant='h2'>{t('Chat')}</Typography>
      <ul className={classes.list} ref={ref}>
        {messages &&
          messages.map((message) => (
            <li key={message.id} className={classes.item}>
              <div className={`${classes.messageContainer} ${message.author.id === userId && classes.selfMessageContainer}`}>
                <Avatar src={message.author.avatar} />
                <Typography variant='body1' className={`${classes.message} ${message.author.id === userId && classes.selfMessage}`}>
                  {message.description}
                </Typography>
              </div>
            </li>
          ))}
      </ul>
      <div className={classes.actions}>
        <input type='text' value={message} placeholder={t('Write your message')} onChange={onInput} className={classes.input} />
        <Button variant='contained' color='primary' endIcon={<SendIcon />} onClick={send}>
          {t('Send')}
        </Button>
      </div>
    </div>
  );
};

export default Chat;
