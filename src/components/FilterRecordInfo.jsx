import React from 'react';
import { useSelector } from 'react-redux';
import useUserRecords from '../hooks/useUserRecords';
import '../App.css';

export default function FilterRecordInfo() {
    const filter = useSelector(state => state.filter);
    const user = useSelector(state => state.user);
    const { data: records, isLoading } = useUserRecords(user, user.token);

    if (isLoading) {
        return null;
    }

    // Function to count occurrences of the filtered word in all records
    const countOccurrences = () => {
        const filterRegex = new RegExp(filter, 'gi');
        if (records) {
            return records.reduce((count, record) => {
                const matches = record.record.match(filterRegex);
                return count + (matches ? matches.length : 0);
            }, 0);
        }
        return null;
    };

    const occurrences = countOccurrences();

    return filter && !isLoading ? (
        <div className="filter-records-info">
            <div className="filter-info-box"> {records.filter(record => record.record.toLowerCase().includes(filter.toLowerCase())).length} / {records.length.toLocaleString()} records </div>
            <div className="filter-info-box"> {occurrences.toLocaleString()} matches </div>
        </div>
    ) :
        <div className="filter-records-info">
            <div className="filter-info-box"> {records.length.toLocaleString()} records </div>
            <div className="filter-info-box"> {occurrences.toLocaleString()} words </div>
        </div>
}
