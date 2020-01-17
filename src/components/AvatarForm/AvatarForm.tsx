import React, { useState } from 'react';
import { sendAvatarRequest } from '../../containers/Profile/actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../store';

const AvatarForm = () => {
  const dispatcher = useDispatch();
  const currentAvatar = useSelector((state: StoreType) => state.profile.user.avatar);
  const [imageUrl, setImageUrl] = useState(currentAvatar);
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);

  const handleChange = (selectorFiles: FileList | null) => {
    if (selectorFiles != null) {
      setImageUrl(URL.createObjectURL(selectorFiles[0]));
      setFileToUpload(selectorFiles[0]);
    }
  };

  const handleClick = () => {
    if (fileToUpload) {
      dispatcher(sendAvatarRequest(fileToUpload));
    }
  };

  return (
    <form>
      <img src={imageUrl} alt='avatar' style={{ width: '200px', height: '200px' }} />
      <button type='button' onClick={handleClick}>
        Upload image
      </button>
      <input type='file' onChange={e => handleChange(e.target.files)} />
    </form>
  );
};

export default AvatarForm;
