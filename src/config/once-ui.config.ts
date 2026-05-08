import { home } from "./content";

const baseURL: string = "https://kathiravanvittobha.com";

const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/skills": true,
  "/experience": true,
  "/work": true,
  "/blog": true,
  "/specialties": true,
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
  logo: `${baseURL}/images/logo.png`,
  url: baseURL,
  type: "Person",
  name: "Kathiravan V",
  description: home.description,
  image: `${baseURL}/images/avatar.png`,
  email: "kathiravanvittopa717@gmail.com",
  jobTitle: "Full-Stack Developer",
  sameAs: [
    "https://github.com/KathiravanBCS",
    "https://www.linkedin.com/in/kathiravan-vittobha-182569317/",
    "https://x.com/Kathiravan27117",
    "https://peerlist.io/kathiravan",
  ],
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
