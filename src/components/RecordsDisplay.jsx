import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import recordService from '../services/records';
import "../App.css";

export default function RecordsDisplay() {
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const user = useSelector(state => state.user);
    const { data: records } = useQuery(['records'], () => recordService.getAllUserRecords(user))

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
        <div className="records-container">
            <button type="button" onClick={prevDay} disabled={currentDayIndex === 0}>
                Previous Day
            </button>
            <button type="button" onClick={nextDay} disabled={currentDayIndex === days.length - 1}>
                Next Day
            </button>
            {/* Display only the current day based on currentDayIndex */}
            {days.slice(currentDayIndex, currentDayIndex + 1).map(([day, records]) => (
                <div key={day}>
                    <h3>{day}</h3>
                    {records.map((record) => (
                        <div className="record" key={record.date}>
                            <div id="transcript">{record.record}</div>
                            <div id="date">{formatDate(record.date)}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    ) : null;
}
