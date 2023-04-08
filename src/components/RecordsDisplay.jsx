import React from 'react';
import "../App.css";

export default function RecordsDisplay({ records, user }) {

    if (user && !records) {
        return (
            <div className="records-container">
                <div className="record">
                    loading...
                </div>
            </div>
        );
    }

    return records ?
        <div className="records-container">
            {
                records.map((record) => (
                    <div className="record" key={record.date}>
                        <div id="transcript">{record.record}</div>
                        <div id="date">{record.date}</div>
                    </div>
                ))
            }
        </div>
        : null;
}
