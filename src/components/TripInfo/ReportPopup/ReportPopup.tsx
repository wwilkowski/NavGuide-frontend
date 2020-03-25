import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ReportPopup.module.scss';
import { IReportPopupProps } from './types';
import { showNotification } from '../../../helpers/notification';
import { reportOfferRequest } from '../../../containers/Offers/actions';
import { useDispatch } from 'react-redux';

const ReportPopup = (props: IReportPopupProps) => {
  const { t } = useTranslation();

  const { trip } = props;

  const dispatcher = useDispatch();

  const [description, setDescription] = useState<string>('');

  const wrapperRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        props.changeVisibility();
      }
    };

    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.popup} ref={wrapperRef}>
        <div className={styles.popup__content}>
          <h2 style={{ margin: 'auto' }}>Zgłaszanie oferty:</h2>
          <h2 style={{ margin: 'auto' }}>{trip.name}</h2>
          <textarea
            style={{ width: '60%', height: '50%' }}
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          />
          <button
            onClick={() => {
              if (description === '') {
                showNotification('warning', 'Warning', 'Description can not be empty');
              } else if (description.length < 10) {
                showNotification('warning', 'Warning', 'Min number of characters is 10');
              } else {
                dispatcher(reportOfferRequest(trip.id, description));
                props.changeVisibility();
              }
            }}
            style={{ width: '50%' }}
          >
            {t('Send')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;
