import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';
import useUserRecords from '../hooks/useUserRecords';
import '../App.css';

function FilterRecordInfo() {
    const filter = useSelector(state => state.filter);
    const user = useSelector(state => state.user);
    const { data: records, error, isError, isLoading } = useUserRecords(user, user.token);

    if (isError) {
        return (
            <div> {error} </div>
        )
    }

    if (isLoading) {
        return (
            <div> loading... </div>
        )
    }

    // Function to count occurrences of the filtered word in all records
    const countOccurrences = () => {
        const filterRegex = new RegExp(filter, 'gi');
        return records.reduce((count, record) => {
            const matches = record.record.match(filterRegex);
            return count + (matches ? matches.length : 0);
        }, 0);
    };

    const occurrences = countOccurrences(records, filter);

    return (
        <div className="filter-records-info">
            <div> {records.length} total </div>
            <div> {records.filter(record => record.record.toLowerCase().includes(filter.toLowerCase())).length} results </div>
            <div> {occurrences} occurrences </div>
        </div>
    )
}

export default function FilterRecords() {

    const dispatch = useDispatch();
    const handleFilterChange = (event) => {
        dispatch(setFilter(event.target.value));
    };

    return (
        <div>
            <FilterRecordInfo />
            <input className="filter-records-input" name="filter" onInput={(event) => handleFilterChange(event, setFilter)} type="text" placeholder="Filter records" />
        </div>
    );
}
