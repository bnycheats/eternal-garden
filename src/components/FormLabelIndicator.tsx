function FormLabelIndicator(props: FormLabelIndicatorProps) {
  const { isOptional } = props;
  if (isOptional) {
    return <span>(optional)</span>;
  }
  return <span className="text-destructive">*</span>;
}

type FormLabelIndicatorProps = {
  isOptional: boolean;
};

export default FormLabelIndicator;
