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
      "Connect all your social accounts and publish to every platform simultaneously. One click, everywhere at once.",
    tag: "PUBLISH",
  },
  {
    icon: Building2,
    title: "Multi-Project Workspaces",
    description:
      "Manage multiple SaaS businesses, brands, or clients from a single unified dashboard with isolated workspaces.",
    tag: "ORGANIZE",
  },
  {
    icon: Sparkles,
    title: "AI Ad Generation",
    description:
      "Transform static product photos into cinematic video ads using state-of-the-art generative AI. Zero production costs.",
    tag: "CREATE",
  },
  {
    icon: Video,
    title: "AI UGC Creation",
    description:
      "Generate authentic user-generated-style content with AI. Realistic, scroll-stopping videos that convert.",
    tag: "GENERATE",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description:
      "Link your social accounts and organize them into project workspaces.",
    icon: Zap,
  },
  {
    number: "02",
    title: "Create",
    description:
      "Use AI to generate ads, UGC content, or craft your own posts with our editor.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Publish",
    description:
      "Push content to all connected platforms simultaneously with one click.",
    icon: Send,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "29",
    description: "For solopreneurs and small projects",
    features: [
      "3 social accounts",
      "1 project workspace",
      "50 AI generations / mo",
      "Basic analytics",
      "Schedule posts",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "79",
    description: "For growing teams and agencies",
    features: [
      "15 social accounts",
      "5 project workspaces",
      "500 AI generations / mo",
      "Advanced analytics",
      "Team collaboration",
      "Priority support",
      "Custom branding",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "249",
    description: "For large organizations",
    features: [
      "Unlimited accounts",
      "Unlimited workspaces",
      "Unlimited AI generations",
      "White-label solution",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "SSO & advanced security",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* ─── Navigation ─── */}
      <header className="fixed top-0 w-full z-50 glass-panel">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#7DD3FC] flex items-center justify-center">
              <Layers className="w-4 h-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              PromoGen
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              className="text-sm text-[#888] hover:text-white transition-colors duration-300"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-sm text-[#888] hover:text-white transition-colors duration-300"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a
              className="text-sm text-[#888] hover:text-white transition-colors duration-300"
              href="#pricing"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-[#888] hover:text-white px-4 py-2 transition-colors duration-300"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium bg-white text-black px-5 py-2 rounded-lg hover:bg-[#e5e5e5] transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-32 overflow-hidden severance-grid">
          {/* Background glow */}
          <div
            className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full animate-drift pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(125, 211, 252, 0.06) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs font-medium tracking-widest uppercase text-[#7DD3FC] mb-10 animate-fade-in-down">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7DD3FC] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7DD3FC]" />
              </span>
              Now in Beta
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-[-0.04em] mb-8 animate-fade-in-up"
              style={{ lineHeight: 1.05, animationDelay: "0.1s", opacity: 0 }}
            >
              One platform.
              <br />
              <span className="gradient-text">Every channel.</span>
            </h1>

            <p
              className="text-lg lg:text-xl text-[#888] max-w-2xl mx-auto mb-14 leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.25s", opacity: 0 }}
            >
              Manage all your social accounts, publish everywhere at once, and
              create AI-powered ads and UGC — built for teams running multiple
              projects.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.4s", opacity: 0 }}
            >
              <Link
                href="/login"
                className="w-full sm:w-auto bg-[#7DD3FC] text-black text-sm font-semibold px-8 py-3.5 rounded-lg hover:bg-[#38BDF8] transition-all duration-300 flex items-center justify-center gap-2 glow-accent"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="w-full sm:w-auto text-sm font-medium text-white/70 px-8 py-3.5 rounded-lg border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div
            className="max-w-5xl mx-auto px-6 mt-20 animate-fade-in-up"
            style={{ animationDelay: "0.6s", opacity: 0 }}
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-1 shadow-2xl shadow-black/50">
              <div className="rounded-xl bg-[#111] overflow-hidden">
                {/* Mock toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#333]" />
                    <div className="w-3 h-3 rounded-full bg-[#333]" />
                    <div className="w-3 h-3 rounded-full bg-[#333]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-[#1a1a1a] rounded-md px-4 py-1 text-xs text-[#555] border border-white/[0.06]">
                      app.promogen.io/dashboard
                    </div>
                  </div>
                </div>

                {/* Mock dashboard content */}
                <div className="p-6 lg:p-8">
                  <div className="grid grid-cols-12 gap-4">
                    {/* Sidebar mock */}
                    <div className="col-span-3 hidden lg:flex flex-col gap-3">
                      <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/[0.06]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-md bg-[#7DD3FC]/20 flex items-center justify-center">
                            <Building2 className="w-3 h-3 text-[#7DD3FC]" />
                          </div>
                          <span className="text-xs font-medium text-[#888]">
                            Workspaces
                          </span>
                        </div>
                        {["Acme SaaS", "Bolt Studio", "Cloud Nine"].map(
                          (name, i) => (
                            <div
                              key={name}
                              className={`text-xs py-1.5 px-2 rounded-md mb-1 ${i === 0
                                  ? "bg-[#7DD3FC]/10 text-[#7DD3FC]"
                                  : "text-[#555]"
                                }`}
                            >
                              {name}
                            </div>
                          )
                        )}
                      </div>
                      <div className="bg-[#1a1a1a] rounded-lg p-3 border border-white/[0.06]">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center">
                            <BarChart3 className="w-3 h-3 text-[#555]" />
                          </div>
                          <span className="text-xs font-medium text-[#888]">
                            Analytics
                          </span>
                        </div>
                        <div className="flex items-end gap-1 h-12">
                          {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-sm"
                              style={{
                                height: `${h}%`,
                                background:
                                  i === 6
                                    ? "rgba(125, 211, 252, 0.5)"
                                    : "rgba(255, 255, 255, 0.06)",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Main content mock */}
                    <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
                      <div className="bg-[#1a1a1a] rounded-lg p-4 border border-white/[0.06]">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium">
                            Recent Campaigns
                          </span>
                          <span className="text-xs text-[#7DD3FC]">
                            View All
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
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
                              className="bg-[#222] rounded-lg p-3 border border-white/[0.04]"
                            >
                              <div className="w-full aspect-video rounded-md bg-[#2a2a2a] mb-2 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-[#333]" />
                              </div>
                              <p className="text-xs font-medium mb-1">
                                {item.label}
                              </p>
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.status === "Published"
                                      ? "bg-green-500/10 text-green-400"
                                      : item.status === "Scheduled"
                                        ? "bg-[#7DD3FC]/10 text-[#7DD3FC]"
                                        : "bg-white/5 text-[#555]"
                                    }`}
                                >
                                  {item.status}
                                </span>
                                {item.platforms > 0 && (
                                  <span className="text-[10px] text-[#555]">
                                    {item.platforms} platforms
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: "Total Reach", value: "284K", change: "+12%" },
                          { label: "Engagement", value: "18.4%", change: "+3.2%" },
                          { label: "AI Credits", value: "420", change: "of 500" },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            className="bg-[#1a1a1a] rounded-lg p-4 border border-white/[0.06]"
                          >
                            <p className="text-[10px] uppercase tracking-wider text-[#555] mb-1">
                              {stat.label}
                            </p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-semibold">
                                {stat.value}
                              </span>
                              <span className="text-[10px] text-[#7DD3FC]">
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
        <section className="py-16 border-y border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#555] text-center mb-10">
              Publish to every major platform
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
              {PLATFORMS.map((platform) => (
                <span
                  key={platform}
                  className="text-sm font-medium text-[#444] hover:text-[#7DD3FC] transition-colors duration-300 cursor-default"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="features" className="py-24 lg:py-32 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#7DD3FC] mb-4">
                Features
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.03em] mb-6">
                Everything you need.
                <br />
                <span className="text-[#555]">Nothing you don&apos;t.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="glass-card rounded-2xl p-8 group cursor-default"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-[#7DD3FC]/30 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-[#7DD3FC]" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#555]">
                        {feature.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#888] leading-relaxed">
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
          className="py-24 lg:py-32 border-t border-white/[0.06] severance-grid"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#7DD3FC] mb-4">
                How It Works
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.03em]">
                Three steps. Infinite reach.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative group">
                    <div className="glass-card rounded-2xl p-8 h-full">
                      <span className="text-5xl font-black text-white/[0.04] block mb-6 tracking-tighter">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#7DD3FC]/10 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-[#7DD3FC]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[#888] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Social Proof ─── */}
        <section className="py-24 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10K+", label: "Active Users" },
                { value: "2M+", label: "Posts Published" },
                { value: "500K+", label: "AI Assets Created" },
                { value: "99.9%", label: "Uptime SLA" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl lg:text-4xl font-bold tracking-tight gradient-text-subtle mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#555] uppercase tracking-wider font-medium">
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
          className="py-24 lg:py-32 border-t border-white/[0.06]"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#7DD3FC] mb-4">
                Pricing
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.03em] mb-4">
                Simple, transparent pricing.
              </h2>
              <p className="text-[#888] max-w-lg mx-auto">
                Start free. Scale as you grow. No hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {PRICING.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl p-8 border flex flex-col ${plan.popular
                      ? "pricing-popular"
                      : "border-white/[0.08] bg-[#0A0A0A]"
                    }`}
                >
                  {plan.popular && (
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#7DD3FC] mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                  <p className="text-xs text-[#555] mb-6">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-sm text-[#555]">/mo</span>
                  </div>
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-[#888]"
                      >
                        <Check className="w-4 h-4 text-[#7DD3FC] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/login"
                    className={`w-full text-center text-sm font-semibold py-3 rounded-lg transition-all duration-300 ${plan.popular
                        ? "bg-[#7DD3FC] text-black hover:bg-[#38BDF8] glow-accent"
                        : "bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.08]"
                      }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Security Section ─── */}
        <section className="py-24 border-t border-white/[0.06]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6">
              <Shield className="w-7 h-7 text-[#7DD3FC]" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
              Enterprise-grade security
            </h2>
            <p className="text-[#888] max-w-lg mx-auto mb-10">
              SOC 2 compliant. End-to-end encryption. Your data never leaves
              your control. Built for teams that take security seriously.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {["SOC 2", "GDPR", "Encrypted", "SSO Ready"].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-medium text-[#555] px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.02]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(125, 211, 252, 0.04) 0%, transparent 60%)",
            }}
          />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-[-0.04em] mb-6">
              Ready to take
              <br />
              <span className="gradient-text">control?</span>
            </h2>
            <p className="text-[#888] text-lg max-w-md mx-auto mb-10">
              Start your free trial today. No credit card required. Set up in
              under 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto bg-[#7DD3FC] text-black text-sm font-semibold px-8 py-3.5 rounded-lg hover:bg-[#38BDF8] transition-all duration-300 flex items-center justify-center gap-2 glow-accent"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#pricing"
                className="w-full sm:w-auto text-sm font-medium text-[#888] hover:text-white flex items-center justify-center gap-1 transition-colors duration-300"
              >
                View pricing
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="py-12 border-t border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-[#7DD3FC]/20 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5 text-[#7DD3FC]" />
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  PromoGen
                </span>
              </div>
              <div className="flex gap-8">
                {["Privacy", "Terms", "Twitter", "GitHub"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm text-[#555] hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#333]">
              <p>© 2025 PromoGen Inc. All rights reserved.</p>
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                Built for modern teams
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
