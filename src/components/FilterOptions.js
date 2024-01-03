
import React from 'react';
import SearchBar from './SearchBar';

const FilterOptions = ({ statusFilter, setStatusFilter, handleSearch }) => {
    return (
        <div className="parent-container">
            <div className="filter-container">
            <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                >
                <option value="All">All</option>
                <option value="Noted">Noted</option>
                <option value="Want to Learn">Want to Learn</option>
                <option value="Learned">Learned</option>
                </select>
             <SearchBar onSearch={handleSearch} />
            </div>
        </div>
    );
};

export default FilterOptions;
