import React, { useEffect, useState } from 'react';
import styles from './Countries.module.css';

function Countries() {

    const apiUrl = "https://restcountries.com/v3.1/all";

    const [countries, setCountries] = useState([]);
    

    useEffect(() => {
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setCountries(data));
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                
                { countries.map((country) => (
                    <div className={styles.countryCard} key={country.cca3}>
                        <img src={country.flags.png} alt={`${country.name.common} flag`} />
                        <h2>{country.name.common}</h2>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Countries;
