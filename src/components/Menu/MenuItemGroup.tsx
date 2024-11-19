import { ReactNode, useEffect, useState } from "react";

function MenuItemGroup(props: MenuItemGroupProps) {
  const { children, active } = props;
  const [open, setOpen] = useState<boolean>(active);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  return children(toggle, open);
}

type MenuItemGroupProps = {
  children: (toggle: () => void, open: boolean) => ReactNode;
  active: boolean;
};

export default MenuItemGroup;
