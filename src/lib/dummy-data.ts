export interface Campaign {
    id: string;
    name: string;
    brandName: string;
    tagline: string;
    type: "product" | "software" | "service" | "brand_awareness";
    status: "draft" | "generating" | "ready" | "published";
    duration: number;
    ctaType: string;
    ctaText: string;
    ctaUrl: string;
    createdAt: string;
    updatedAt: string;
    thumbnailUrl?: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    type: "physical" | "software" | "subscription" | "service" | "digital_download";
    imageUrl?: string;
    productUrl: string;
    features: string[];
    appearAtSeconds: number;
    durationOnScreen: number;
}

export interface AIAsset {
    id: string;
    name: string;
    type: "character" | "scene" | "product_shot";
    imageUrl: string;
    description: string;
    tags: string[];
}

export interface ExportFormat {
    id: string;
    name: string;
    platform: string;
    aspectRatio: string;
    maxDuration: number;
    description: string;
}

// Dummy Campaigns
export const DUMMY_CAMPAIGNS: Campaign[] = [
    {
        id: "camp-1",
        name: "Summer Sale Launch",
        brandName: "TechGear Pro",
        tagline: "Upgrade Your Life",
        type: "product",
        status: "ready",
        duration: 30,
        ctaType: "buy_now",
        ctaText: "Shop Now",
        ctaUrl: "https://techgearpro.com/summer-sale",
        createdAt: "2026-01-20T10:00:00Z",
        updatedAt: "2026-01-23T14:30:00Z",
        thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    },
    {
        id: "camp-2",
        name: "App Launch Campaign",
        brandName: "FitTrack",
        tagline: "Your Fitness Journey Starts Here",
        type: "software",
        status: "generating",
        duration: 60,
        ctaType: "download",
        ctaText: "Download Free",
        ctaUrl: "https://fittrack.app/download",
        createdAt: "2026-01-22T08:00:00Z",
        updatedAt: "2026-01-24T09:15:00Z",
        thumbnailUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80",
    },
    {
        id: "camp-3",
        name: "Brand Awareness Q1",
        brandName: "EcoLiving",
        tagline: "Sustainable Choices, Better Future",
        type: "brand_awareness",
        status: "draft",
        duration: 120,
        ctaType: "learn_more",
        ctaText: "Learn More",
        ctaUrl: "https://ecoliving.com/about",
        createdAt: "2026-01-24T11:00:00Z",
        updatedAt: "2026-01-24T11:00:00Z",
        thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
    },
    {
        id: "camp-4",
        name: "Premium Service Launch",
        brandName: "CloudSync Solutions",
        tagline: "Enterprise Cloud Made Simple",
        type: "service",
        status: "published",
        duration: 180,
        ctaType: "contact",
        ctaText: "Get Started",
        ctaUrl: "https://cloudsync.io/contact",
        createdAt: "2026-01-15T09:00:00Z",
        updatedAt: "2026-01-20T16:45:00Z",
        thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    },
    {
        id: "camp-5",
        name: "Holiday Special",
        brandName: "CozyCraft",
        tagline: "Handmade With Love",
        type: "product",
        status: "ready",
        duration: 15,
        ctaType: "buy_now",
        ctaText: "Order Now",
        ctaUrl: "https://cozycraft.shop/holiday",
        createdAt: "2026-01-18T14:00:00Z",
        updatedAt: "2026-01-22T10:20:00Z",
        thumbnailUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&q=80",
    },
];

// Dummy Products
export const DUMMY_PRODUCTS: Product[] = [
    {
        id: "prod-1",
        name: "Wireless Headphones Pro",
        description: "Premium noise-canceling headphones with 40-hour battery life",
        price: 299.99,
        currency: "USD",
        type: "physical",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
        productUrl: "https://example.com/headphones",
        features: ["Active Noise Cancellation", "40hr Battery", "Hi-Res Audio"],
        appearAtSeconds: 5,
        durationOnScreen: 8,
    },
    {
        id: "prod-2",
        name: "FitTrack Premium",
        description: "Annual subscription to the ultimate fitness tracking app",
        price: 79.99,
        currency: "USD",
        type: "subscription",
        imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&q=80",
        productUrl: "https://fittrack.app/premium",
        features: ["Unlimited Workouts", "AI Coach", "Meal Planning"],
        appearAtSeconds: 15,
        durationOnScreen: 10,
    },
    {
        id: "prod-3",
        name: "Smart Home Hub",
        description: "Control all your smart devices from one central hub",
        price: 149.99,
        currency: "USD",
        type: "physical",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
        productUrl: "https://example.com/smarthub",
        features: ["Voice Control", "200+ Integrations", "Energy Monitoring"],
        appearAtSeconds: 25,
        durationOnScreen: 6,
    },
];

// Dummy AI Assets
export const DUMMY_AI_ASSETS: AIAsset[] = [
    {
        id: "asset-1",
        name: "Professional Presenter",
        type: "character",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        description: "Professional male presenter in business attire",
        tags: ["professional", "male", "business"],
    },
    {
        id: "asset-2",
        name: "Lifestyle Influencer",
        type: "character",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
        description: "Young female influencer with casual style",
        tags: ["influencer", "female", "casual"],
    },
    {
        id: "asset-3",
        name: "Tech Expert",
        type: "character",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
        description: "Tech-savvy presenter for product demos",
        tags: ["tech", "male", "expert"],
    },
    {
        id: "asset-4",
        name: "Modern Office",
        type: "scene",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",
        description: "Clean modern office environment",
        tags: ["office", "modern", "professional"],
    },
    {
        id: "asset-5",
        name: "Outdoor Nature",
        type: "scene",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
        description: "Beautiful outdoor natural setting",
        tags: ["outdoor", "nature", "green"],
    },
    {
        id: "asset-6",
        name: "Product Showcase",
        type: "product_shot",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80",
        description: "Clean product showcase setup",
        tags: ["product", "minimal", "showcase"],
    },
];

// Export Formats
export const EXPORT_FORMATS: ExportFormat[] = [
    {
        id: "tiktok",
        name: "TikTok",
        platform: "TikTok",
        aspectRatio: "9:16",
        maxDuration: 60,
        description: "Vertical video optimized for TikTok feed",
    },
    {
        id: "youtube-short",
        name: "YouTube Shorts",
        platform: "YouTube",
        aspectRatio: "9:16",
        maxDuration: 60,
        description: "Vertical video for YouTube Shorts",
    },
    {
        id: "youtube-ad",
        name: "YouTube Ad",
        platform: "YouTube",
        aspectRatio: "16:9",
        maxDuration: 180,
        description: "Standard YouTube video ad format",
    },
    {
        id: "instagram-reel",
        name: "Instagram Reels",
        platform: "Instagram",
        aspectRatio: "9:16",
        maxDuration: 90,
        description: "Vertical video for Instagram Reels",
    },
    {
        id: "instagram-feed",
        name: "Instagram Feed",
        platform: "Instagram",
        aspectRatio: "1:1",
        maxDuration: 60,
        description: "Square video for Instagram feed",
    },
    {
        id: "commercial",
        name: "TV Commercial",
        platform: "Broadcast",
        aspectRatio: "16:9",
        maxDuration: 180,
        description: "Full-length commercial for broadcast",
    },
];

// Campaign Types
export const CAMPAIGN_TYPES = [
    { id: "product", name: "Physical Product", icon: "Package", description: "Sell tangible goods" },
    { id: "software", name: "Software/App", icon: "Code", description: "Promote apps & SaaS" },
    { id: "service", name: "Service", icon: "Users", description: "Advertise services" },
    { id: "brand_awareness", name: "Brand", icon: "Megaphone", description: "Build brand awareness" },
] as const;

// CTA Types
export const CTA_TYPES = [
    { id: "buy_now", label: "Buy Now" },
    { id: "learn_more", label: "Learn More" },
    { id: "download", label: "Download" },
    { id: "subscribe", label: "Subscribe" },
    { id: "contact", label: "Contact Us" },
    { id: "custom", label: "Custom" },
] as const;

// Duration Options
export const DURATION_OPTIONS = [
    { value: 15, label: "15 sec" },
    { value: 30, label: "30 sec" },
    { value: 60, label: "1 min" },
    { value: 120, label: "2 min" },
    { value: 180, label: "3 min" },
];

// Video Styles
export const VIDEO_STYLES = [
    { id: "cinematic", name: "Cinematic", description: "Smooth, professional movements" },
    { id: "dynamic", name: "Dynamic", description: "Energetic, fast-paced cuts" },
    { id: "smooth", name: "Smooth", description: "Gentle, flowing transitions" },
    { id: "static", name: "Static", description: "Minimal camera movement" },
];

// Camera Movements
export const CAMERA_MOVEMENTS = [
    { id: "pan_left", name: "Pan Left" },
    { id: "pan_right", name: "Pan Right" },
    { id: "zoom_in", name: "Zoom In" },
    { id: "zoom_out", name: "Zoom Out" },
    { id: "dolly_in", name: "Dolly In" },
    { id: "dolly_out", name: "Dolly Out" },
    { id: "orbit", name: "Orbit" },
    { id: "static", name: "Static" },
];
