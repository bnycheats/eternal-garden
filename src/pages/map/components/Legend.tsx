function Legend() {
  const status = [
    {
      title: 'Coffin Crypt',
      color: 'bg-meta-5',
    },
    {
      title: 'Bone Crypt',
      color: 'bg-meta-1',
    },
    {
      title: 'Mausoleum',
      color: 'bg-meta-3',
    },
    {
      title: 'Lawn',
      color: 'bg-meta-8',
    },
    {
      title: 'Common Area',
      color: 'bg-meta-4',
    },
    {
      title: 'Annex',
      color: 'bg-[blueviolet]',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 pb-4">
      {status.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <div className={`${item.color} h-3 w-3`} />
          <span className="text-xs">{item.title}</span>
        </div>
      ))}
    </div>
  );
}

export default Legend;
