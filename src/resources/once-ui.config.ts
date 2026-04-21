import { home } from "./content";

const baseURL: string = "https://kathiravan.dev";

const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/skills": true,
  "/experience": true,
  "/work": true,
  "/blog": true,
  "/contact": true,
  "/gallery": false,
};

const display = {
  location: true,
  time: true,
  themeSwitcher: true,
};

const protectedRoutes: Record<string, boolean> = {};

const schema = {
  logo: "",
  type: "Person",
  name: "Kathiravan V",
  description: home.description,
  email: "kathiravanvittopa717@gmail.com",
};

const sameAs = {
  threads: "",
  linkedin: "https://www.linkedin.com/in/kathiravan-vittobha-182569317/",
  discord: "",
};

const socialSharing = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  routes,
  protectedRoutes,
  baseURL,
  schema,
  sameAs,
  socialSharing,
};
