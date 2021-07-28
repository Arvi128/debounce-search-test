import { URL } from "./constants";

export const searchFilms = async (query) => {
  try {
    let url = URL.FILMS;
    if (query) {
      url = `${url}/?search=${query}`;
    }
    const response = await fetch(url);
    return response.json();
  } catch (e) {
    console.error(e);
    return e;
  }
};
