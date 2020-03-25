import React, { useState, useEffect } from 'react';
import { IAgreementsProps, IAgreementOffer } from '../../../containers/Offers/types';
import TripListElement from '../../TripBrowser/TripListElement';
import { Link } from 'react-router-dom';
import history from '../../../history';
import { useTranslation } from 'react-i18next';

const Agreements = (props: IAgreementsProps) => {
  const { t } = useTranslation();

  const { agreements, verifiedOffers } = props;

  const [filteredAgreements, setFilteredAgreements] = useState<IAgreementOffer[]>([]);

  useEffect(() => {
    if (agreements) setFilteredAgreements(agreements.filter((agr: IAgreementOffer) => agr.status === 'PENDING'));
  }, [agreements]);

  const getDate = (date: string) => {
    return date
      .toString()
      .replace('T', ' ')
      .substr(0, date.toString().indexOf('.'));
  };

  return (
    <div>
      {filteredAgreements &&
        verifiedOffers &&
        filteredAgreements.map((agr: IAgreementOffer) => (
          <div key={agr.id}>
            <TripListElement trip={agr.offer} />
            <Link to={`/guides/${agr.offer.owner.guideId}`}>
              {t('Check guide profile with ID')} {agr.offer.owner.guideId}
            </Link>
            <p>
              {t('Planned date')}: {getDate(agr.plannedDate)}
            </p>
            <button
              onClick={() =>
                history.push(`/agreement/${agr.id}`, {
                  pathFrom: '/profile'
                })
              }
            >
              {t('See more')}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Agreements;
