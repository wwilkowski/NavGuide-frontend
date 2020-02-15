import React from 'react';
import { IListGuideRequestProps } from './types';
import * as types from '../../containers/AdminPanel/types';
import { useTranslation } from 'react-i18next';

//naprawic doswiadczenie

const ListGuideRequests = (props: IListGuideRequestProps) => {
  const { guideRequests } = props;
  const { t } = useTranslation();

  return (
    <ul>
      {guideRequests.map((req: types.IGuideRequest, index: number) => (
        <li key={req.id}>
          <div>
            <h2>
              {t('ID')}: {req.id}
              {` `}
              {req.status}
            </h2>
            <div>
              <p>
                {t('Date')}: {req.date}
              </p>
              <p>{t('Experience')}: *****</p>
              <p>{req.description}</p>
              <p>
                {t('Languages')}: {req.languages.map((lng: string) => `${lng} `)}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListGuideRequests;
