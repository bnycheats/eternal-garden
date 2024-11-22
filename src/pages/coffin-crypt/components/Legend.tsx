function Legend() {
  return (
    <div className="top-0 float-right -mt-8 flex items-center gap-2">
      <span>Legend:</span>
      <div className="flex">
        <div className="bg-meta-1 px-2 py-1 text-sm text-white">OCCUPIED</div>
        <div className="bg-meta-5 px-2 py-1 text-sm text-white">VACANT</div>
      </div>
    </div>
  );
}

export default Legend;
