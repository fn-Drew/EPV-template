import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import recordService from '../services/records';
import "../App.css";
import { setNotification } from '../reducers/notificationReducer';

export default function RecordsDisplay({ handleLogout }) {
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const user = useSelector(state => state.user);
    const { data: records, error, isError } = useQuery(['records'], () => recordService.getAllUserRecords(user));
    const dispatch = useDispatch();

    // FIX: for some reason very slow, maybe because # of retries with react query?
    if (isError) {
        if (error.response.status === 401) {
            handleLogout();
            dispatch(setNotification('Your session has expired. Please log in again.'));
        }
    }

    const formatDate = (date) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,

        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }

    const formatDay = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }

    // groupByDate takes an array of records and returns an object
    // where each key is a formatted day (YYYY Month DD) and its value is an array of records for that day
    const groupByDate = (records) => {
        if (!records) return {};
        const groupedRecords = records.reduce((acc, record) => {
            // Format the date to only show the year, month, and day
            const day = formatDay(record.date);
            // If the day is not already in the accumulator object, create an empty array for it
            if (!acc[day]) {
                acc[day] = [];
            }
            // Add the record to the array for its corresponding day
            acc[day].push(record);

            return acc;
        }, {});

        return groupedRecords;
    }

    // Group records by date using the groupByDate function
    const groupedRecords = groupByDate(records);
    // Convert the groupedRecords object into an array of key-value pairs (day and records)
    const days = Object.entries(groupedRecords);

    // on load make current day the most recent day with records
    useEffect(() => {
        setCurrentDayIndex(days.length - 1);
    }, [days.length])

    // Functions to navigate between days
    const prevDay = () => {
        if (currentDayIndex > 0) {
            setCurrentDayIndex(currentDayIndex - 1);
        }
    }

    const nextDay = () => {
        if (currentDayIndex < days.length - 1) {
            setCurrentDayIndex(currentDayIndex + 1);
        }
    }

    return records ? (
        days.slice(currentDayIndex, currentDayIndex + 1).map(([day, records]) => (
            <div className="records-container">
                {/* Display only the current day based on currentDayIndex */}
                <div className="records-nav">
                    <button className="records-nav-button" type="button" onClick={prevDay} disabled={currentDayIndex === 0}>
                        &larr;
                    </button>
                    <h3>{day}</h3>
                    <button className="records-nav-button" type="button" onClick={nextDay} disabled={currentDayIndex === days.length - 1}>
                        &rarr;
                    </button>
                </div>
                <div key={day} className="records-list">
                    {records.map((record) => (
                        <div className="record" key={record.date}>
                            <div id="transcript">{record.record}</div>
                            <div id="date">{formatDate(record.date)}</div>
                        </div>
                    ))}
                </div>
            </div>
        ))
    ) : null;
}

RecordsDisplay.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};
