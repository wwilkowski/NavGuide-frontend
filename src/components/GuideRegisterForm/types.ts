export interface FormValues {
  languages: string[];
  experience: string;
  description: string;
}

export interface MyFormProps {
  onSubmit: (values: FormValues) => void;
}
