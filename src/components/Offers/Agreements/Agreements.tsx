import React, { useState, useEffect } from 'react';
import { IAgreementsProps, IAgreementOffer } from '../../../containers/Offers/types';
import TripListElement from '../../TripBrowser/TripListElement';

const Agreements = (props: IAgreementsProps) => {
  const { agreements, verifiedOffers, onAgreementButtonClick } = props;

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
            <p>Planowana data: {getDate(agr.plannedDate)}</p>
            <p>Opis:</p> <p>{agr.description}</p>
            <button onClick={() => onAgreementButtonClick(agr.id, 'ACCEPT')}>Zaakceptuj</button>
            <button onClick={() => onAgreementButtonClick(agr.id, 'REJECT')}>Odrzuć</button>
          </div>
        ))}
    </div>
  );
};

export default Agreements;
