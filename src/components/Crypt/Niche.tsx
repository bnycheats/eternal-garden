export const NICHE_WIDTH = 60;

function Niche(props: NicheProps) {
  const { number, handleSelectSlot } = props;
  return (
    <div
      style={{ width: NICHE_WIDTH }}
      onClick={handleSelectSlot}
      className="flex h-10 cursor-pointer items-center justify-center bg-meta-5 font-semibold text-white"
    >
      {number}
    </div>
  );
}

type NicheProps = {
  number: number;
  handleSelectSlot: () => void;
};

export default Niche;
