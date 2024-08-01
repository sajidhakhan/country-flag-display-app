import React, { useEffect, useState } from 'react';
import styles from './Countries.module.css';

function Countries() {

      const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = apiData
    ? apiData.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
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
                { filteredCountries.map((country) => (
                    <div className={styles.countryCard} key={country.cca3}>
                        <img src={country.flags.png} alt={`${country.name.common} flag`} />
                        <h2>{country.name.common}</h2>
                    </div>
                ))}
            </div>
            </div>
        </>
    );
}

export default Countries;
