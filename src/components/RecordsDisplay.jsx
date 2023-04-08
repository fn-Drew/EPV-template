import React from 'react';
import "../App.css";

export default function RecordsDisplay({ records }) {

    if (!records) {
        return (
            <div className="records-container">
                <div className="record">
                    loading...
                </div>
            </div>
        );
    }

    const formatDate = (date) => {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }

    return records ?
        <div className="records-container">
            {
                records.map((record) => (
                    <div className="record" key={record.date}>
                        <div id="transcript">{record.record}</div>
                        <div id="date">{formatDate(record.date)}</div>
                    </div>
                ))
            }
        </div>
        : null;
}
