function InfoBox(props: InfoBoxProps) {
  const { count, title } = props;
  return (
    <div className="py-6 text-center">
      <div className="font-semibold">{count}</div>
      <div className="-mt-1 text-sm">{title}</div>
    </div>
  );
}

type InfoBoxProps = {
  count: number;
  title: string;
};

export default InfoBox;
