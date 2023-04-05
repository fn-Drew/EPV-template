import React from 'react';

export default function RecordsDisplay({ records }) {
    return records.map((record) => (
        <div className="record" key={record.id}>
            <div id="transcript">{record.record}</div>
            <div id="date">{record.date}</div>
        </div>
    ));
}
