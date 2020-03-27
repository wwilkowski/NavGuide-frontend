export interface IRateOfferFormValues {
  offerId: number;
  scoreOffer: number;
  scoreGuide: number;
  comment: string;
}

export interface IRateOfferFormProps {
  offerId: number;
  onSubmit: (feedback: IRateOfferFormValues) => void;
}
