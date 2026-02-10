"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Card, CardContent, Badge, Tabs, TabPanel, Input } from "@/components/ui";
import {
    DUMMY_CAMPAIGNS,
    DUMMY_PRODUCTS,
    DUMMY_AI_ASSETS,
    EXPORT_FORMATS,
    CAMPAIGN_TYPES,
    CTA_TYPES,
    DURATION_OPTIONS,
    VIDEO_STYLES,
    CAMERA_MOVEMENTS,
} from "@/lib/dummy-data";
import {
    ArrowLeft,
    Save,
    Settings,
    ShoppingCart,
    Users,
    Camera,
    Play,
    Download,
    Plus,
    Trash2,
    Package,
    Code,
    Megaphone,
    ExternalLink,
    Clock,
    Check,
    Video,
    Smartphone,
    Monitor,
    Wand2,
} from "lucide-react";

const TAB_CONFIG = [
    { id: "setup", label: "Setup", icon: <Settings className="w-4 h-4" /> },
    { id: "products", label: "Products", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "assets", label: "AI Assets", icon: <Users className="w-4 h-4" /> },
    { id: "style", label: "Style", icon: <Camera className="w-4 h-4" /> },
    { id: "preview", label: "Preview", icon: <Play className="w-4 h-4" /> },
    { id: "export", label: "Export", icon: <Download className="w-4 h-4" /> },
];

const CAMPAIGN_TYPE_ICONS: Record<string, any> = {
    product: Package,
    software: Code,
    service: Users,
    brand_awareness: Megaphone,
};

export default function CampaignEditorPage() {
    const params = useParams();
    const router = useRouter();
    const campaignId = params.id as string;
    const isNew = campaignId === "new";

    const existingCampaign = DUMMY_CAMPAIGNS.find((c) => c.id === campaignId);

    const [activeTab, setActiveTab] = useState("setup");
    const [isSaving, setIsSaving] = useState(false);

    const [campaignName, setCampaignName] = useState(existingCampaign?.name || "New Campaign");
    const [brandName, setBrandName] = useState(existingCampaign?.brandName || "");
    const [tagline, setTagline] = useState(existingCampaign?.tagline || "");
    const [campaignType, setCampaignType] = useState<string>(existingCampaign?.type || "product");
    const [duration, setDuration] = useState(existingCampaign?.duration || 30);
    const [ctaType, setCtaType] = useState(existingCampaign?.ctaType || "buy_now");
    const [ctaText, setCtaText] = useState(existingCampaign?.ctaText || "Shop Now");
    const [ctaUrl, setCtaUrl] = useState(existingCampaign?.ctaUrl || "");

    const [selectedProducts, setSelectedProducts] = useState<string[]>(
        DUMMY_PRODUCTS.slice(0, 2).map((p) => p.id)
    );
    const [selectedAssets, setSelectedAssets] = useState<string[]>(
        DUMMY_AI_ASSETS.slice(0, 2).map((a) => a.id)
    );
    const [videoStyle, setVideoStyle] = useState("cinematic");
    const [cameraMovement, setCameraMovement] = useState("pan_right");
    const [selectedFormats, setSelectedFormats] = useState<string[]>(["tiktok", "youtube-ad"]);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const toggleProduct = (productId: string) => {
        setSelectedProducts((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
    };

    const toggleAsset = (assetId: string) => {
        setSelectedAssets((prev) =>
            prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]
        );
    };

    const toggleFormat = (formatId: string) => {
        setSelectedFormats((prev) =>
            prev.includes(formatId) ? prev.filter((id) => id !== formatId) : [...prev, formatId]
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <div className="bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-white/5 rounded-sm transition-colors text-white/50 hover:text-white"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <input
                                type="text"
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                className="text-xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 w-auto"
                            />
                            <p className="text-[10px] uppercase tracking-widest text-white/30">
                                {isNew ? "Creating new campaign" : `Last saved: ${existingCampaign?.updatedAt ? new Date(existingCampaign.updatedAt).toLocaleString() : "Never"}`}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Badge variant={existingCampaign?.status === "published" ? "success" : "warning"}>
                            {existingCampaign?.status || "Draft"}
                        </Badge>
                        <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                        <Button>
                            <Wand2 className="w-4 h-4 mr-2" />
                            Generate Ad
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/[0.02] border-b border-white/5 px-6">
                <Tabs tabs={TAB_CONFIG} activeTab={activeTab} onChange={setActiveTab} />
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
                <div className="max-w-5xl mx-auto">
                    {/* Setup Tab */}
                    <TabPanel isActive={activeTab === "setup"}>
                        <div className="space-y-10">
                            {/* Campaign Type */}
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">
                                    Campaign Type
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {CAMPAIGN_TYPES.map((type) => {
                                        const Icon = CAMPAIGN_TYPE_ICONS[type.id] || Package;
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => setCampaignType(type.id)}
                                                className={`p-6 rounded-sm border text-left transition-all duration-300 group ${campaignType === type.id
                                                        ? "bg-white/10 border-[#F97316] shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                                                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                                    }`}
                                            >
                                                <Icon className={`w-8 h-8 mb-4 ${campaignType === type.id ? "text-[#F97316]" : "text-white/40 group-hover:text-white/60"}`} />
                                                <h4 className="font-bold text-sm text-white mb-1">{type.name}</h4>
                                                <p className="text-[10px] text-white/40">{type.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Brand Information */}
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">
                                    Brand Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Brand Name"
                                        value={brandName}
                                        onChange={(e) => setBrandName(e.target.value)}
                                        placeholder="Your brand name"
                                    />
                                    <Input
                                        label="Tagline"
                                        value={tagline}
                                        onChange={(e) => setTagline(e.target.value)}
                                        placeholder="Your catchy tagline"
                                    />
                                </div>
                            </div>

                            {/* Duration */}
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">
                                    Ad Duration
                                </h3>
                                <div className="flex gap-3">
                                    {DURATION_OPTIONS.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => setDuration(option.value)}
                                            className={`px-6 py-3 rounded-sm border text-sm font-medium transition-all duration-300 ${duration === option.value
                                                    ? "bg-[#F97316] border-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                                                    : "bg-white/[0.02] border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">
                                    Call to Action
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {CTA_TYPES.map((cta) => (
                                        <button
                                            key={cta.id}
                                            onClick={() => {
                                                setCtaType(cta.id);
                                                if (cta.id !== "custom") setCtaText(cta.label);
                                            }}
                                            className={`px-4 py-2 rounded-sm text-[11px] uppercase tracking-widest font-medium transition-all duration-300 ${ctaType === cta.id
                                                    ? "bg-[#F97316]/20 text-[#F97316] border border-[#F97316]/30"
                                                    : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20 hover:text-white"
                                                }`}
                                        >
                                            {cta.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Button Text"
                                        value={ctaText}
                                        onChange={(e) => setCtaText(e.target.value)}
                                        placeholder="Shop Now"
                                    />
                                    <Input
                                        label="Destination URL"
                                        value={ctaUrl}
                                        onChange={(e) => setCtaUrl(e.target.value)}
                                        placeholder="https://yourstore.com/product"
                                    />
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Products Tab */}
                    <TabPanel isActive={activeTab === "products"}>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                                    Products ({selectedProducts.length} selected)
                                </h3>
                                <Button variant="outline" size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Product
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {DUMMY_PRODUCTS.map((product) => {
                                    const isSelected = selectedProducts.includes(product.id);
                                    return (
                                        <Card
                                            key={product.id}
                                            hover
                                            onClick={() => toggleProduct(product.id)}
                                            className={`cursor-pointer transition-all duration-300 ${isSelected ? "ring-2 ring-[#F97316] bg-[#F97316]/5" : ""
                                                }`}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex gap-4">
                                                    <div className="w-16 h-16 bg-white/5 rounded-sm overflow-hidden flex-shrink-0">
                                                        {product.imageUrl ? (
                                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Package className="w-6 h-6 text-white/20" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h4 className="font-bold text-white text-sm line-clamp-1">{product.name}</h4>
                                                            {isSelected && <Check className="w-5 h-5 text-[#F97316] flex-shrink-0" />}
                                                        </div>
                                                        <p className="text-lg font-black text-white mt-1">${product.price}</p>
                                                        <Badge variant="default" size="sm" className="mt-2">{product.type}</Badge>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </TabPanel>

                    {/* Assets Tab */}
                    <TabPanel isActive={activeTab === "assets"}>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                                    AI Assets ({selectedAssets.length} selected)
                                </h3>
                                <Button variant="outline" size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Generate New
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {DUMMY_AI_ASSETS.map((asset) => {
                                    const isSelected = selectedAssets.includes(asset.id);
                                    return (
                                        <Card
                                            key={asset.id}
                                            hover
                                            onClick={() => toggleAsset(asset.id)}
                                            className={`cursor-pointer overflow-hidden transition-all duration-300 ${isSelected ? "ring-2 ring-[#F97316] bg-[#F97316]/5" : ""
                                                }`}
                                        >
                                            <div className="aspect-square bg-white/5 relative overflow-hidden">
                                                {asset.imageUrl && (
                                                    <img src={asset.imageUrl} alt={asset.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                                )}
                                                {isSelected && (
                                                    <div className="absolute top-2 right-2">
                                                        <div className="w-6 h-6 bg-[#F97316] rounded-sm flex items-center justify-center">
                                                            <Check className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="absolute bottom-2 left-2">
                                                    <Badge variant="default" size="sm">{asset.type}</Badge>
                                                </div>
                                            </div>
                                            <CardContent className="p-3">
                                                <h4 className="font-bold text-white text-sm line-clamp-1">{asset.name}</h4>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </TabPanel>

                    {/* Style Tab */}
                    <TabPanel isActive={activeTab === "style"}>
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">
                                    Video Style
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {VIDEO_STYLES.map((style) => (
                                        <button
                                            key={style.id}
                                            onClick={() => setVideoStyle(style.id)}
                                            className={`p-5 rounded-sm border text-left transition-all duration-300 ${videoStyle === style.id
                                                    ? "bg-[#F97316]/10 border-[#F97316]/50 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                                }`}
                                        >
                                            <h4 className="font-bold text-white mb-1">{style.name}</h4>
                                            <p className="text-[10px] text-white/40">{style.description}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-6 font-bold">
                                    Camera Movement
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {CAMERA_MOVEMENTS.map((movement) => (
                                        <button
                                            key={movement.id}
                                            onClick={() => setCameraMovement(movement.id)}
                                            className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ${cameraMovement === movement.id
                                                    ? "bg-[#F97316] text-white shadow-lg shadow-[#F97316]/20"
                                                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            {movement.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 font-bold">
                                    Style Preview
                                </h3>
                                <div className="p-4 bg-white/5 rounded-sm border border-white/10">
                                    <p className="text-sm text-white/50 font-mono">
                                        Style: <span className="text-[#F97316]">{videoStyle}</span> |
                                        Camera: <span className="text-[#F97316]">{cameraMovement.replace('_', ' ')}</span> |
                                        Duration: <span className="text-[#F97316]">{duration}s</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Preview Tab */}
                    <TabPanel isActive={activeTab === "preview"}>
                        <div className="space-y-6">
                            <div className="aspect-video bg-black rounded-sm border border-white/10 relative overflow-hidden">
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <Wand2 className="w-16 h-16 text-white/20 mb-4" />
                                    <p className="text-white/50">Video preview will appear here</p>
                                    <p className="text-sm text-white/30 mt-2">Generate your ad to see the preview</p>
                                </div>

                                {ctaText && (
                                    <div className="absolute bottom-6 right-6">
                                        <button className="flex items-center gap-2 px-6 py-3 bg-[#F97316] text-white rounded-sm font-bold text-sm shadow-lg shadow-[#F97316]/30 hover:bg-[#EA580C] transition-colors">
                                            {ctaText}
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-sm bg-[#F97316]/20 flex items-center justify-center">
                                                <Clock className="w-5 h-5 text-[#F97316]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Duration</p>
                                                <p className="text-xl font-black text-white">{duration}s</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-sm bg-[#10B981]/20 flex items-center justify-center">
                                                <Package className="w-5 h-5 text-[#10B981]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-widest">Products</p>
                                                <p className="text-xl font-black text-white">{selectedProducts.length}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-sm bg-blue-500/20 flex items-center justify-center">
                                                <Users className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white/40 uppercase tracking-widest">AI Assets</p>
                                                <p className="text-xl font-black text-white">{selectedAssets.length}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabPanel>

                    {/* Export Tab */}
                    <TabPanel isActive={activeTab === "export"}>
                        <div className="space-y-6">
                            <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                                Select Export Formats
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {EXPORT_FORMATS.map((format) => {
                                    const isSelected = selectedFormats.includes(format.id);
                                    const isVertical = format.aspectRatio === "9:16";
                                    const isSquare = format.aspectRatio === "1:1";

                                    return (
                                        <Card
                                            key={format.id}
                                            hover
                                            onClick={() => toggleFormat(format.id)}
                                            className={`cursor-pointer transition-all duration-300 ${isSelected ? "ring-2 ring-[#F97316] bg-[#F97316]/5" : ""
                                                }`}
                                        >
                                            <CardContent className="p-4">
                                                <div className="flex items-start gap-4">
                                                    <div className={`flex-shrink-0 bg-white/10 rounded-sm flex items-center justify-center ${isVertical ? "w-8 h-14" : isSquare ? "w-12 h-12" : "w-14 h-8"
                                                        }`}>
                                                        {isVertical ? (
                                                            <Smartphone className="w-4 h-4 text-white/50" />
                                                        ) : (
                                                            <Monitor className="w-4 h-4 text-white/50" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <div>
                                                                <h4 className="font-bold text-white">{format.name}</h4>
                                                                <p className="text-[10px] text-white/40 mt-0.5">{format.platform}</p>
                                                            </div>
                                                            {isSelected && <Check className="w-5 h-5 text-[#F97316] flex-shrink-0" />}
                                                        </div>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Badge variant="default" size="sm">{format.aspectRatio}</Badge>
                                                            <span className="text-[10px] text-white/30">Max {format.maxDuration}s</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold text-white">
                                            {selectedFormats.length} format{selectedFormats.length !== 1 ? "s" : ""} selected
                                        </p>
                                        <p className="text-sm text-white/40">
                                            Your ad will be exported in the selected formats
                                        </p>
                                    </div>
                                    <Button size="lg" disabled={selectedFormats.length === 0}>
                                        <Download className="w-4 h-4 mr-2" />
                                        Export All
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
