import { ACCOUNT_TYPE } from "../utils/constants";

export const NavbarLinks = [
  {
    id: 1,
    title: "Home",
    path: "/home",
    icon: "HiHome",
  },
  {
    title: "Search",
    path: "/search",
    icon: "HiOutlineSearch",
  },
  {
    title: "Posts by You",
    path: "/user-posts",
    icon: "HiOutlineNewspaper",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: "HiOutlineChatAlt",
  },
  {
    title: "Activity",
    path: "/activity",
    icon: "HiOutlineBell",
  },
  {
    title: "Create Post",
    path: "/create",
    icon: "HiOutlinePlusCircle",
  },
  {
    title: "Profile",
    path: "/my-profile",
    icon: "HiOutlinePlusCircle",
  },
  {
    title: "More",
    path: "/more",
    icon: "HiOutlineViewList",
  },
  // Lecturer Routes
  {
    title: "Broad-casting",
    path: "/more",
    icon: "HiOutlineViewList",
    type: ACCOUNT_TYPE.INSTRUCTOR,
  },
];
