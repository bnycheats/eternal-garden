import { PropsWithChildren, createContext, useState } from 'react';

export const PrivateHeaderContext = createContext<PrivateHeaderContextValue>({});

export function PrivateHeaderProvider(props: PropsWithChildren) {
  const [header, setHeader] = useState<HeaderType | undefined>(undefined);

  return <PrivateHeaderContext.Provider value={{ header, setHeader }}>{props.children}</PrivateHeaderContext.Provider>;
}

export type PrivateHeaderContextValue = {
  header?: HeaderType;
  setHeader?: React.Dispatch<React.SetStateAction<HeaderType | undefined>>;
};

export type HeaderType = {
  title: string;
  showBack?: boolean;
  extra?: React.ReactNode;
};
