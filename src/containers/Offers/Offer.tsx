import React, { useEffect } from 'react';
import TripInfo from '../../components/TripInfo/TripInfo';
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from '../../store';
import { RouteComponentProps } from 'react-router';
import { getOfferByIdRequest } from './actions';
import { fetchGuideProfileDataRequest, fetchGuideProfileRequested } from '../GuideProfile/actions';

type TParams = { id: string };

interface Props extends RouteComponentProps<TParams> {}

const Offer = (props: Props) => {
  const dispatcher = useDispatch();
  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);
  const guideProfile = useSelector((state: StoreType) => state.guideProfile.guideProfile);

  useEffect(() => {
    dispatcher(getOfferByIdRequest(props.match.params.id));
  }, [dispatcher, props.match.params.id]);

  useEffect(() => {
    if (currentOffer) {
      dispatcher(fetchGuideProfileRequested(currentOffer.owner.guideId));
      dispatcher(fetchGuideProfileDataRequest(currentOffer.owner.userId));
    }
  }, [dispatcher, currentOffer]);

  return (
    <div>
      {currentOffer && <TripInfo tripInformations={currentOffer} guideProfile={guideProfile} guideProfileData={guideProfileData} />}
    </div>
  );
};

export default Offer;
