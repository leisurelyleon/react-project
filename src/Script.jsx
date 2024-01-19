import { useState } from 'react'
import Script from './Script.jsx'
import './Script.css'

import React, { useState, useEffect } from 'react';

const Script = () => {
    const [navbarActive, setNavbarActive] = useState(false);
    const [headerActive, setHeaderActive] = useState(false);
    const [deliveryBoyMove, setDeliveryBoyMove] = useState(-80);

    const handleMenuToggle = () => {
        setNavbarActive(!navbarActive);
    };

    const handleNavLinkClick = () => {
        setNavbarActive(false);
    };

    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (scrollY >= 100) {
            setHeaderActive(true);
        } else {
            setHeaderActive(false);
        }

        const deliveryBoyTopPos = deliveryBoyRef.current.getBoundingClientRect().top;

        if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
            if (lastScrollPos < scrollY) {
                setDeliveryBoyMove((prevMove) => prevMove + 1);
            } else {
                setDeliveryBoyMove((prevMove) => prevMove - 1);
            }
        }

        setLastScrollPos(scrollY);
    };

    const handleSearchToggle = () => {
        setSearchContainerActive(!searchContainerActive);
        document.body.classList.toggle('active');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Navbar Toggle */}
            <button data-menu-toggle-btn onClick={handleMenuToggle}>
                Toggle Navbar
            </button>

            {/* Navbar Links */}
            <div data-navbar className={`navbar ${navbarActive ? 'active' : ''}`}>
                {navbarLinks.map((link, index) => (
                    <a key={index} data-nav-link onClick={handleNavLinkClick}>
                        {link}
                    </a>
                ))}
            </div>

            {/* Sticky Header + Back to Top */}
            <div data-header className={`header ${headerActive ? 'active' : ''}`}>
                <button data-back-top-btn>Back to Top</button>
            </div>

            {/* Search Box Toggle */}
            {searchBoxElems.map((element, index) => (
                <button key={index} onClick={handleSearchToggle} {...element}>
                    {element.label}
                </button>
            ))}

            {/* Move Cycle on Scroll */}
            <div data-delivery-boy style={{ transform: `translateX(${deliveryBoyMove}px)` }}>
                Delivery Boy
            </div>
        </div>
    );
};

export default Script;