import React, { useState } from 'react';
import { sendAvatarRequest } from '../../containers/Profile/actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../store';
import styles from './AvatarForm.module.scss';
import uploadIcon from '../../assets/icons/uploadIcon.png';

const AvatarForm = () => {
  const dispatcher = useDispatch();
  const currentAvatar = useSelector((state: StoreType) => state.profile.user.avatar);
  const [imageUrl, setImageUrl] = useState(currentAvatar);

  const handleChange = (selectorFiles: FileList | null) => {
    if (selectorFiles != null) {
      setImageUrl(URL.createObjectURL(selectorFiles[0]));
      dispatcher(sendAvatarRequest(selectorFiles[0]));
    }
  };

  return (
    <form className={styles.avatarForm}>
      <img src={imageUrl} alt='avatar' className={styles.avatarForm__img} />
      <label htmlFor='fileInput' className={styles.avatarForm__fileInputLabel}>
        <img src={uploadIcon} alt='' className={styles.avatarForm__icon} />
      </label>
      <input id='fileInput' type='file' onChange={e => handleChange(e.target.files)} className={styles.avatarForm__fileInput} />
    </form>
  );
};

export default AvatarForm;
