import { type MenuModelType } from "@/components/Menu";
import { paths } from "@/navigation/Routes";
import {
  AiOutlineAppstore,
  AiOutlineTable,
  AiOutlineEnvironment,
  AiOutlineFile,
  AiOutlineTeam,
  AiOutlineCalendar,
} from "react-icons/ai";
import { CiMedicalCross } from "react-icons/ci";

export function getMenus(): MenuModelType[] {
  return [
    {
      label: "MENU",
      items: [
        {
          itemKey: "dashboard",
          to: paths.authenticated.DASHBOARD,
          label: "Dashboard",
          icon: <AiOutlineAppstore />,
        },
        {
          itemKey: "burial-space",
          to: paths.authenticated.BURIAL_SPACE,
          label: "Burial Space",
          icon: <CiMedicalCross />,
        },
        {
          itemKey: "reports",
          to: paths.authenticated.REPORTS,
          label: "Reports",
          icon: <AiOutlineTable />,
          children: [
            {
              to: paths.authenticated.SALES,
              label: "Sales",
            },
            {
              to: paths.authenticated.CLIENTS,
              label: "Clients",
            },
            {
              to: paths.authenticated.DECEASED,
              label: "Deceased",
            },
          ],
        },
        {
          itemKey: "map-editor",
          to: paths.authenticated.MAP_EDITOR,
          label: "Map Editor",
          icon: <AiOutlineEnvironment />,
        },
        {
          itemKey: "activity-logs",
          to: paths.authenticated.ACTIVITY_LOGS,
          label: "Activity Logs",
          icon: <AiOutlineFile />,
        },
        {
          itemKey: "user-logs",
          to: paths.authenticated.USER_LOGS,
          label: "User Logs",
          icon: <AiOutlineTeam />,
        },
        {
          itemKey: "pending-burial",
          to: paths.authenticated.PENDING_BURIAL,
          label: "Pending for Burial",
          icon: <AiOutlineCalendar />,
        },
        {
          itemKey: "schedule",
          to: paths.authenticated.SCHEDULE,
          label: "Schedule",
          icon: <AiOutlineCalendar />,
        },
      ],
    },
  ];
}

export default getMenus;
