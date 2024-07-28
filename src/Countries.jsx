import React, { useEffect, useState } from 'react';
import styles from './Countries.module.css';

function Countries() {
    const apiUrl = "https://restcountries.com/v3.1/all";
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setCountries(data))
            .catch((error) => {
                console.error('Error fetching the data:', error);
                setError(error);
            });
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                {error ? (
                    <div className={styles.error}>
                        <p>Failed to load countries data. Please try again later.</p>
                    </div>
                ) : (
                    countries.map((country) => (
                        <div className={styles.countryCard} key={country.cca3}>
                            <img src={country.flags.png} alt={`${country.name.common} flag`} />
                            <h2>{country.name.common}</h2>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Countries;
