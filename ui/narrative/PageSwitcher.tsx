import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PageSwitcher: React.FC = () => {
    const [activeButton, setActiveButton] = useState(1);
    const router = useRouter();

    const handleButtonClick = (buttonNumber: number) => {
        setActiveButton(buttonNumber);
    };

    useEffect(() => {
        // Update the active button based on the current path on route change
        const isCurrentPathRoot = router.pathname === '/';
        const activeButtonNumber = isCurrentPathRoot ? 1 : 2;
        setActiveButton(activeButtonNumber);
    }, [router.pathname]);

    return (
        <div className="wrapper">
            <button
                className={`button ${activeButton === 1 ? 'active' : ''}`}
                onClick={() => handleButtonClick(1)}
            >
                Button 1
            </button>
            <button
                className={`button ${activeButton === 2 ? 'active' : ''}`}
                onClick={() => handleButtonClick(2)}
            >
                Button 2
            </button>
        </div>
    );
};

export default PageSwitcher;