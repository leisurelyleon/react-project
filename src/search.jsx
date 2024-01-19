import React from 'react'
import search from './search.jsx'
import './search.css'

import React, { useState, useRef, useEffect } from 'react';

const SearchComponent = () => {
    const [searchInput, setSearchInput] = useState('');
    const searchContainerRef = useRef(null);
    const foodMenuListRef = useRef(null);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        };

        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                closeSearch();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const closeSearch = () => {
        setSearchInput('');
        removeHighlights();
        searchContainerRef.current.style.display = 'none';
    };

    const performSearch = async () => {
        const keywords = searchInput.trim().toLowerCase();
        if (keywords === '') {
            // Handle empty search input
            return;
        }

        try {
            const matchingElements = await fetchMatchingElements(keywords);

            if (matchingElements.length > 0) {
                const firstMatchingElement = matchingElements[0];
                window.scrollTo({
                    top: firstMatchingElement.offsetTop - 50,
                    behavior: 'smooth',
                });

                highlightText(firstMatchingElement, keywords);
            } else {
                console.log('No matching elements found.');
            }
        } catch (error) {
            console.error('Error fetching matching elements:', error);
        }
    };

    const fetchMatchingElements = async (keywords) => {
        // Assuming you have a proper API endpoint configured in your environment
        const apiEndpoint = 'https://docs.google.com/document/d/1Fmtwh5F6veAuxbIEzn-CjHZV8gGkOOsMu2reIGY7av0/edit' + encodeURIComponent(keywords);

        try {
            const response = await fetch(apiEndpoint);

            if (!response.ok) {
                throw new Error('Failed to fetch matching elements');
            }

            const data = await response.json();

            // Modify this based on the structure of your API response
            return data.results || [];
        } catch (error) {
            throw new Error('Error fetching matching elements:', error);
        }
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchSubmit = () => {
        performSearch();
    };

    return (
        <div className="search-container" data-search-container ref={searchContainerRef}>
            <div className="search-box">
                <input
                    type="search"
                    name="search"
                    aria-label="Search here"
                    placeholder="Type keywords here..."
                    className="search-input"
                    id="searchInput"
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            performSearch();
                        }
                    }}
                />
                <button className="search-submit" aria-label="Submit search" data-search-submit-btn onClick={handleSearchSubmit}>
                    <ion-icon name="search-outline"></ion-icon>
                </button>
            </div>
            <button className="search-close-btn" aria-label="Cancel search" data-search-close-btn onClick={closeSearch}></button>
        </div>
    );
};

export default search;