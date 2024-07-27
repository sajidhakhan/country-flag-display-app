import React, { useEffect, useState } from 'react';
import styles from './Countries.module.css';

 function Countries() {
  
    const apiUrl = "https://restcountries.com/v3.1/all";
  
    const [countries, setCountries] = useState ([]);

    const [isLoading,setIsLoading] = useState ([]);

    const [error, setIsError] = useState ([]);


    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(null);

            try {
                const response = await fetch(apiUrl);
                if(!response.ok){
                    throw new Error(`Api request failed with status ${response.status}`)
                }
            const data = await response.json();
            setCountries(data);
            } catch (error) {
                setIsError(error);
                console.error('Error fetching in countries:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[]);
  
    console.log(countries);
    useEffect(() => {
        if (countries.length > 0) {
          console.log('First few countries:', countries.slice(0, 5));
        }
      }, [countries]);

  return (
    <>
        {isLoading && <p>Loading countries...</p>}
        {error && <p>Error fetching countries</p>}
       <div className={styles.wrapper} >
            {countries.map((country) => (             
                    <div className={styles.countryCard} key={country.cca3}>
                        <img src={country.flags.png} alt={country.name.common} />
                        <h2>{country.name.common}</h2>
                    </div>               
            ))}
        </div>
    </>
  );
}


export default Countries