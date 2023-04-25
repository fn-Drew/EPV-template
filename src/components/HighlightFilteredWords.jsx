import React from "react";
import PropTypes from "prop-types";

export default function HighlightFilteredWords({ children, filter }) {
    if (!filter) return children;

    const filterRegex = new RegExp(`(${filter})`, "gi");
    const parts = children.split(filterRegex);

    return (
        <div>
            {parts.map((part) =>
                filterRegex.test(part) ? (
                    <span key={crypto.randomUUID()} className="highlight">
                        {part}
                    </span>
                ) : (
                    part
                )
            )}
        </div>
    );
};

HighlightFilteredWords.propTypes = {
    children: PropTypes.node.isRequired,
    filter: PropTypes.string.isRequired,
};
