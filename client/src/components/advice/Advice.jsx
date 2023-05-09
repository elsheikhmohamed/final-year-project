import React, { useState, useEffect, useMemo } from "react";
import "./advice.scss";

function Advice() {
  // State variables
  const [adviceId, setAdviceId] = useState(null);
  const [advice, setAdvice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [invalidSearch, setInvalidSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Fetch advice search results
      fetch(`https://api.adviceslip.com/advice/search/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.slips && data.slips.length > 0) {
            setSearchResults(data.slips);
            setInvalidSearch(false);
          } else {
            setInvalidSearch(true);
          }
        });
    }
  };

  // Filter search results to remove duplicates
  const filteredResults = useMemo(() => {
    if (searchResults.length > 0) {
      const uniqueResults = searchResults.filter(
        (result, index, self) =>
          index === self.findIndex((r) => r.id === result.id)
      );
      return uniqueResults;
    }
    return [];
  }, [searchResults]);

  // Set random advice when filteredResults changes
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * filteredResults.length);
    const randomAdvice = filteredResults[randomIndex];
    if (randomAdvice) {
      setAdviceId(randomAdvice.id);
      setAdvice(randomAdvice.advice);
    }
  }, [filteredResults]);

  // Fetch initial random advice
  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdviceId(data.slip.id);
        setAdvice(data.slip.advice);
      });
  }, []);

  // Render component
  return (
    <div className="advice">
      <div className="advice-container">
        <form onSubmit={handleSearch}>
          <p className="disclaimer">
            *Please note that these advices may NOT always apply to real life*
          </p>
          <br />
          <div className="advice-search-container">
            <input
              className={`search-input${invalidSearch ? " invalid" : ""}`}
              type="text"
              placeholder="Search for advice"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        </form>
        <div className="title">
          Advice #<span className="id">{adviceId}</span>
        </div>
        <div className="advice-text">{advice}</div>
      </div>
    </div>
  );
}

export default Advice;
