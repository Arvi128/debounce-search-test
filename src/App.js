import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { searchFilms } from "./requests";
import Film from "./Film";
function App() {
  const [films, setFilms] = useState([]);
  const [allFilms, setAllFilms] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState("");
  const ref = useRef();

  useEffect(function onLoad() {
    searchFilms().then((res) => {
      if (Array.isArray(res.results) && res.results.length > 0) {
        setFilms(res.results);
        setAllFilms(res.results);
      }
    });
  }, []);

  useEffect(
    function searchHandler() {
      if (debouncedText) {
        searchFilms(debouncedText).then((res) => {
          if (Array.isArray(res.results) && res.results.length > 0) {
            setFilms(res.results);
          }
        });
      } else {
        setFilms(allFilms);
      }
    },
    [debouncedText]
  );
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(searchText);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  return (
    <div className="App">
      <input
        type="text"
        ref={ref}
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {films.map((film) => (
        <Film film={film} />
      ))}
    </div>
  );
}

export default App;
