import React, { useEffect, useState } from 'react';
import styles from './Countries.module.css';

 function Countries() {
  
    const apiUrl = "https://restcountries.com/v3.1/al";
  
    const [countries, setCountries] = useState ([]);

    const [isLoading,setIsLoading] = useState ([false]);

    const [error, setIsError] = useState ([null]);


    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(null);
    
            try {
                const response = await fetch(apiUrl);

                if(!response.ok){
                    throw new Error(`Api request failed with status: ${response.status}`)
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
  

  return (
    <>
        {isLoading && <p>Loading countries...</p>}
        {error && <p>Error: {error.message}</p>}
       <div className={styles.wrapper} >
            {!isLoading && !error && countries.map((country) => (             
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