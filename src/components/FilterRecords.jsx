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
        <form className="filter-records">
            <input name="filter" onInput={(event) => handleFilterChange(event, setFilter)} type="text" placeholder="Filter records" />
        </form>
    );
}
