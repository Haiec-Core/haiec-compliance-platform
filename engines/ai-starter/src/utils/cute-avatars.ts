import { toSiteURL } from "./helpers";

const paths = [
  "bear.jpg",
  "deer.jpg",
  "fire-dragon.jpg",
  "gs.jpg",
  "simba.jpg",
];

function getRandomIndexFromPaths() {
  return Math.floor(Math.random() * paths.length);
}

export function getRandomCuteAvatar() {
  const randomIndex = getRandomIndexFromPaths();
  const path = paths[randomIndex];
  return toSiteURL(`/assets/cute-avatars/${path}`);
}
