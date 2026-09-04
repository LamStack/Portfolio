import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

export type AppId =
  | "about"
  | "experience"
  | "projects"
  | "achievements"
  | "certifications"
  | "resume"
  | "arcade"
  | "contact"
  | "terminal";

export type AppDef = {
  id: AppId;
  title: string;
  icon: LucideIcon;
  accent: string;
  component: ComponentType;
  defaultSize: { width: number; height: number };
};

export type WindowState = {
  id: string;
  appId: AppId;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  prevRect: { x: number; y: number; width: number; height: number } | null;
};
