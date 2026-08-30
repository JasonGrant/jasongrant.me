"use client";

import { useState } from "react";
import { FiGlobe } from "react-icons/fi";
import { Button } from "../_ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../_ui/card";
import { Checkbox } from "../_ui/checkbox";
import { Label } from "../_ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../_ui/select";

const LANGS = ["French", "German", "Spanish", "Italian"];

export function ShadcnOrgSettings() {
  const [selected, setSelected] = useState<string[]>(["French", "German"]);
  const toggle = (l: string) =>
    setSelected((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]));

  return (
    <Card className="w-full max-w-[460px] overflow-hidden">
      <CardHeader>
        <span className="grid size-[34px] place-items-center rounded-[9px] bg-accent text-[17px] text-primary shadow-ring-accent">
          <FiGlobe />
        </span>
        <div>
          <h3 className="text-[15px] font-semibold tracking-[-0.01em]">Localization</h3>
          <p className="text-[13px] text-muted-foreground">
            Set the default language and formats for your organization.
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-0 py-1">
        <div className="flex flex-col gap-2 border-b border-border py-4">
          <div className="flex items-baseline justify-between">
            <Label>Business language</Label>
            <span className="text-xs text-muted-foreground">Default for new teammates</span>
          </div>
          <Select defaultValue="French">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="French">French</SelectItem>
              <SelectItem value="German">German</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 border-b border-border py-4">
          <div className="flex items-baseline justify-between">
            <Label>Regional format</Label>
            <span className="text-xs text-muted-foreground">Numbers, dates, currency</span>
          </div>
          <Select defaultValue="France">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-3 border-b border-border py-4">
          <div className="flex items-baseline justify-between">
            <Label>Localization languages</Label>
            <span className="text-xs text-muted-foreground">{selected.length} selected</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {LANGS.map((l) => (
              <label
                key={l}
                htmlFor={`lang-${l}`}
                className="flex cursor-pointer items-center gap-2.5 text-[13.5px]"
              >
                <Checkbox
                  id={`lang-${l}`}
                  checked={selected.includes(l)}
                  onCheckedChange={() => toggle(l)}
                />
                {l}
              </label>
            ))}
          </div>
        </div>

        <div className="py-4">
          <div className="rounded-lg border border-border bg-muted p-3.5 shadow-inset">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">
              Preview · France
            </div>
            {[
              ["Date", "15 sept. 2026"],
              ["Number", "5 123 456,59"],
              ["Currency", "145,79 €"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`flex items-center justify-between py-1 text-[13px] ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span className="text-muted-foreground">{k}</span>
                <span className="font-mono tabular-nums">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <span className="flex items-center gap-2 text-[12.5px] text-muted-foreground before:size-1.5 before:rounded-full before:bg-[#e0a53f] before:shadow-[0_0_0_3px_rgba(224,165,63,0.16)] before:content-['']">
          Unsaved changes
        </span>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}
