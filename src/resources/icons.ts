import { IconType } from "react-icons";

import {
  HiOutlineRocketLaunch,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineComputerDesktop,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import {
  SiSubstack,
  SiBluesky,
} from "react-icons/si";


export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  sun: HiOutlineSun,
  moon: HiOutlineMoon,
  monitor: HiOutlineComputerDesktop,
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
  substack: SiSubstack,
  bluesky: SiBluesky,
  external: HiOutlineArrowTopRightOnSquare,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;