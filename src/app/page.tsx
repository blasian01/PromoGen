"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  Globe,
  Layers,
  Sparkles,
  Video,
  Send,
  BarChart3,
  Zap,
  Shield,
  Users,
  Building2,
  ChevronRight,
} from "lucide-react";

/* ─── Data ─── */
const PLATFORMS = [
  "Instagram",
  "TikTok",
  "YouTube",
  "X / Twitter",
  "LinkedIn",
  "Facebook",
];

const FEATURES = [
  {
    icon: Globe,
    title: "Multi-Account Publishing",
    description:
      "Connect every social account across all your projects and publish everywhere at once. No more switching tabs.",
    tag: "PUBLISH",
  },
  {
    icon: Building2,
    title: "Multi-Project Workspaces",
    description:
      "Running three SaaS apps? Keep each one in its own workspace with separate accounts, analytics, and content.",
    tag: "ORGANIZE",
  },
  {
    icon: Sparkles,
    title: "AI Ad Generation",
    description:
      "Drop in a screenshot of your product and get a scroll-stopping video ad back. No design skills, no freelancers.",
    tag: "CREATE",
  },
  {
    icon: Video,
    title: "AI UGC Creation",
    description:
      "Generate realistic user-style content with AI. The kind of authentic videos that actually convert — without hiring creators.",
    tag: "GENERATE",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description:
      "Link your social accounts for each project. Takes about 60 seconds.",
    icon: Zap,
  },
  {
    number: "02",
    title: "Create",
    description:
      "Generate ads, UGC, or write your own posts. AI handles the heavy lifting.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Publish",
    description:
      "Hit publish once — your content goes live across every connected platform.",
    icon: Send,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "19",
    description: "For your first project",
    features: [
      "3 social accounts",
      "1 project workspace",
      "50 AI generations / mo",
      "Post scheduling",
      "Basic analytics",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "49",
    description: "For devs shipping multiple products",
    features: [
      "15 social accounts",
      "5 project workspaces",
      "500 AI generations / mo",
      "Advanced analytics",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Scale",
    price: "99",
    description: "For prolific builders",
    features: [
      "Unlimited accounts",
      "Unlimited workspaces",
      "Unlimited AI generations",
      "API access",
      "Priority support",
      "Custom integrations",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
];

/* ─── Reusable container style ─── */
const container: React.CSSProperties = {
  maxWidth: 1280,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: 24,
  paddingRight: 24,
  width: "100%",
};

const containerNarrow: React.CSSProperties = {
  ...container,
  maxWidth: 1024,
};

const containerTight: React.CSSProperties = {
  ...container,
  maxWidth: 768,
};

export default function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: "#000000",
        color: "#ffffff",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ─── Navigation ─── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div
          style={{
            ...container,
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                backgroundColor: "#7DD3FC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Layers
                style={{ width: 16, height: 16, color: "#000" }}
                strokeWidth={2.5}
              />
            </div>
            <span
              style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              PromoGen
            </span>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
          >
            {["Features", "How It Works", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                style={{
                  fontSize: 14,
                  color: "#888",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#888")
                }
              >
                {item}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href="/login"
              style={{
                fontSize: 14,
                color: "#888",
                padding: "8px 16px",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              Log in
            </Link>
            <Link
              href="/login"
              style={{
                fontSize: 14,
                fontWeight: 500,
                backgroundColor: "#fff",
                color: "#000",
                padding: "8px 20px",
                borderRadius: 8,
                textDecoration: "none",
                transition: "background-color 0.3s",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section
          style={{
            position: "relative",
            paddingTop: 180,
            paddingBottom: 80,
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: 40,
              left: "50%",
              transform: "translateX(-50%)",
              width: 800,
              height: 400,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(125, 211, 252, 0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Severance grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          <div style={{ ...containerNarrow, textAlign: "center", position: "relative", zIndex: 10 }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 100,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                color: "#7DD3FC",
                marginBottom: 40,
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "flex",
                  width: 6,
                  height: 6,
                }}
              >
                <span
                  className="animate-ping"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    backgroundColor: "#7DD3FC",
                    opacity: 0.75,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#7DD3FC",
                  }}
                />
              </span>
              Now in Beta
            </div>

            <h1
              style={{
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                marginBottom: 32,
              }}
            >
              One platform.
              <br />
              <span className="gradient-text">Every channel.</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#888",
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 48,
                lineHeight: 1.7,
              }}
            >
              Manage social accounts across all your projects, publish everywhere
              at once, and create AI-powered ads and UGC — built for solo devs
              shipping fast.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <Link
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#7DD3FC",
                  color: "#000",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: 10,
                  textDecoration: "none",
                  boxShadow:
                    "0 0 30px rgba(125, 211, 252, 0.2), 0 0 60px rgba(125, 211, 252, 0.05)",
                  transition: "all 0.3s",
                }}
              >
                Start Free Trial
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.7)",
                  padding: "14px 32px",
                  borderRadius: 10,
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div style={{ ...containerNarrow, marginTop: 80 }}>
            <div
              style={{
                borderRadius: 16,
                border: "1px solid rgba(255, 255, 255, 0.08)",
                backgroundColor: "#0A0A0A",
                padding: 4,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  backgroundColor: "#111",
                  overflow: "hidden",
                }}
              >
                {/* Mock toolbar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", gap: 6 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#333",
                      }}
                    />
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#333",
                      }}
                    />
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: "#333",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#1a1a1a",
                        borderRadius: 6,
                        padding: "4px 16px",
                        fontSize: 12,
                        color: "#555",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      app.promogen.io/dashboard
                    </div>
                  </div>
                </div>

                {/* Mock dashboard content */}
                <div style={{ padding: "24px 32px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "200px 1fr",
                      gap: 16,
                    }}
                  >
                    {/* Sidebar mock */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#1a1a1a",
                          borderRadius: 8,
                          padding: 12,
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              backgroundColor: "rgba(125,211,252,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Building2
                              style={{
                                width: 12,
                                height: 12,
                                color: "#7DD3FC",
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: "#888",
                            }}
                          >
                            Workspaces
                          </span>
                        </div>
                        {["Acme SaaS", "Bolt Studio", "Cloud Nine"].map(
                          (name, i) => (
                            <div
                              key={name}
                              style={{
                                fontSize: 12,
                                padding: "6px 8px",
                                borderRadius: 6,
                                marginBottom: 4,
                                backgroundColor:
                                  i === 0
                                    ? "rgba(125,211,252,0.1)"
                                    : "transparent",
                                color: i === 0 ? "#7DD3FC" : "#555",
                              }}
                            >
                              {name}
                            </div>
                          )
                        )}
                      </div>
                      <div
                        style={{
                          backgroundColor: "#1a1a1a",
                          borderRadius: 8,
                          padding: 12,
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 6,
                              backgroundColor: "rgba(255,255,255,0.05)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <BarChart3
                              style={{
                                width: 12,
                                height: 12,
                                color: "#555",
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: "#888",
                            }}
                          >
                            Analytics
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: 4,
                            height: 48,
                          }}
                        >
                          {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                            <div
                              key={i}
                              style={{
                                flex: 1,
                                borderRadius: 2,
                                height: `${h}%`,
                                background:
                                  i === 6
                                    ? "rgba(125,211,252,0.5)"
                                    : "rgba(255,255,255,0.06)",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Main content mock */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#1a1a1a",
                          borderRadius: 8,
                          padding: 16,
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                          }}
                        >
                          <span style={{ fontSize: 14, fontWeight: 500 }}>
                            Recent Campaigns
                          </span>
                          <span
                            style={{ fontSize: 12, color: "#7DD3FC" }}
                          >
                            View All
                          </span>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 12,
                          }}
                        >
                          {[
                            {
                              label: "Summer Launch",
                              status: "Published",
                              platforms: 5,
                            },
                            {
                              label: "Product Update",
                              status: "Scheduled",
                              platforms: 3,
                            },
                            {
                              label: "AI UGC Series",
                              status: "Draft",
                              platforms: 0,
                            },
                          ].map((item) => (
                            <div
                              key={item.label}
                              style={{
                                backgroundColor: "#222",
                                borderRadius: 8,
                                padding: 12,
                                border: "1px solid rgba(255,255,255,0.04)",
                              }}
                            >
                              <div
                                style={{
                                  width: "100%",
                                  aspectRatio: "16/9",
                                  borderRadius: 6,
                                  backgroundColor: "#2a2a2a",
                                  marginBottom: 8,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Sparkles
                                  style={{
                                    width: 20,
                                    height: 20,
                                    color: "#333",
                                  }}
                                />
                              </div>
                              <p
                                style={{
                                  fontSize: 12,
                                  fontWeight: 500,
                                  marginBottom: 4,
                                }}
                              >
                                {item.label}
                              </p>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 10,
                                    padding: "2px 6px",
                                    borderRadius: 100,
                                    backgroundColor:
                                      item.status === "Published"
                                        ? "rgba(34,197,94,0.1)"
                                        : item.status === "Scheduled"
                                          ? "rgba(125,211,252,0.1)"
                                          : "rgba(255,255,255,0.05)",
                                    color:
                                      item.status === "Published"
                                        ? "#4ade80"
                                        : item.status === "Scheduled"
                                          ? "#7DD3FC"
                                          : "#555",
                                  }}
                                >
                                  {item.status}
                                </span>
                                {item.platforms > 0 && (
                                  <span style={{ fontSize: 10, color: "#555" }}>
                                    {item.platforms} platforms
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: 12,
                        }}
                      >
                        {[
                          {
                            label: "Total Reach",
                            value: "284K",
                            change: "+12%",
                          },
                          {
                            label: "Engagement",
                            value: "18.4%",
                            change: "+3.2%",
                          },
                          {
                            label: "AI Credits",
                            value: "420",
                            change: "of 500",
                          },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            style={{
                              backgroundColor: "#1a1a1a",
                              borderRadius: 8,
                              padding: 16,
                              border: "1px solid rgba(255, 255, 255, 0.06)",
                            }}
                          >
                            <p
                              style={{
                                fontSize: 10,
                                textTransform: "uppercase" as const,
                                letterSpacing: "0.1em",
                                color: "#555",
                                marginBottom: 4,
                              }}
                            >
                              {stat.label}
                            </p>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: 8,
                              }}
                            >
                              <span
                                style={{ fontSize: 20, fontWeight: 600 }}
                              >
                                {stat.value}
                              </span>
                              <span style={{ fontSize: 10, color: "#7DD3FC" }}>
                                {stat.change}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Platform Integrations ─── */}
        <section
          style={{
            padding: "64px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={container}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#555",
                textAlign: "center",
                marginBottom: 40,
              }}
            >
              Publish to every major platform
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "24px 64px",
              }}
            >
              {PLATFORMS.map((platform) => (
                <span
                  key={platform}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#444",
                    cursor: "default",
                    transition: "color 0.3s",
                  }}
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="features" style={{ padding: "120px 0" }}>
          <div style={container}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: "#7DD3FC",
                  marginBottom: 16,
                }}
              >
                Features
              </p>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}
              >
                Everything you need.
                <br />
                <span style={{ color: "#555" }}>Nothing you don&apos;t.</span>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
                gap: 16,
              }}
            >
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass-card"
                    style={{
                      borderRadius: 16,
                      padding: 32,
                      cursor: "default",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 20,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "border-color 0.3s",
                        }}
                      >
                        <Icon
                          style={{ width: 20, height: 20, color: "#7DD3FC" }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase" as const,
                          color: "#555",
                        }}
                      >
                        {feature.tag}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 12,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#888",
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section
          id="how-it-works"
          style={{
            padding: "120px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            position: "relative",
          }}
        >
          {/* Severance grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          <div style={{ ...container, position: "relative", zIndex: 10 }}>
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: "#7DD3FC",
                  marginBottom: 16,
                }}
              >
                How It Works
              </p>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                Three steps. Infinite reach.
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: 24,
              }}
            >
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="glass-card"
                    style={{ borderRadius: 16, padding: 32 }}
                  >
                    <span
                      style={{
                        fontSize: 48,
                        fontWeight: 900,
                        color: "rgba(255,255,255,0.04)",
                        display: "block",
                        marginBottom: 24,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {step.number}
                    </span>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        backgroundColor: "rgba(125,211,252,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 20,
                      }}
                    >
                      <Icon
                        style={{ width: 20, height: 20, color: "#7DD3FC" }}
                      />
                    </div>
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 12,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#888",
                        lineHeight: 1.7,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Social Proof ─── */}
        <section
          style={{
            padding: "96px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={container}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 32,
                textAlign: "center",
              }}
            >
              {[
                { value: "10K+", label: "Active Users" },
                { value: "2M+", label: "Posts Published" },
                { value: "500K+", label: "AI Assets Created" },
                { value: "99.9%", label: "Uptime SLA" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="gradient-text-subtle"
                    style={{
                      fontSize: "clamp(28px, 4vw, 40px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      marginBottom: 8,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#555",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.12em",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section
          id="pricing"
          style={{
            padding: "120px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={container}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: "#7DD3FC",
                  marginBottom: 16,
                }}
              >
                Pricing
              </p>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  marginBottom: 16,
                }}
              >
                Simple, transparent pricing.
              </h2>
              <p style={{ color: "#888", maxWidth: 480, margin: "0 auto" }}>
                Start free. Scale as you grow. No hidden fees.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
                gap: 16,
                maxWidth: 1024,
                margin: "0 auto",
              }}
            >
              {PRICING.map((plan) => (
                <div
                  key={plan.name}
                  className={plan.popular ? "pricing-popular" : ""}
                  style={{
                    borderRadius: 16,
                    padding: 32,
                    border: plan.popular
                      ? "1px solid rgba(125,211,252,0.3)"
                      : "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: plan.popular
                      ? "rgba(125,211,252,0.03)"
                      : "#0A0A0A",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {plan.popular && (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase" as const,
                        color: "#7DD3FC",
                        marginBottom: 16,
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                  <h3
                    style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#555",
                      marginBottom: 24,
                    }}
                  >
                    {plan.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 4,
                      marginBottom: 32,
                    }}
                  >
                    <span style={{ fontSize: 40, fontWeight: 700 }}>
                      ${plan.price}
                    </span>
                    <span style={{ fontSize: 14, color: "#555" }}>/mo</span>
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      marginBottom: 32,
                      flex: 1,
                    }}
                  >
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          fontSize: 14,
                          color: "#888",
                        }}
                      >
                        <Check
                          style={{
                            width: 16,
                            height: 16,
                            color: "#7DD3FC",
                            flexShrink: 0,
                          }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/login"
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "center",
                      fontSize: 14,
                      fontWeight: 600,
                      padding: "12px 0",
                      borderRadius: 8,
                      textDecoration: "none",
                      transition: "all 0.3s",
                      ...(plan.popular
                        ? {
                          backgroundColor: "#7DD3FC",
                          color: "#000",
                          boxShadow:
                            "0 0 30px rgba(125,211,252,0.2), 0 0 60px rgba(125,211,252,0.05)",
                        }
                        : {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }),
                    }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Security Section ─── */}
        <section
          style={{
            padding: "96px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ ...containerTight, textAlign: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: 24,
              }}
            >
              <Shield style={{ width: 28, height: 28, color: "#7DD3FC" }} />
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              Enterprise-grade security
            </h2>
            <p
              style={{
                color: "#888",
                maxWidth: 480,
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              SOC 2 compliant. End-to-end encryption. Your data never leaves
              your control. Built for builders who take security seriously.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
              }}
            >
              {["SOC 2", "GDPR", "Encrypted", "SSO Ready"].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#555",
                    padding: "8px 16px",
                    borderRadius: 100,
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section
          style={{
            padding: "120px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(125,211,252,0.04) 0%, transparent 60%)",
            }}
          />
          <div
            style={{
              ...containerTight,
              textAlign: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(36px, 6vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                marginBottom: 24,
                lineHeight: 1.1,
              }}
            >
              Ready to take
              <br />
              <span className="gradient-text">control?</span>
            </h2>
            <p
              style={{
                color: "#888",
                fontSize: 18,
                maxWidth: 400,
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              Start your free trial today. No credit card required. Set up in
              under 60 seconds.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <Link
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#7DD3FC",
                  color: "#000",
                  fontSize: 14,
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: 10,
                  textDecoration: "none",
                  boxShadow:
                    "0 0 30px rgba(125,211,252,0.2), 0 0 60px rgba(125,211,252,0.05)",
                  transition: "all 0.3s",
                }}
              >
                Get Started Free
                <ArrowRight style={{ width: 16, height: 16 }} />
              </Link>
              <Link
                href="#pricing"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#888",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
              >
                View pricing
                <ChevronRight style={{ width: 16, height: 16 }} />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer
          style={{
            padding: "48px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={container}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 32,
                marginBottom: 40,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    backgroundColor: "rgba(125,211,252,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Layers
                    style={{ width: 14, height: 14, color: "#7DD3FC" }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  PromoGen
                </span>
              </div>
              <div style={{ display: "flex", gap: 32 }}>
                {["Privacy", "Terms", "Twitter", "GitHub"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{
                      fontSize: 14,
                      color: "#555",
                      textDecoration: "none",
                      transition: "color 0.3s",
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                fontSize: 12,
                color: "#333",
              }}
            >
              <p>© 2025 PromoGen Inc. All rights reserved.</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Users style={{ width: 12, height: 12 }} />
                Built for indie devs
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
