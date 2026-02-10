"use client";

import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Download, Video, Calendar, FileVideo } from "lucide-react";

const DUMMY_EXPORTS = [
    {
        id: "exp-1",
        campaignName: "Summer Sale Launch",
        format: "TikTok",
        aspectRatio: "9:16",
        duration: 30,
        exportedAt: "2026-01-24T10:30:00Z",
        fileSize: "24.5 MB",
        status: "completed",
    },
    {
        id: "exp-2",
        campaignName: "Summer Sale Launch",
        format: "YouTube Ad",
        aspectRatio: "16:9",
        duration: 30,
        exportedAt: "2026-01-24T10:28:00Z",
        fileSize: "32.1 MB",
        status: "completed",
    },
    {
        id: "exp-3",
        campaignName: "App Launch Campaign",
        format: "Instagram Reels",
        aspectRatio: "9:16",
        duration: 60,
        exportedAt: "2026-01-23T15:45:00Z",
        fileSize: "48.7 MB",
        status: "completed",
    },
    {
        id: "exp-4",
        campaignName: "Premium Service Launch",
        format: "TV Commercial",
        aspectRatio: "16:9",
        duration: 180,
        exportedAt: "2026-01-20T09:15:00Z",
        fileSize: "156.2 MB",
        status: "completed",
    },
];

export default function ExportsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-black tracking-tight text-white mb-2">Export History</h1>
                <p className="text-white/50 text-sm">Download and manage your exported videos</p>
            </div>

            {/* Exports List */}
            <div className="space-y-4">
                {DUMMY_EXPORTS.map((exportItem) => (
                    <Card key={exportItem.id} hover>
                        <CardContent className="p-5">
                            <div className="flex items-center gap-5">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-sm bg-[#F97316]/20 flex items-center justify-center flex-shrink-0">
                                    <FileVideo className="w-7 h-7 text-[#F97316]" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-white">{exportItem.campaignName}</h3>
                                        <Badge variant="success" size="sm">{exportItem.status}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-white/40">
                                        <span className="flex items-center gap-1">
                                            <Video className="w-3 h-3" />
                                            {exportItem.format} ({exportItem.aspectRatio})
                                        </span>
                                        <span>{exportItem.duration}s</span>
                                        <span>{exportItem.fileSize}</span>
                                    </div>
                                </div>

                                {/* Date & Download */}
                                <div className="flex items-center gap-5">
                                    <div className="text-right">
                                        <p className="text-xs text-white/40 flex items-center gap-1 justify-end">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(exportItem.exportedAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-[10px] text-white/30">
                                            {new Date(exportItem.exportedAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <Button size="icon">
                                        <Download className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
