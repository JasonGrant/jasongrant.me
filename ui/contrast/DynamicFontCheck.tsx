import React from 'react';
import ItemWithFontPreview from './ItemWithFontPreview';
import { apcaContrastValue, hex, apcaValidateFont } from "a11y-color-contrast";

interface Settings {
    [key: string]: {
        size: string;
        weight: string;
        display: boolean;
    };
}

interface DynamicFontCheckProps {
    background: string;
    foreground: string;
    settings: Settings;
}

const DynamicFontCheck: React.FC<DynamicFontCheckProps> = ({ background, foreground, settings }) => {

    const apca = apcaContrastValue(hex(foreground), hex(background));

    return (
        <>
            {Object.entries(settings).map(([key, { size, weight, display }]) => {
                if (!display) return null;
                    const isValid = apcaValidateFont(apca, [parseInt(size) as 16 | 10 | 12 | 14 | 15 | 18 | 21 | 24 | 28 | 32 | 36 | 42 | 48 | 60 | 72 | 96], [parseInt(weight) as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900]);
                    const isValidBoolean = isValid[size as keyof typeof isValid][weight as keyof typeof isValid] as boolean;
                return (
                    <ItemWithFontPreview
                        key={key}
                        label={key}
                        isValid={isValidBoolean}
                        background={background}
                        foreground={foreground}
                        fontLabel={`${size}px, ${weight}`}
                        fontSize={`${size}px`}
                        fontWeight={weight as "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"}
                    />
                );
            })}
        </>
    );
};

export default DynamicFontCheck;