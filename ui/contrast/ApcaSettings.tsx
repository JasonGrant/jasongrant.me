import React, { useEffect, useState } from 'react';
import styles from "./ApcaSettings.module.css";
import { CheckboxGroup, Flex, Select, Text, Heading } from '@radix-ui/themes';

interface ApcaSettingTagsProps {
    onTagChange: (selectedTags: string[]) => void;
    onSettingsChange: (updatedSettings: Record<string, { size: string; weight: string; display: boolean }>) => void;
}

const fontWeights = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
const fontSizes = ["10", "12", "14", "15", "16", "18", "21", "24", "28", "32", "36", "42", "48", "60", "72", "96"];

const ApcaSettings: React.FC<ApcaSettingTagsProps> = ({ onTagChange, onSettingsChange }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['h1', 'h5', 'text2']);

    type Settings = Record<string, { size: string; weight: string; display: boolean }>;

    useEffect(() => {
        onTagChange(selectedTags);
        onSettingsChange(settings);
    }, []);

    const [settings, setSettings] = useState<Settings>({
        h1: { size: '36', weight: '100', display: true },
        h2: { size: '32', weight: '700', display: false },
        h3: { size: '24', weight: '600', display: false },
        h4: { size: '21', weight: '600', display: false },
        h5: { size: '18', weight: '500', display: true },
        h6: { size: '16', weight: '500', display: false },
        text1: { size: '18', weight: '400', display: false },
        text2: { size: '16', weight: '400', display: true },
        text3: { size: '14', weight: '400', display: false },
    });

    const handleInputChange = (key: string, field: string, value: string) => {
        setSettings((prevSettings) => {
            const updatedSettings = {
                ...prevSettings,
                [key]: {
                    ...prevSettings[key],
                    [field]: value,
                },
            };
            onSettingsChange(updatedSettings);
            return updatedSettings;
        });
    };

    const handleCheckboxChange = (tag: string) => {
        setSelectedTags((prevSelectedTags) => {
            const newSelectedTags = prevSelectedTags.includes(tag)
                ? prevSelectedTags.filter((t) => t !== tag)
                : [...prevSelectedTags, tag];
            onTagChange(newSelectedTags);
            return newSelectedTags;
        });
    };

    return (
        <>
            <CheckboxGroup.Root 
                value={selectedTags} 
                onValueChange={(newSelectedTags) => {
                    setSelectedTags(newSelectedTags);
                    const updatedSettings = { ...settings };
                    Object.keys(updatedSettings).forEach(tag => {
                        updatedSettings[tag].display = newSelectedTags.includes(tag);
                    });
                    setSettings(updatedSettings);
                    onTagChange(newSelectedTags);
                }}
                size="3"
                color="gray" highContrast
                className={styles.checkboxGroup}
            >
                    {['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'text1', 'text2', 'text3'].map((tag) => (
                        <CheckboxGroup.Item 
                            key={`checkbox-${tag}`}
                            value={tag}
                        >
                            {tag}
                        </CheckboxGroup.Item>
                    ))}
            </CheckboxGroup.Root>
            {Object.keys(settings).filter(tag => settings[tag].display).map((tag) => (
                <Flex key={`flex-${tag}`} direction="column" gap="2">
                    <Flex align="end" gap="2" direction="row">
                        <Flex direction="column" gap="2" flexBasis="16%" align="end" pb="1">
                            <Heading size="3">{tag}</Heading>
                        </Flex>
                        <Flex direction="column" gap="2" flexBasis="42%">
                            <Text className={styles.fontLabel}>Font size</Text>
                            <Select.Root
                                value={settings[tag].size}
                                onValueChange={(value) => handleInputChange(tag, 'size', value)}
                                disabled={!selectedTags.includes(tag)}
                            >
                                <Select.Trigger />
                                <Select.Content>
                                    {fontSizes.map(size => (
                                        <Select.Item 
                                            value={size} 
                                            key={`font-${size}`}
                                        >
                                            {size}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                        <Flex direction="column" gap="2" flexBasis="42%">
                            <Text className={styles.fontLabel}>Font weight</Text>
                            <Select.Root
                                value={settings[tag].weight}
                                onValueChange={(value) => handleInputChange(tag, 'weight', value)}
                                disabled={!selectedTags.includes(tag)}
                            >
                                <Select.Trigger />
                                <Select.Content>
                                    {fontWeights.map(weight => (
                                        <Select.Item 
                                            value={weight} 
                                            key={`weight-${weight}`}
                                        >
                                            {weight}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </Flex>
                    </Flex>
                </Flex>
            ))}
        </>
    );
};

export default ApcaSettings;