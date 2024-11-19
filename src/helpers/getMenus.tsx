import { paths } from "@/navigation/Routes";
import { AiOutlineAppstore } from "react-icons/ai";

export function getMenus() {
  return [
    {
      label: "Menu",
      items: [
        {
          itemKey: "dashboard",
          to: paths.authenticated.DASHBOARD,
          label: "Dashboard",
          icon: <AiOutlineAppstore />,
        },
      ],
    },
  ];
}

export default getMenus;
