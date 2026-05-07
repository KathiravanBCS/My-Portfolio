import type { IconName } from "@/config/icons";

export type Person = {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  location: string;
  timeZone: string;
  languages?: string[];
};

export type Newsletter = {
  display: boolean;
  title: React.ReactNode;
  description: React.ReactNode;
};

export type Social = Array<{
  name: string;
  icon: IconName;
  link: string;
  essential?: boolean;
}>;

export interface BasePageConfig {
  path: string;
  label: string;
  title: string;
  description: string;
  image?: string;
}

export interface Home extends BasePageConfig {
  image: string;
  headline: React.ReactNode;
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  subline: React.ReactNode;
}

export interface About extends BasePageConfig {
  tableOfContent: {
    display: boolean;
    subItems: boolean;
  };
  avatar: {
    display: boolean;
  };
  calendar: {
    display: boolean;
    link: string;
  };
  intro: {
    display: boolean;
    title: string;
    description: React.ReactNode;
  };
  work: {
    display: boolean;
    title: string;
    experiences: Array<{
      company: string;
      timeframe: string;
      role: string;
      institution?: string;
      achievements: React.ReactNode[];
      tags?: string[];
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  studies: {
    display: boolean;
    title: string;
    institutions: Array<{
      name: string;
      description: React.ReactNode;
    }>;
  };
  technical: {
    display: boolean;
    title: string;
    skills: Array<{
      title: string;
      description?: React.ReactNode;
      tags?: Array<{
        name: string;
        icon?: string;
      }>;
      images?: Array<{
        src: string;
        alt: string;
        width: number;
        height: number;
      }>;
    }>;
  };
  expertise?: {
    display: boolean;
    title: string;
    projects: Array<{
      category: string;
      description: string;
    }>;
  };
}

export interface Blog extends BasePageConfig {}

export interface Work extends BasePageConfig {}

export interface Services extends BasePageConfig {
  services: Array<{
    title: string;
    description: string;
    icon?: string;
    highlights?: string[];
  }>;
}

export interface Gallery extends BasePageConfig {
  images: Array<{
    src: string;
    alt: string;
    orientation: string;
  }>;
}
