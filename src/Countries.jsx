import React, { useEffect, useState } from 'react';
import styles from './Countries.module.css';

function Countries() {
    
    const [countries, setCountries] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
          .then((response) => response.json())
          .then((data) => setCountries(data))
          .catch((error) => console.error('Error fetching data: ', error));
      }, []);

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );

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
