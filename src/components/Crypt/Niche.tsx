export const NICHE_WIDTH = 60;

function Niche(props: NicheProps) {
  const { number } = props;
  return (
    <div
      style={{ width: NICHE_WIDTH }}
      className="flex h-10 items-center justify-center bg-meta-5 font-semibold text-white"
    >
      {number}
    </div>
  );
}

type NicheProps = {
  number: number;
};

export default Niche;
