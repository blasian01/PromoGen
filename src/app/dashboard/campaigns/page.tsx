"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Card, CardContent, Badge } from "@/components/ui";
import { DUMMY_CAMPAIGNS } from "@/lib/dummy-data";
import { Plus, Search, Video, Clock, Edit3, Copy, Eye } from "lucide-react";

const STATUS_VARIANTS: Record<string, "success" | "warning" | "info" | "default"> = {
    published: "success",
    ready: "success",
    generating: "info",
    draft: "warning",
};

const TYPE_LABELS: Record<string, string> = {
    product: "Product",
    software: "Software",
    service: "Service",
    brand_awareness: "Brand",
};

export default function CampaignsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    const filteredCampaigns = DUMMY_CAMPAIGNS.filter((campaign) => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.brandName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === "all" || campaign.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white mb-2">Campaigns</h1>
                    <p className="text-white/50 text-sm">Manage all your ad campaigns</p>
                </div>
                <Link href="/dashboard/campaigns/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        New Campaign
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search campaigns..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-11 pr-4 bg-white/5 border border-white/10 rounded-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F97316]/50 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "draft", "generating", "ready", "published"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${selectedStatus === status
                                    ? "bg-white/10 text-white"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Campaigns Grid */}
            {filteredCampaigns.length === 0 ? (
                <div className="text-center py-20">
                    <Video className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">No campaigns found</h3>
                    <p className="text-white/40 mb-6">
                        {searchQuery ? "Try adjusting your search or filters" : "Create your first campaign to get started"}
                    </p>
                    <Link href="/dashboard/campaigns/new">
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Create Campaign
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCampaigns.map((campaign) => (
                        <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`}>
                            <Card hover className="h-full overflow-hidden group">
                                {/* Thumbnail */}
                                <div className="aspect-video bg-white/5 relative overflow-hidden">
                                    {campaign.thumbnailUrl ? (
                                        <img
                                            src={campaign.thumbnailUrl}
                                            alt={campaign.name}
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Video className="w-12 h-12 text-white/20" />
                                        </div>
                                    )}

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button className="p-2.5 bg-white/10 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-colors border border-white/10">
                                            <Edit3 className="w-4 h-4 text-white" />
                                        </button>
                                        <button className="p-2.5 bg-white/10 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-colors border border-white/10">
                                            <Eye className="w-4 h-4 text-white" />
                                        </button>
                                        <button className="p-2.5 bg-white/10 backdrop-blur-sm rounded-sm hover:bg-white/20 transition-colors border border-white/10">
                                            <Copy className="w-4 h-4 text-white" />
                                        </button>
                                    </div>

                                    <div className="absolute top-3 left-3">
                                        <Badge variant={STATUS_VARIANTS[campaign.status] || "default"}>
                                            {campaign.status}
                                        </Badge>
                                    </div>

                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-sm text-white text-[10px] font-medium">
                                        <Clock className="w-3 h-3" />
                                        {campaign.duration}s
                                    </div>
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="font-bold text-white mb-1 line-clamp-1">{campaign.name}</h3>
                                    <p className="text-xs text-white/50 mb-3">{campaign.brandName}</p>
                                    <div className="flex items-center justify-between">
                                        <Badge variant="default" size="md">
                                            {TYPE_LABELS[campaign.type] || campaign.type}
                                        </Badge>
                                        <span className="text-[10px] text-white/30">
                                            {new Date(campaign.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
