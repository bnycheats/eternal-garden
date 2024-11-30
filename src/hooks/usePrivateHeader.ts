import { type HeaderType, PrivateHeaderContext } from '@/providers/privateHeaderProvider';
import { useContext, useEffect } from 'react';

export default function usePrivateHeader(headerProps?: HeaderType) {
  const { header, setHeader } = useContext(PrivateHeaderContext);

  const onInit = () => {
    if (setHeader && headerProps) {
      setHeader(headerProps);
      return () => setHeader(undefined);
    }
  };

  useEffect(onInit, []);

  return header;
}
