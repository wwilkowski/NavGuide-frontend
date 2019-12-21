import { store } from 'react-notifications-component';

export const showNotification = (type: string, title: string, message: string) => {
  store.addNotification({
    title: title,
    message: message.length ? message : '...',
    type: type,
    insert: 'top',
    container: 'top-right',
    dismiss: {
      duration: 0,
      onScreen: true
    }
  });
};
