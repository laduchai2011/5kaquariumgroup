import React from 'react';
import './style.css';

const Cell: React.FC<{ data: string }> = ({ data }) => {
    return <div className="Table1-Cell">{data}</div>;
};

export default Cell;
