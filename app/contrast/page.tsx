"use client"

import { apcaContrastValue, hex, wcagContrastValue, wcagIsReadable, apcaToInterpolatedFont, apcaValidateFont } from "a11y-color-contrast";
import { Container, DataList, Flex, Heading } from '@radix-ui/themes';
import ApcaSettings from "@/ui/contrast/ApcaSettings";
import ColorSelection from "@/ui/contrast/ColorSelection";
import ItemWithFontPreviewProps from "@/ui/contrast/ItemWithFontPreview";
import DynamicFontCheck from "@/ui/contrast/DynamicFontCheck";
import { useState } from "react";
import styles from "./page.module.css";

export default function ContrastPage() {
    const [foreground, setForeground] = useState("#232426");
    const [background, setBackground] = useState("#EEEEEE");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [apcaSettings, setApcaSettings] = useState<Record<string, { size: string; weight: string; display: boolean }>>({});

    const wcag = wcagContrastValue(hex(foreground), hex(background)).toFixed(2);
    const apca = apcaContrastValue(hex(foreground), hex(background));
    const wcagValidAA = wcagIsReadable(hex(foreground), hex(background), { level: "AA" });
    const wcagValidAAA = wcagIsReadable(hex(foreground), hex(background), { level: "AAA" });
    const wcagValidAALarge = Number(wcag) >= 3;
    const wcagValidAAALarge = Number(wcag) >= 4.5;
    const interpolatedFont = apcaToInterpolatedFont(apca);
    const fontWeights: { [key: number]: string } = { 0: "100", 1: "200", 2: "300", 3: "400", 4: "500", 5: "600", 6: "700", 7: "800", 8: "900" };

    return (
        <Container size="4" className={styles.pageContainer}>
            <div className={styles.pageLayout}>
                <Flex direction="column" gap="4" className={styles.settingsZone}>
                    <Heading size="5">Colors</Heading>
                    <ColorSelection
                        initialColor={foreground}
                        onColorChange={(color: string) => setForeground(color)}
                        label="Foreground"
                    />
                    <ColorSelection
                        initialColor={background}
                        onColorChange={(color: string) => setBackground(color)}
                        label="Background"
                    />
                    <Heading size="5">APCA Settings</Heading>
                    <ApcaSettings
                        onTagChange={(selectedTags) => setSelectedTags(selectedTags)}
                        onSettingsChange={(updatedSettings) => setApcaSettings(updatedSettings)}
                    ></ApcaSettings>
                    {/* {selectedTags}
                    {JSON.stringify(apcaSettings, null, 2)} */}
                </Flex>
                <Flex direction="column" gap="4" className={styles.resultsZone}>
                    <Heading size="5">WCAG Results</Heading>
                    <DataList.Root>
                        <DataList.Item align="center">
                            <DataList.Label minWidth="160px">WCAG Contrast Value</DataList.Label>
                            <DataList.Value>
                                {wcag}
                            </DataList.Value>
                        </DataList.Item>
                        <ItemWithFontPreviewProps
                            label="WCAG Valid AA"
                            isValid={wcagValidAA}
                            background={background}
                            foreground={foreground}
                            fontLabel="Font size 14px Regular"
                            fontSize="14px"
                            fontWeight="400"
                        ></ItemWithFontPreviewProps>
                        <ItemWithFontPreviewProps
                            label="WCAG Valid AAA"
                            isValid={wcagValidAAA}
                            background={background}
                            foreground={foreground}
                            fontLabel="Font size 14px Regular"
                            fontSize="14px"
                            fontWeight="400"
                        ></ItemWithFontPreviewProps>
                        <ItemWithFontPreviewProps
                            label="WCAG Valid Large AA"
                            isValid={wcagValidAALarge}
                            background={background}
                            foreground={foreground}
                            fontLabel="Font size 18px Bold"
                            fontSize="18px"
                            fontWeight="700"
                        ></ItemWithFontPreviewProps>
                        <ItemWithFontPreviewProps
                            label="WCAG Valid Large AAA"
                            isValid={wcagValidAAALarge}
                            background={background}
                            foreground={foreground}
                            fontLabel="Font size 18px Bold"
                            fontSize="18px"
                            fontWeight="700"
                        ></ItemWithFontPreviewProps>
                    </DataList.Root>
                    <Heading size="5">APCA Results</Heading>
                    <DataList.Root>
                        <DataList.Item align="center">
                            <DataList.Label minWidth="160px">APCA Contrast Value</DataList.Label>
                            <DataList.Value>
                                {apca}
                            </DataList.Value>
                        </DataList.Item>
                        <DynamicFontCheck
                            background={background}
                            foreground={foreground}
                            settings={apcaSettings}
                        ></DynamicFontCheck>
                    </DataList.Root>
                    <Heading size="5">APCA Recommendations</Heading>
                    <DataList.Root>
                        {interpolatedFont && Object.entries(interpolatedFont).map(([k, v]) => (
                            <DataList.Item align="center" key={k}>
                                <DataList.Label>Font weight {fontWeights[Number(k)]}</DataList.Label>
                                <DataList.Value>Font size &nbsp;<b>{isNaN(Number(v)) ? v : Math.round(Number(v))}{v === "placeholder" ? "" : "px"}</b> &nbsp;recommended</DataList.Value>
                            </DataList.Item>
                        ))}
                    </DataList.Root>
                </Flex>
            </div>
        </Container>
    );
}