
import React from 'react';
import SearchBar from './SearchBar';

const FilterOptions = ({ statusFilter, setStatusFilter, handleSearch, setSortOrder }) => {
    return (
        <div className="parent-container">
            <div className="filter-container">
            <label htmlFor="statusFilter" className="filter-label">Filter by Status:</label>
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
                <label htmlFor="sortOrder" className="sort-label">Sort by:</label>
                <select
                id="sortOrder"
                onChange={(e) => setSortOrder(e.target.value)}
                >
                <option value="">Select...</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                </select>
             <SearchBar onSearch={handleSearch} />
            </div>
        </div>
    );
};

export default FilterOptions;
