import React from 'react';
import { IAgreementOffer } from '../containers/Offers/types';

interface Props {
  agreement?: IAgreementOffer;
}

const AgreementInfo = ({ agreement }: Props) => {
  console.log('agr: ', agreement);
  return (
    <>
      <p>Data: {agreement && agreement.plannedDate}</p>
      <p>Cena: {agreement && agreement.price}</p>
      <p>Opis: {agreement && agreement.description}</p>
    </>
  );
};

export default AgreementInfo;
