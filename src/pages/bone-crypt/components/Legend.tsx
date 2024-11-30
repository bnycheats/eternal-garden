function Legend() {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span>Legend:</span>
      <div className="flex">
        <div className="bg-meta-3 px-2 py-1 text-sm text-white">FULL</div>
        <div className="bg-meta-1 px-2 py-1 text-sm text-white">OCCUPIED</div>
        <div className="bg-meta-5 px-2 py-1 text-sm text-white">VACANT</div>
      </div>
    </div>
  );
}

export default Legend;
