import React, { useState } from 'react';
import { Avatar, Typography, Grid, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch } from 'react-redux';
import { sendMessageRequest } from '../containers/Offers/actions';

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
}

const Chat = ({ messages, userId, purchaseId }: Props) => {
  const [message, setMessage] = useState('');
  const dispatcher = useDispatch();

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSend = () => {
    dispatcher(sendMessageRequest(message, purchaseId));
  };

  return (
    <div>
      <h2>Chat</h2>
      <ul>
        {messages &&
          messages.map(message => (
            <li key={message.id}>
              <Grid container direction={message.author.id === userId ? 'row-reverse' : 'row'}>
                <Grid item xs={3}>
                  <Avatar src={message.author.avatar} />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant='body1'>{message.description}</Typography>
                </Grid>
              </Grid>
            </li>
          ))}
        <input type='text' value={message} onChange={onInput} />
        <Button variant='contained' color='primary' endIcon={<SendIcon />} onClick={onSend}>
          Send
        </Button>
      </ul>
      <h2>Liczba wiadomości: {messages ? messages.length : 0}</h2>
    </div>
  );
};

export default Chat;
