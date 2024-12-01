import usePrivateHeader from '@/hooks/usePrivateHeader';
import { AiOutlineLeft } from 'react-icons/ai';

function HeaderPrivate() {
  const header = usePrivateHeader();

  if (!header) return null;

  const { title, extra, showBack } = header;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-4">
        {showBack && (
          <AiOutlineLeft
            className="cursor-pointer"
            onClick={() => {
              history.back();
            }}
          />
        )}
        {title && <h2 className="text-title-md2 font-semibold text-black dark:text-white">{title}</h2>}
      </div>
      {extra && extra}
    </div>
  );
}

export default HeaderPrivate;
