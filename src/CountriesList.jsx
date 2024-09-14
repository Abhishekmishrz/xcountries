import React, { useEffect, useState } from 'react';

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://xcountries-backend.azurewebsites.net/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Failed to load countries.</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
      {countries.map((country) => (
        <div key={country.abbr} style={{ textAlign: 'center', border: '1px solid #ddd', padding: '10px' }}>
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            style={{ width: '100px', height: 'auto' }}
          />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CountriesList;
