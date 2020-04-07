import { store } from 'react-notifications-component';

export const showNotification = (type: string, title: string, message: string) => {
  store.addNotification({
    title: title,
    message: message.length ? message : '',
    type: type,
    insert: 'top',
    container: 'bottom-center',
    width: 400,
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
  });
};
