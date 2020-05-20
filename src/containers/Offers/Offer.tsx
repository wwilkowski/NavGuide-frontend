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
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const currentOffer = useSelector((state: StoreType) => state.currentOfferReducer.offer);
  const guideProfileData = useSelector((state: StoreType) => state.guideProfile.guideProfileData);
  const guideProfile = useSelector((state: StoreType) => state.guideProfile.guideProfile);

  useEffect(() => {
    dispatcher(getOfferByIdRequest(props.match.params.id, isLogged));
  }, [dispatcher, props.match.params.id, isLogged]);

  useEffect(() => {
    if (currentOffer && isLogged) {
      dispatcher(fetchGuideProfileRequested(currentOffer.owner.guideId));
      dispatcher(fetchGuideProfileDataRequest(currentOffer.owner.userId));
    }
  }, [dispatcher, currentOffer, isLogged]);

  return (
    <div>
      {currentOffer && <TripInfo tripInformations={currentOffer} guideProfile={guideProfile} guideProfileData={guideProfileData} />}
    </div>
  );
};

export default Offer;
