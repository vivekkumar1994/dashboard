// src/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import BarChart from './BarChart';
import PieChart from './Piechart';
import BubbleChart from './BubbleChart';
import RadarChart from './RadarChart';
import HeatmapChart from './HeatmapChart';
import './dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: '',
    intensityMin: 0,
    intensityMax: 10,
    likelihoodMin: 0,
    likelihoodMax: 10,
    relevanceMin: 0,
    relevanceMax: 10,
    yearStart: '',
    yearEnd: '',
  });
  const [options, setOptions] = useState({
    topics: [],
    sector: [],
    region: [],
    pestle: [],
    source: [],
    swot: [],
    country: [],
    city: [],
    years: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:6002/get-products'); // Adjust your API endpoint as needed
        setData(response.data);

        // Populate filter options
        const topics = [...new Set(response.data.map(item => item.topic))];
        const sectors = [...new Set(response.data.map(item => item.sector))];
        const regions = [...new Set(response.data.map(item => item.region))];
        const pestles = [...new Set(response.data.map(item => item.pestle))];
        const sources = [...new Set(response.data.map(item => item.source))];
        const swots = [...new Set(response.data.map(item => item.swot))];
        const countries = [...new Set(response.data.map(item => item.country))];
        const cities = [...new Set(response.data.map(item => item.city))];
        const years = [...new Set(response.data.map(item => item.start_year))];

        setOptions({
          topics,
          sector: sectors,
          region: regions,
          pestle: pestles,
          source: sources,
          swot: swots,
          country: countries,
          city: cities,
          years,
        });

        setFilteredData(response.data); // Initialize with all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filters]);

  const filterData = () => {
    let newData = [...data];

    // Filter based on selected values
    Object.keys(filters).forEach((key) => {
      if (filters[key] || filters[key] === 0) {
        if (key.includes('Min') || key.includes('Max')) {
          const field = key.replace('Min', '').replace('Max', '');
          if (field) {
            newData = newData.filter((item) =>
              item[field] >= filters[`${field}Min`] &&
              item[field] <= filters[`${field}Max`]
            );
          }
        } else {
          newData = newData.filter((item) =>
            item[key] ? item[key].toString().toLowerCase().includes(filters[key].toLowerCase()) : false
          );
        }
      }
    });

    setFilteredData(newData);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <h1>Data Visualization Dashboard</h1>
      </header>
      <div className="filter">
        <label>
          End Year:
          <select name="endYear" value={filters.endYear} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
        <label>
          Topics:
          <select name="topics" value={filters.topics} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.topics.map((topic) => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </label>
        <label>
          Sector:
          <select name="sector" value={filters.sector} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.sector.map((sector) => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </label>
        <label>
          Region:
          <select name="region" value={filters.region} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.region.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </label>
        <label>
          PESTLE:
          <select name="pestle" value={filters.pestle} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.pestle.map((pestle) => (
              <option key={pestle} value={pestle}>{pestle}</option>
            ))}
          </select>
        </label>
        <label>
          Source:
          <select name="source" value={filters.source} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.source.map((source) => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </label>
        <label>
          SWOT:
          <select name="swot" value={filters.swot} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.swot.map((swot) => (
              <option key={swot} value={swot}>{swot}</option>
            ))}
          </select>
        </label>
        <label>
          Country:
          <select name="country" value={filters.country} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.country.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </label>
        <label>
          City:
          <select name="city" value={filters.city} onChange={handleFilterChange}>
            <option value="">All</option>
            {options.city.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>
        <label>
          Intensity Range:
          <input
            type="number"
            name="intensityMin"
            value={filters.intensityMin}
            onChange={handleRangeChange}
            placeholder="Min"
          />
          <input
            type="number"
            name="intensityMax"
            value={filters.intensityMax}
            onChange={handleRangeChange}
            placeholder="Max"
          />
        </label>
        <label>
          Likelihood Range:
          <input
            type="number"
            name="likelihoodMin"
            value={filters.likelihoodMin}
            onChange={handleRangeChange}
            placeholder="Min"
          />
          <input
            type="number"
            name="likelihoodMax"
            value={filters.likelihoodMax}
            onChange={handleRangeChange}
            placeholder="Max"
          />
        </label>
        <label>
          Relevance Range:
          <input
            type="number"
            name="relevanceMin"
            value={filters.relevanceMin}
            onChange={handleRangeChange}
            placeholder="Min"
          />
          <input
            type="number"
            name="relevanceMax"
            value={filters.relevanceMax}
            onChange={handleRangeChange}
            placeholder="Max"
          />
        </label>
        <label>
          Year Range:
          <input
            type="number"
            name="yearStart"
            value={filters.yearStart}
            onChange={handleRangeChange}
            placeholder="Start Year"
          />
          <input
            type="number"
            name="yearEnd"
            value={filters.yearEnd}
            onChange={handleRangeChange}
            placeholder="End Year"
          />
        </label>
      </div>
      <div className="cards-container">
        <div className="card">
          <h3 className="card-title">Intensity Over Time</h3>
          <LineChart data={filteredData} />
        </div>
        <div className="card">
          <h3 className="card-title">Relevance by Sector</h3>
          <BarChart data={filteredData} />
        </div>
        <div className="card">
          <h3 className="card-title">Impact by Topic</h3>
          <PieChart data={filteredData} />
        </div>
        <div className="card">
          <h3 className="card-title">Impact by Topic</h3>
          <BubbleChart data={filteredData} />
        </div>
        <div className="card">
          <h3 className="card-title">Impact by Topic</h3>
          <RadarChart data={filteredData} />
        </div>
        <div className="card">
          <h3 className="card-title">Impact by Topic</h3>
          <HeatmapChart data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
