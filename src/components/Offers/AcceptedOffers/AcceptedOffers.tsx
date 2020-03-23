import React, { useState, useEffect } from 'react';
import { IAcceptedOffersProps, IAgreementOffer } from '../../../containers/Offers/types';
import TripListElement from '../../TripBrowser/TripListElement';
import { useSelector } from 'react-redux';
import { StoreType } from '../../../store';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AcceptedOffers = (props: IAcceptedOffersProps) => {
  const { t } = useTranslation();

  const { agreements } = props;

  const location = useLocation();

  const user = useSelector((state: StoreType) => state.profile.user);

  const [filteredAgreements, setFilteredAgreements] = useState<IAgreementOffer[]>([]);

  useEffect(() => {
    const tmp: IAgreementOffer[] = [];
    if (agreements) {
      agreements.forEach((agr: IAgreementOffer) => {
        if (agr.status === 'ACCEPTED') tmp.push(agr);
      });

      if (user.role && location.pathname === '/profile')
        setFilteredAgreements(tmp.filter((agr: IAgreementOffer) => agr.offer.owner.userId !== user.id));

      if (user.role && location.pathname === '/profile/guide') setFilteredAgreements(tmp);
    }
  }, [agreements, location.pathname, user.id, user.role]);

  const getDate = (date: string) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  return (
    <div>
      {filteredAgreements.map((agr: IAgreementOffer) => (
        <div key={agr.id}>
          <TripListElement trip={agr.offer} />
          {user.role === 'GUIDE' && (
            <Link to={`/users/${agr.traveler.id}`}>
              {t('Check user profile with ID')} {agr.traveler.id}
            </Link>
          )}
          {user.role === 'TRAVELER' && (
            <Link to={`/guides/${agr.offer.owner.guideId}`}>
              {t('Check guide profile with ID')} {agr.offer.owner.guideId}
            </Link>
          )}

          <p>
            {t('Planned date')}: {getDate(agr.plannedDate)}
          </p>
          <p>
            {t('Price')}: {agr.price}
          </p>
          <p>{t('Description')}:</p>
          <p>{agr.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AcceptedOffers;
