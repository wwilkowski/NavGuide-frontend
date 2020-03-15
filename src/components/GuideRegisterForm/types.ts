export interface FormValues {
  languages: string[];
  experience: number;
  description: string;
}

export interface MyFormProps {
  onSubmit: (values: FormValues) => void;
}
