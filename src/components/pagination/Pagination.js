import React from 'react';
import PropTypes from 'prop-types';

import "./Pagination.style.scss";

Pagination.propTypes = {
    defaultCurrent: PropTypes.number,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

Pagination.defaultProps = {
    perPage: 20,
    defaultCurrent: 1
}

function Pagination(props) {

    const { defaultCurrent, total, perPage, onChange } = props;

    const totalLink = Array.from(Array(Math.ceil(total / perPage)).keys(), x => x + 1);

    const isPrevious = defaultCurrent > 1 ? true :false;
    const isNext = defaultCurrent < totalLink.length ? true :false;

    return (
        <div className='pagination-wrapper'>
            <ul className="pagination-list">
                <li className={"pagination-itemp previous-page" + (isPrevious ? "" : "disable")}>
                    <button onClick={() => {onChange(defaultCurrent - 1)}} disabled={!isPrevious} className="pagination-item-link">
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                    </button>
                </li>
                {
                    totalLink.map(numberPage => 
                        <li key={numberPage} className={"pagination-itemp number-page" + ( defaultCurrent === numberPage ? " active" : "" )}>
                            <button onClick={() => {onChange(numberPage)}} className="pagination-item-link">
                                {numberPage}
                            </button>
                        </li>
                    )
                }
                <li className={"pagination-itemp next-page" + (isNext ? "" : "disable")}>
                    <button onClick={() => {onChange(defaultCurrent + 1)}} disabled={!isNext} className="pagination-item-link">
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination
