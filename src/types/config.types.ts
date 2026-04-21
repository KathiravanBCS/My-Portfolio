export type DisplayConfig = {
  location: boolean;
  time: boolean;
  themeSwitcher: boolean;
};

export type RoutesConfig = Record<string, boolean>;

export type ProtectedRoutesConfig = Record<string, boolean>;

export type SchemaConfig = {
  logo: string;
  type: string;
  name: string;
  description: string;
  email: string;
};

export type SameAsConfig = {
  threads: string;
  linkedin: string;
  discord: string;
};

export type SocialSharingConfig = {
  display: boolean;
  platforms: {
    x: boolean;
    linkedin: boolean;
    facebook: boolean;
    pinterest: boolean;
    whatsapp: boolean;
    reddit: boolean;
    telegram: boolean;
    email: boolean;
    copyLink: boolean;
  };
};
