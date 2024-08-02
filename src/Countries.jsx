
import React, { useEffect, useState } from 'react';
import styles from './Countries.module.css';

function Countries() {
  const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://xcountries-backend.azurewebsites.net/all");
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = apiData
    ? apiData.filter((country) => {
        const countryName = country.name?.common || country.name || '';
        return countryName.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerStyle}>
          <input
            type="text"
            placeholder="Search for countries..."
            className={styles.searchStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '400px', height: '40px', fontSize: '16px', padding: '5px 10px' }}
          />
        </div>
        <div className={styles.countryContainer}>
          {filteredCountries.map((country) => (
            <div className={styles.countryCard} key={country.abbr}>
              <img src={country.flag} alt={`${country.name} flag`} />
              <h2>{country.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Countries;
