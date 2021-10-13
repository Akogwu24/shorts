import React, { useState, useEffect } from 'react';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries').then((res) =>
        res
          .json()
          .then((data) => setCountries(data))
          .catch((err) => console.log(err))
      );
    };
    getCountries();
  }, []);

  return (
    <div className='container'>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='search...'
        id='name'
        type='text'
      />

      {/* filter the country array to be mapped */}

      {countries
        .filter((item) => {
          if (input === '' || input === ' ') {
            return item;
          } else if (item.country.toLowerCase().includes(input.toLowerCase())) {
            return item;
          }
          return item;
        })
        .map((item, index) => (
          <h3 key={index}>{item.country}</h3>
        ))}
    </div>
  );
};

export default Home;
