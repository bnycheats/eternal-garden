import MenuItem, { type MenuItemProps } from "./MenuItem";

function Menu(props: MenuProps) {
  return (
    <nav className="mt-2 px-4 py-4 lg:mt-6 lg:px-6">
      {props.model.map((item, index) => (
        <div key={index}>
          {item.label && (
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              {item.label}
            </h3>
          )}
          {
            <ul className="flex flex-col gap-1.5">
              {item.items.map(
                (mItem, mIndex) =>
                  !mItem.hidden && (
                    <li key={mIndex}>
                      <MenuItem {...mItem} />
                    </li>
                  )
              )}
            </ul>
          }
        </div>
      ))}
    </nav>
  );
}
export type MenuModelType = {
  label?: React.ReactNode;
  items: MenuItemProps[];
};

type MenuProps = {
  model: MenuModelType[];
};

export default Menu;
