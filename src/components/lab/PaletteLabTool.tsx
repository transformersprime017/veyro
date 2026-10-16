import { useState } from 'react';
import { Button } from '../Button';
import { RoutePath } from '../../types';
import { 
  ArrowLeft, 
  Copy, 
  CheckCircle2, 
  Code
} from 'lucide-react';

export interface PaletteLabToolProps {
  onNavigate: (path: RoutePath) => void;
  onBackToLab: () => void;
}

interface PaletteColor {
  name: string;
  hex: string;
  role: string;
}

interface PresetPalette {
  id: string;
  title: string;
  clientNiche: string;
  description: string;
  colors: PaletteColor[];
}

const PRESET_PALETTES: PresetPalette[] = [
  {
    id: 'veyro_master',
    title: 'VEYRO Architectural Master',
    clientNiche: 'Digital Studio & Web Engineering',
    description: 'The official VEYRO system: high-density Obsidian foundations, crisp Bone typography, and restrained Electric Lime accents.',
    colors: [
      { name: 'Obsidian 900', hex: '#0B0B0D', role: 'Primary Background' },
      { name: 'Obsidian 800', hex: '#111113', role: 'Surface / Cards' },
      { name: 'Bone Primary', hex: '#F3F0E8', role: 'Headings / Body Text' },
      { name: 'Electric Lime', hex: '#C7FF3D', role: 'Action / Active Accent' },
      { name: 'Muted Slate', hex: '#79766F', role: 'Meta & Technical Labels' },
    ],
  },
  {
    id: 'arcline_interior',
    title: 'Arcline Spatial & Stone',
    clientNiche: 'Luxury Residential Interior Design',
    description: 'Earthy travertine, dark basalt, warm joinery brass, and architectural light for high-end residential interiors.',
    colors: [
      { name: 'Basalt Dark', hex: '#121417', role: 'Deep Framing' },
      { name: 'Warm Travertine', hex: '#EAE5D9', role: 'Natural Stone Surface' },
      { name: 'Joinery Brass', hex: '#C2A676', role: 'Luxury Accent' },
      { name: 'Raw Linen', hex: '#F7F5F0', role: 'Primary Text' },
      { name: 'Olive Shadow', hex: '#3E4238', role: 'Botanical Depth' },
    ],
  },
  {
    id: 'noire_editorial',
    title: 'Noiré Haute Editorial',
    clientNiche: 'Luxury Fashion & Private Ateliers',
    description: 'Severe monochrome contrast paired with champagne gold and subtle smoke tones for high-fashion runway prestige.',
    colors: [
      { name: 'Jet Noir', hex: '#08090A', role: 'Runway Canvas' },
      { name: 'Chiaroscuro', hex: '#1A1C20', role: 'Sculptural Shadow' },
      { name: 'Champagne Gold', hex: '#D4AF37', role: 'VIP Accent' },
      { name: 'Silk Ivory', hex: '#F8F6F1', role: 'Typographic Display' },
      { name: 'Cool Smoke', hex: '#8E9199', role: 'Lookbook Metadata' },
    ],
  },
  {
    id: 'kavo_roastery',
    title: 'Kavo Specialty Roast',
    clientNiche: 'Artisanal Roasteries & Modern Cafés',
    description: 'Warm roasted espresso beans, steamed oat tones, rich amber crema, and a punchy fresh mint highlight.',
    colors: [
      { name: 'Dark Roast', hex: '#141210', role: 'Espresso Canvas' },
      { name: 'Steamed Oat', hex: '#F3EDE2', role: 'Menu Surface' },
      { name: 'Amber Crema', hex: '#D97746', role: 'Warm Highlight' },
      { name: 'Fresh Mint', hex: '#58B388', role: 'Badge & Status' },
      { name: 'Coffee Husk', hex: '#7D6A5D', role: 'Roast Notes' },
    ],
  },
];

// Helper to compute relative luminance and contrast ratio (WCAG 2.1)
function getContrastRatio(hex1: string, hex2: string): number {
  const getLuminance = (hex: string) => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const [R, G, B] = [r, g, b].map((val) =>
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  } catch {
    return 1;
  }
}

export const PaletteLabTool = ({ onNavigate, onBackToLab }: PaletteLabToolProps) => {
  const [currentPalette, setCurrentPalette] = useState<PaletteColor[]>(PRESET_PALETTES[0].colors);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_PALETTES[0].id);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleSelectPreset = (preset: PresetPalette) => {
    setCurrentPalette([...preset.colors]);
    setSelectedPresetId(preset.id);
  };

  const handleColorChange = (index: number, newHex: string) => {
    setCurrentPalette((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], hex: newHex };
      return updated;
    });
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedFormat(`hex-${hex}`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleCopyCssVariables = () => {
    const css = `:root {\n${currentPalette
      .map((c) => `  --color-${c.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}: ${c.hex}; /* ${c.role} */`)
      .join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    setCopiedFormat('css');
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const handleCopyTailwindConfig = () => {
    const obj: Record<string, string> = {};
    currentPalette.forEach((c) => {
      const key = c.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      obj[key] = c.hex;
    });
    const configString = `// Tailwind CSS Colors:\ncolors: ${JSON.stringify(obj, null, 2)}`;
    navigator.clipboard.writeText(configString);
    setCopiedFormat('tailwind');
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          type="button"
          onClick={onBackToLab}
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#C7FF3D] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Back to Lab Workbench</span>
        </button>

        <span className="font-mono text-xs text-zinc-500">
          Tool 04 / Architectural Palette Lab
        </span>
      </div>

      {/* Palette Header */}
      <div className="border border-white/10 bg-[#111113] p-6 sm:p-10 rounded-2xl space-y-6">
        <div>
          <span className="font-mono text-xs text-[#C7FF3D] uppercase">Chromatic Engineering</span>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#F3F0E8] mt-1">
            Harmonic Palette & Contrast Calculator
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl font-sans">
            Curate, edit, and test architectural color schemes with live WCAG contrast checks against deep obsidian canvases.
          </p>
        </div>

        {/* Preset Switcher Pills */}
        <div className="space-y-2 pt-2">
          <div className="text-[11px] font-mono text-zinc-500 uppercase">Curated Industry Presets:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_PALETTES.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#C7FF3D] bg-[#C7FF3D]/10'
                      : 'border-white/10 bg-[#0B0B0D] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs font-display font-medium text-[#F3F0E8] line-clamp-1">
                    {preset.title}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 mt-0.5 line-clamp-1">
                    {preset.clientNiche}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {preset.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Interactive Palette Visualizer */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-mono uppercase text-[#F3F0E8]">Active Color Tokens</h4>
            <span className="text-xs font-mono text-zinc-500">Click color swatches to adjust hex values</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {currentPalette.map((color, idx) => {
              // Calculate contrast against standard dark background #0B0B0D
              const contrastRatio = getContrastRatio(color.hex, '#0B0B0D');
              const isWcagAA = contrastRatio >= 4.5;

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-white/10 bg-[#0B0B0D] space-y-3 flex flex-col justify-between"
                >
                  {/* Color Preview Block & Native Input */}
                  <div className="relative group">
                    <div
                      className="w-full h-24 rounded-lg border border-white/15 flex items-end p-2.5 shadow-inner transition-transform group-hover:scale-[1.02]"
                      style={{ backgroundColor: color.hex }}
                    >
                      <input
                        type="color"
                        value={color.hex}
                        onChange={(e) => handleColorChange(idx, e.target.value.toUpperCase())}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                        title={`Change ${color.name}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-display font-medium text-[#F3F0E8] line-clamp-1">
                      {color.name}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 line-clamp-1">
                      {color.role}
                    </div>
                  </div>

                  {/* Hex Copy Button */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleCopyHex(color.hex)}
                      className="text-xs font-mono text-[#C7FF3D] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{color.hex}</span>
                      <Copy className="w-3 h-3 text-zinc-500" />
                    </button>

                    <span
                      title={`Contrast against #0B0B0D: ${contrastRatio.toFixed(1)}:1`}
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded-xs ${
                        isWcagAA
                          ? 'bg-[#C7FF3D]/10 text-[#C7FF3D]'
                          : 'bg-white/5 text-zinc-500'
                      }`}
                    >
                      {contrastRatio.toFixed(1)}:1
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Architectural Component Preview using the Current Palette */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          <div className="text-xs font-mono uppercase text-zinc-400">Live Surface Composition Test:</div>

          <div
            className="p-6 sm:p-8 rounded-xl border border-white/10 transition-colors space-y-4"
            style={{ backgroundColor: currentPalette[0].hex }}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${currentPalette[3].hex}22`, color: currentPalette[3].hex }}
              >
                ● {currentPalette[3].name} Accent
              </span>
              <span className="font-mono text-xs" style={{ color: currentPalette[4].hex }}>
                Surface Token Preview
              </span>
            </div>

            <h4
              className="text-2xl sm:text-3xl font-display font-medium tracking-tight"
              style={{ color: currentPalette[2].hex }}
            >
              Architectural hierarchy tested in real-time.
            </h4>

            <p className="text-xs sm:text-sm font-sans max-w-lg leading-relaxed" style={{ color: currentPalette[4].hex }}>
              This live surface previews how your selected palette renders titles, accents, and body typography in production before writing CSS.
            </p>

            <div className="pt-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-full text-xs font-bold font-sans tracking-wide transition-opacity hover:opacity-90 cursor-pointer"
                style={{ backgroundColor: currentPalette[3].hex, color: currentPalette[0].hex }}
              >
                Interactive CTA Preview ↗
              </button>
            </div>
          </div>
        </div>

        {/* Export Controls */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyCssVariables}
              icon={copiedFormat === 'css' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            >
              {copiedFormat === 'css' ? 'CSS Variables Copied!' : 'Export CSS Variables'}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyTailwindConfig}
              icon={copiedFormat === 'tailwind' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copiedFormat === 'tailwind' ? 'Tailwind Config Copied!' : 'Export Tailwind Palette'}
            </Button>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('/services')}
          >
            Apply to a Custom Studio Build ↗
          </Button>
        </div>

      </div>

    </div>
  );
};
