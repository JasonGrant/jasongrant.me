import React from 'react';
import { DataList, Flex, Badge, Text } from '@radix-ui/themes';

interface ItemWithFontPreviewProps {
    label: string;
    isValid: boolean;
    background: string;
    foreground: string;
    fontLabel: string;
    fontSize: string;
    fontWeight: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
}

const ItemWithFontPreview: React.FC<ItemWithFontPreviewProps> = ({ label, isValid, background, foreground, fontLabel, fontSize, fontWeight }) => {
    return (
        <DataList.Item align="center">
            <DataList.Label>{label}</DataList.Label>
            <DataList.Value>
                <Flex align="center" justify="between" gap="2" style={{ width: "100%", height: `calc(${fontSize} + 8px)` }}>
                    <Badge color={isValid ? "green" : "red"}>{isValid ? "Pass" : "Fail"}</Badge>
                    <Flex px="2" align="center" style={{ backgroundColor: background, borderRadius: "4px", height: `calc(${fontSize} + 8px)` }}>
                        <Text style={{ color: foreground, fontSize: fontSize, fontWeight: fontWeight }}>{fontLabel}</Text>
                    </Flex>
                </Flex>
            </DataList.Value>
        </DataList.Item>
    );
};

export default ItemWithFontPreview;