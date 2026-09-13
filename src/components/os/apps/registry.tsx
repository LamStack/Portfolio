import {
  User,
  Briefcase,
  FolderGit2,
  Trophy,
  BadgeCheck,
  FileText,
  Gamepad2,
  Mail,
  TerminalSquare,
} from "lucide-react";
import type { AppDef } from "../types";
import { AboutApp } from "./AboutApp";
import { ExperienceApp } from "./ExperienceApp";
import { ProjectsApp } from "./ProjectsApp";
import { AchievementsApp } from "./AchievementsApp";
import { CertificationsApp } from "./CertificationsApp";
import { ResumeApp } from "./ResumeApp";
import { ArcadeApp } from "./ArcadeApp";
import { ContactApp } from "./ContactApp";
import { TerminalApp } from "./TerminalApp";

export const APPS: AppDef[] = [
  {
    id: "about",
    title: "About Me",
    icon: User,
    accent: "cyan",
    component: AboutApp,
    defaultSize: { width: 560, height: 560 },
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    accent: "violet",
    component: ExperienceApp,
    defaultSize: { width: 560, height: 560 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderGit2,
    accent: "cyan",
    component: ProjectsApp,
    defaultSize: { width: 720, height: 600 },
  },
  {
    id: "achievements",
    title: "Achievements",
    icon: Trophy,
    accent: "amber",
    component: AchievementsApp,
    defaultSize: { width: 620, height: 580 },
  },
  {
    id: "certifications",
    title: "Certifications",
    icon: BadgeCheck,
    accent: "cyan",
    component: CertificationsApp,
    defaultSize: { width: 600, height: 500 },
  },
  {
    id: "resume",
    title: "Resume",
    icon: FileText,
    accent: "pink",
    component: ResumeApp,
    defaultSize: { width: 560, height: 640 },
  },
  {
    id: "arcade",
    title: "Arcade",
    icon: Gamepad2,
    accent: "violet",
    component: ArcadeApp,
    defaultSize: { width: 560, height: 600 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    accent: "pink",
    component: ContactApp,
    defaultSize: { width: 480, height: 500 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: TerminalSquare,
    accent: "cyan",
    component: TerminalApp,
    defaultSize: { width: 560, height: 420 },
  },
];

export const APP_SIZES = Object.fromEntries(
  APPS.map((a) => [a.id, a.defaultSize])
) as Record<AppDef["id"], { width: number; height: number }>;
