import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';
import '../App.css';

export default function FilterRecords() {

    const dispatch = useDispatch();
    const handleFilterChange = (event) => {
        dispatch(setFilter(event.target.value));
    };

    return (
        <div className="filter-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="svg" id="search-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input className="filter-records-input" name="filter" onInput={(event) => handleFilterChange(event)} type="text" placeholder="Filter records" />
        </div>
    );
}
