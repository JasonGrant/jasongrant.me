import { useState } from "react";
import styles from "./ColorSelection.module.css";
import { Button, Flex, Popover } from '@radix-ui/themes';
import { ChromePicker } from 'react-color';
import ColorPicker from "./ColorPicker";

interface ColorSelectionProps {
    label: string;
    initialColor: string;
    onColorChange: (color: string) => void;
}

const ColorSelection: React.FC<ColorSelectionProps> = ({ initialColor, onColorChange, label }) => {
    const [colorChip, setColorChip] = useState(initialColor);

    const handleColorChange = (color: any) => {
        setColorChip(color.hex);
        onColorChange(color.hex);
    };

    return (
        <Flex align="center" gap="2" direction="row">
            <ColorPicker onChange={(color: string) => {
                setColorChip(color);
                onColorChange(color);
            }} />
            <Popover.Root>
                <Popover.Trigger>
                    <Button color="gray" size="3" variant="outline" className={styles.colorButton}>
                        <div style={{ 
                            width: "1rem", 
                            height: "1rem", 
                            backgroundColor: colorChip,
                            borderRadius: "0.25rem", 
                            display: "inline-block", 
                        }}></div>
                        {label} <b>{colorChip}</b>
                    </Button>
                </Popover.Trigger>
                <Popover.Content maxWidth="226px" minWidth="226px" width="226px" className={styles.popoverContent}>
                    
                        <ChromePicker 
                            color={colorChip} 
                            onChange={handleColorChange} 
                            disableAlpha 
                        />
                    
                </Popover.Content>
            </Popover.Root>
        </Flex>
    );
};

export default ColorSelection;