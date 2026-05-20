import { useState, useMemo, useEffect } from "react";

const C = {
  bg: "#faf9f6", card: "#ffffff", coral: "#FF6845", coralLight: "#FFF0EB",
  purple: "#7B5CF6", purpleLight: "#F0EEFF", purpleMid: "#A78BFA",
  blue: "#4A8CF5", blueLight: "#EEF4FF", gold: "#F59E0B",
  green: "#22C55E", greenLight: "#DCFCE7",
  text: "#1a1c1a", muted: "#4b463d", border: "#cec5ba", navBg: "#ffffff",
  primary: "#685d4a", primaryContainer: "#f7e7ce", secondary: "#575e72",
  secondaryContainer: "#dbe2fa", tertiary: "#6d595b", tertiaryContainer: "#fee3e5",
  outline: "#7d766c", error: "#ba1a1a",
};

const events = [
  {
    id:1, name:"Rooftop Brunch & Beats", time:"Today · 11:00 AM",
    distance:"0.4 mi", going:4, friends:3,
    tags:["Brunch","Music","Great crowd"],
    gradient:"linear-gradient(145deg,#FF9A72,#FF6845,#E8445A)",
    image:"https://lh3.googleusercontent.com/aida-public/AB6AXuCNXbnHuvMdL_sLx2IFn5gZOu94v98GBbyOVMnuGraTCW2rD_HA0Pz2anGL90b-lqPz__saikr6eTQIQadVx-D8N90Xcv82Tv6r7WWrEzRQ2XxtZSepS1RIZWlzWxMVvFgYbAaDfCwQpU2lzWEzzotU-LhgZLZqRk1CwBdZmzRSfCF67c4NFc4TjY8Is5A2GimMR0NesmMIKWncGAbR9G49VW6lSUp-GCzBg4CD9Vb7A9YMz6e_j2e6afI1BN_EMetZoCL4ur4T4qw",
    activityType:"food",   energyLevel:2, crowdCategory:"medium",
    newcomerFriendly:0.80, safetyScore:0.92, timeCategory:"morning",
    distanceMiles:0.4, distanceTier:1, costLevel:2,
  },
  {
    id:2, name:"Sunset Beach Jam", time:"Today · 6:30 PM",
    distance:"1.2 mi", going:6, friends:3,
    tags:["Live Music","Beach","Chill Vibes"],
    gradient:"linear-gradient(145deg,#FFD54F,#FF8A00,#FF5722)",
    image:"https://lh3.googleusercontent.com/aida-public/AB6AXuB0EDUYMbNsqMJ0dhCXOaM9o4lfOs5hfcyRP58wznX-SgkpJcdGLYlFPxU0rmyO20tHta-HdDfAcqRA-As2xzYSCiL_Mh7ryrfLYOCwuMkHkLzxm7XOgFJlcLgnmPt3asXY6OvpAEqsYllHEgAhyOsP1kdGS5l8aPmEjQE1CtS-UxCvQoqWUA2BY2jxgIxRpTLMPBRHndovXqBu-LQc7VO8bgXXkjKv83d7xMeJ_z3ORVTCC6y9GyuHFI1iA9Hg_yyPC-7EngHCgyI",
    activityType:"music",  energyLevel:2, crowdCategory:"medium",
    newcomerFriendly:0.85, safetyScore:0.88, timeCategory:"evening",
    distanceMiles:1.2, distanceTier:2, costLevel:0,
  },
  {
    id:3, name:"Garden Dinner Party", time:"Today · 7:00 PM",
    distance:"0.5 mi", going:5, friends:2,
    tags:["Dinner","Social","Outdoor"],
    gradient:"linear-gradient(145deg,#81C784,#388E3C,#1B5E20)",
    image:"https://lh3.googleusercontent.com/aida-public/AB6AXuBQJjnSn0pR0oC8yUGhiGIXqNByk7jHep4LL0yYLF35sbx4n-8Bxnh9sFo0njn5ns5XoXkQ1gwqo7L1Re4xAK0FjEvPVfTYZ7v4lXwbk-NhlSnDB9TWDhe5Pwj8hyeDBvTwPWD2VAI4hgBwAGYqzL0kk4dqaUu_xuIF-UyPGHHZbIF5wYRKR5L4I1h8iDJzZIH9PzQViHWst3jg8gA7eZutwPHqXi9Ut4Vy7SYNiDolX96qh-oSy6bhzbbCcNHchAxhkHp5sJbr0aA",
    activityType:"food",   energyLevel:2, crowdCategory:"small",
    newcomerFriendly:0.65, safetyScore:0.95, timeCategory:"evening",
    distanceMiles:0.5, distanceTier:1, costLevel:2,
  },
  {
    id:4, name:"Wine & Paint Evening", time:"Tonight · 8:00 PM",
    distance:"0.6 mi", going:8, friends:1,
    tags:["Art","Wine","Creative"],
    gradient:"linear-gradient(145deg,#CE93D8,#9C27B0,#6A1B9A)",
    image:"https://lh3.googleusercontent.com/aida-public/AB6AXuAcjOKLDZh1-vH6YDAqcnsAB9p-5KPdxN_mEvGW4VHt40rDQcbAwz5vWem8PreZSoywlyG992YJKVyxO2VDJMzf4SED61d_GbVwKWp6-lxtdwoukhJeBK1WBccU1xTctiK7UJD342k69F-eFsLshqOxMpdQr26zBTj_YopJESbUB3etdT5tXSuMdQ5Y873Vty7LzlVJBaYmm-Rd6U5ACN2KXsybQozyHbKI9GpOlRRx3GtYKwVKBJlxmbvTU0Xu5TRuf9jYM5UueA8",
    activityType:"art",    energyLevel:2, crowdCategory:"small",
    newcomerFriendly:0.72, safetyScore:0.90, timeCategory:"night",
    distanceMiles:0.6, distanceTier:1, costLevel:2,
  },
];

// ─── AURA SCORING ENGINE ──────────────────────────────────────────────────

const INTEREST_KEYWORDS = {
  food:    ["food","brunch","dinner","drinks","wine","cocktail","eats"],
  music:   ["music","jazz","dance","beats","live","dj","concert"],
  art:     ["art","paint","gallery","culture","creative","design","craft"],
  outdoor: ["outdoor","beach","park","hike","trail","nature","run"],
};

function scoreInterestFit(profile, event) {
  // Direct activity type match → full score
  if (event.activityType === profile.q1) return 1.0;
  // Keyword overlap in tags
  const keywords = INTEREST_KEYWORDS[profile.q1] || [];
  const allTags  = (event.tags || []).map(t => t.toLowerCase());
  const overlap  = allTags.filter(t => keywords.some(k => t.includes(k))).length;
  return overlap > 0 ? 0.62 : 0.18;
}

function scoreCurrentVibe(profile, event) {
  // profile.q2 is 1–4; event.energyLevel is 1–4
  const diff = Math.abs(profile.q2 - event.energyLevel);
  return 1 - diff / 3;
}

function scoreCrowdCompatibility(profile, event) {
  // Crowd size fit
  const sizeOk = {
    intimate: ["intimate","small"],
    small:    ["small","medium"],
    medium:   ["medium","large"],
    large:    ["large"],
  };
  const crowdFit = (sizeOk[profile.q3] || []).includes(event.crowdCategory) ? 1.0 : 0.38;

  // Intent fit
  const nf = event.newcomerFriendly; // 0–1
  let intentFit;
  if      (profile.q4 === "meet"    && nf >= 0.70) intentFit = 1.00;
  else if (profile.q4 === "meet"    && nf <  0.70) intentFit = 0.45;
  else if (profile.q4 === "friends" && nf <  0.60) intentFit = 0.90;
  else if (profile.q4 === "friends")                intentFit = 0.55;
  else if (profile.q4 === "explore")                intentFit = 0.78;
  else if (profile.q4 === "romance" && nf >= 0.65) intentFit = 0.82;
  else                                              intentFit = 0.50;

  return crowdFit * 0.50 + intentFit * 0.50;
}

function scoreTrustSafety(profile, event) {
  // profile.q8 is 1–4 (closed → fully open); normalize to 0–1
  const userOpen  = (profile.q8 - 1) / 3;
  const eventOpen = event.newcomerFriendly;
  // Penalty proportional to mismatch; halved because safety leans safe
  return 1 - Math.abs(userOpen - eventOpen) * 0.45;
}

function scoreFriendGraph(event) {
  // event.friends = how many friends are going
  return Math.min(1, (event.friends || 0) / 4);
}

function scoreTimingLocation(profile, event) {
  // Time match
  const timeExact = {
    morning:   ["morning"],
    afternoon: ["afternoon","morning"],
    evening:   ["evening","afternoon"],
    night:     ["night","evening"],
    anytime:   ["morning","afternoon","evening","night"],
  };
  const timeMatch = (timeExact[profile.q5] || []).includes(event.timeCategory)
    ? 1.0 : 0.35;

  // Distance: profile.q6 is 1–4 (close → anywhere); distanceTier 1–4
  const distOk = profile.q6 >= event.distanceTier ? 1.0 : 0.20;

  // Budget: profile.q7 is 0–3 (free only → no limit); costLevel 0–3
  const budgetOk = profile.q7 >= event.costLevel ? 1.0 : 0.15;

  return timeMatch * 0.40 + distOk * 0.30 + budgetOk * 0.30;
}

/**
 * Main entry point. Returns integer 0–99.
 * Uses the document formula:
 *   0.25 interestFit + 0.20 currentVibeFit + 0.20 crowdCompatibility
 *   + 0.15 trustSafetyFit + 0.10 friendGraphFit + 0.10 timingLocationFit
 */
function computeAuraScore(profile, event) {
  if (!profile) return event.match || 80; // fallback if no profile yet

  const raw =
    0.25 * scoreInterestFit(profile, event)    +
    0.20 * scoreCurrentVibe(profile, event)    +
    0.20 * scoreCrowdCompatibility(profile, event) +
    0.15 * scoreTrustSafety(profile, event)    +
    0.10 * scoreFriendGraph(event)             +
    0.10 * scoreTimingLocation(profile, event);

  // Scale to 40–99 so every score feels meaningful in the prototype
  const scaled = 40 + Math.round(raw * 59);
  return Math.max(40, Math.min(99, scaled));
}

/** Returns a 3-element array of human-readable match reasons */
function getMatchReasons(profile, event) {
  if (!profile) return [];
  const reasons = [];

  if (scoreInterestFit(profile, event) >= 0.60)
    reasons.push(`Matches your interest in ${profile.q1}`);

  const energyDiff = Math.abs(profile.q2 - event.energyLevel);
  if (energyDiff <= 1)
    reasons.push("The energy level is exactly what you're after");

  if (scoreCrowdCompatibility(profile, event) >= 0.65)
    reasons.push("The crowd size and vibe align with what you want");

  if (scoreFriendGraph(event) > 0)
    reasons.push(`${event.friends} ${event.friends === 1 ? "friend" : "friends"} you know are already going`);

  if (scoreTimingLocation(profile, event) >= 0.70)
    reasons.push("The time, distance, and cost all work for you");

  if (scoreTrustSafety(profile, event) >= 0.75)
    reasons.push("The social comfort level matches your style");

  // Always return exactly 3 (pad with generic if needed)
  const fallbacks = [
    "Strong interest overlap with other attendees",
    "The host has a high trust score",
    "Good energy match for tonight",
  ];
  while (reasons.length < 3) reasons.push(fallbacks[reasons.length]);
  return reasons.slice(0, 3);
}

/** Derives the user's Aura tag from their profile */
function getAuraTag(profile) {
  if (!profile) return "✦ Aura Active";
  if (profile.q2 <= 2 && profile.q8 <= 2)       return "☁️ Chill Explorer";
  if (profile.q2 >= 3 && profile.q4 === "meet")  return "⚡ Social Spark";
  if (profile.q1 === "art" || profile.q1 === "outdoor") return "🌿 Curious Wanderer";
  if (profile.q4 === "romance")                  return "💫 Romantic Seeker";
  if (profile.q2 >= 3 && profile.q1 === "music") return "🎵 Night Frequency";
  return "✦ Aura Active";
}

// ─── END AURA SCORING ENGINE ─────────────────────────────────────────────────

const Av = ({ name, size=32 }) => {
  const h = (name.charCodeAt(0)*53 + name.charCodeAt(1||0)*17) % 360;
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:`hsl(${h},60%,82%)`, color:`hsl(${h},60%,32%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.38, fontWeight:700, flexShrink:0, border:"2px solid white", letterSpacing:-0.5 }}>
      {name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
    </div>
  );
};

const Pill = ({ label, bg=C.purpleLight, color=C.purple }) => (
  <span style={{ fontSize:11, fontWeight:600, background:bg, color, borderRadius:20, padding:"3px 10px", flexShrink:0 }}>{label}</span>
);

const MatchBadge = ({ score }) => (
  <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:"rgba(255,255,255,0.92)", borderRadius:20, padding:"4px 10px", fontSize:12, fontWeight:700, color:C.coral }}>
    🔥 {score}% match
  </div>
);

const NavIcon = ({ type, active }) => {
  const col = active ? C.purple : C.muted;
  const sw = active ? 2.2 : 1.8;
  const icons = {
    discover: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill={active?col:"none"} strokeWidth="1.5"/></svg>,
    map: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l6-2 6 2 6-2v14l-6 2-6-2-6 2V7z"/><path d="M9 5v14M15 7v14" strokeWidth="1.2"/></svg>,
    add: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    aura: active
      ? <img src="logo.png" alt="Aura" width="22" height="22" style={{objectFit:"contain",filter:"brightness(0.3) sepia(1) hue-rotate(240deg) saturate(3)"}} onError={(e)=>{e.target.style.display='none';}} />
      : <img src="logo.png" alt="Aura" width="22" height="22" style={{objectFit:"contain",opacity:0.5}} onError={(e)=>{e.target.style.display='none';}} />,
    pulse: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><polyline points="2,12 6,12 9,5 13,19 16,12 20,12 22,12"/></svg>,
    you: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={col} strokeWidth={sw} strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"/></svg>,
  };
  return icons[type];
};

function DiscoverScreen({ onEvent, userName, events: scoredEvents = events, userProfile }) {
  const [filter, setFilter] = useState("All");

  // Determine greeting based on time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Filter events based on active category
  const filteredEvents = useMemo(() => {
    if (filter === "All" || filter === "For You") return scoredEvents;
    if (filter === "Food") {
      return scoredEvents.filter(ev => ev.activityType === "food" || ev.tags.some(t => t.toLowerCase().includes("food") || t.toLowerCase().includes("brunch") || t.toLowerCase().includes("dinner")));
    }
    if (filter === "Music") {
      return scoredEvents.filter(ev => ev.activityType === "music" || ev.tags.some(t => t.toLowerCase().includes("music") || t.toLowerCase().includes("jam") || t.toLowerCase().includes("beats")));
    }
    if (filter === "Creative") {
      return scoredEvents.filter(ev => ev.activityType === "art" || ev.tags.some(t => t.toLowerCase().includes("art") || t.toLowerCase().includes("paint") || t.toLowerCase().includes("creative")));
    }
    if (filter === "Social") {
      return scoredEvents.filter(ev => ev.going >= 5);
    }
    return scoredEvents;
  }, [scoredEvents, filter]);

  // Extract clean aura tag string
  const rawAuraTag = getAuraTag(userProfile);
  const cleanAuraTag = rawAuraTag.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "").trim();
  const auraIcon = cleanAuraTag.includes("Chill") ? "cloud" : cleanAuraTag.includes("Social") ? "bolt" : cleanAuraTag.includes("Curious") ? "eco" : "local_fire_department";

  return (
    <div className="h-full overflow-y-auto bg-surface pb-28 hide-scrollbar relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[-10%] w-[260px] h-[260px] aura-gradient rounded-full blur-[50px] opacity-70"></div>
        <div className="absolute top-[35%] left-[-15%] w-[240px] h-[240px] aura-gradient rounded-full blur-[45px] opacity-40"></div>
      </div>

      <div className="relative z-10 px-gutter pt-4">
        {/* Profile and Greeting Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-label-sm text-xs text-on-surface-variant/60 uppercase tracking-wider font-bold mb-0.5">{greeting},</div>
            <h2 className="font-display-lg text-2xl text-on-background font-extrabold tracking-tight leading-tight">
              {userName || "Likhith"}
            </h2>
          </div>
          <Av name={userName || "Likhith Kumar"} size={44} />
        </div>

        {/* Aura Active Badge */}
        <div className="mb-6 flex">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/70 text-on-secondary-container font-label-md text-xs font-bold hover:bg-secondary-container/90 transition-colors cursor-pointer shadow-sm">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {auraIcon}
            </span>
            {cleanAuraTag}
          </span>
        </div>

        {/* Horizontal Quick Filters Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar -mx-gutter px-gutter">
          {["For You", "Today", "Creative", "Social", "Food", "Music"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-label-md text-xs transition-all duration-150 active:scale-95 shadow-sm border ${
                (filter === f || (filter === "All" && f === "For You"))
                  ? "bg-on-background text-surface border-on-background font-extrabold"
                  : "bg-white text-on-background border-outline-variant/60 hover:bg-surface-container-low font-medium"
              }`}
            >
              {f}
            </button>
          ))}
          <button className="flex-shrink-0 px-3 py-2 rounded-full bg-white text-on-background border border-outline-variant/60 hover:bg-surface-container-low flex items-center justify-center active:scale-95 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-headline-md text-base font-bold text-on-background">Top Picks For You</span>
            <span className="font-label-md text-xs text-primary font-bold hover:underline cursor-pointer">See all</span>
          </div>

          <div className="flex flex-col gap-5">
            {filteredEvents.map(ev => (
              <div
                key={ev.id}
                onClick={() => onEvent(ev)}
                className="bg-white rounded-3xl overflow-hidden cursor-pointer shadow-soft hover:shadow-md transition-all duration-200 border border-outline-variant/30 flex flex-col group active:scale-[0.99]"
              >
                {/* Event Cover Image or Fallback Gradient */}
                <div className="relative h-[160px] w-full flex-shrink-0 bg-cover bg-center overflow-hidden" style={{ backgroundImage: ev.image ? `url(${ev.image})` : ev.gradient }}>
                  {!ev.image && <div className="absolute inset-0 bg-black/10"></div>}
                  {/* Match score badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-full px-2.5 py-1.5 flex items-center gap-1 shadow-sm border border-outline-variant/20">
                    <span className="material-symbols-outlined text-tertiary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      psychology
                    </span>
                    <span className="font-label-md text-[11px] font-bold text-on-surface">{ev.match}% Match</span>
                  </div>
                  {/* Bookmark Button */}
                  <button 
                    onClick={e => { e.stopPropagation(); }} 
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center shadow-sm text-on-surface hover:bg-white active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant">bookmark</span>
                  </button>
                </div>

                {/* Event Details Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-headline-md text-[17px] font-bold text-on-background group-hover:text-primary transition-colors leading-snug mb-1">
                      {ev.name}
                    </h3>
                    <div className="flex items-center gap-1.5 font-body-md text-xs text-on-surface-variant/70 mb-3">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      <span>{ev.time}</span>
                      <span className="mx-1">&middot;</span>
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      <span>{ev.distance}</span>
                    </div>
                  </div>

                  {/* Attendance & Friends */}
                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {["A", "B", "C"].map((l, i) => (
                          <Av key={i} name={`${l} User`} size={22} />
                        ))}
                      </div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant/80">
                        {ev.friends} friends going
                      </span>
                    </div>
                    <span className="font-label-sm text-[11px] font-bold bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">
                      {ev.going} going
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {ev.tags.map(t => (
                      <span key={t} className="font-label-sm text-[10px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant/80 border border-outline-variant/20 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Suggested Sponsored Spot Card */}
            <div className="bg-primary-container text-on-primary-container rounded-3xl p-5 shadow-soft border border-primary/10 relative overflow-hidden active:scale-[0.99] transition-transform">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/5 blur-xl"></div>
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    explore
                  </span>
                  <span className="font-label-sm text-[10px] uppercase tracking-wider font-extrabold text-primary">
                    Suggested Spot
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary text-surface font-label-sm text-[9px] uppercase font-bold tracking-wider">
                  Sponsored
                </span>
              </div>
              <h3 className="font-headline-md text-base font-bold mb-1 leading-snug relative z-10">
                Sunset Picnic Series
              </h3>
              <p className="font-body-md text-xs text-on-primary-container/80 mb-4 relative z-10 leading-relaxed">
                Trending with people of similar Aura profiles. 3 checked in tonight.
              </p>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <div className="w-6 h-6 rounded-full border-2 border-primary-container bg-neutral-200 flex items-center justify-center font-label-sm text-[8px] font-bold">JD</div>
                    <div className="w-6 h-6 rounded-full border-2 border-primary-container bg-neutral-300 flex items-center justify-center font-label-sm text-[8px] font-bold">AM</div>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-primary-container/70 font-semibold">Join the waitlist</span>
                </div>
                <span className="material-symbols-outlined text-primary text-[18px]">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  const [mode, setMode] = useState("Solo");
  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", background:C.bg }}>
      <div style={{ padding:"12px 20px 8px", display:"flex", alignItems:"center", gap:10, zIndex:10 }}>
        <button style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:C.text }}>←</button>
        <div style={{ display:"flex", background:"#E8E4DC", borderRadius:22, padding:3, gap:2 }}>
          {["Solo","Squad"].map(m=>(
            <button key={m} onClick={()=>setMode(m)} style={{ padding:"7px 22px", borderRadius:18, border:"none", cursor:"pointer", background:mode===m?C.card:"transparent", color:mode===m?C.purple:C.muted, fontWeight:mode===m?700:500, fontSize:14, boxShadow:mode===m?"0 1px 4px rgba(0,0,0,0.12)":"none", transition:"all 0.2s" }}>{m}</button>
          ))}
        </div>
        <button style={{ marginLeft:"auto", width:36, height:36, borderRadius:"50%", background:C.card, border:`1px solid ${C.border}`, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>⚙️</button>
      </div>
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 390 520" style={{ position:"absolute", inset:0 }} preserveAspectRatio="xMidYMid slice">
          <rect width="390" height="520" fill="#EAE5DA"/>
          {[55,110,170,230,290,350,410].map(y=><rect key={`h${y}`} x="0" y={y-4} width="390" height="8" fill="#D8D2C6"/>)}
          {[40,90,145,200,255,310,365].map(x=><rect key={`v${x}`} x={x-4} y="0" width="8" height="520" fill="#D8D2C6"/>)}
          <rect x="0" y="186" width="390" height="16" fill="#C9C3B6"/>
          <rect x="116" y="0" width="18" height="520" fill="#C9C3B6"/>
          <rect x="60" y="60" width="50" height="45" rx="4" fill="#CCC8C0"/>
          <rect x="125" y="60" width="70" height="45" rx="4" fill="#CCC8C0"/>
          <rect x="205" y="60" width="50" height="45" rx="4" fill="#CCC8C0"/>
          <rect x="60" y="116" width="50" height="60" rx="4" fill="#C8C4BC"/>
          <rect x="145" y="210" width="55" height="70" rx="4" fill="#CCC8C0"/>
          <rect x="215" y="210" width="70" height="70" rx="4" fill="#C8C4BC"/>
          <rect x="60" y="300" width="50" height="55" rx="4" fill="#CCC8C0"/>
          <rect x="125" y="300" width="80" height="55" rx="4" fill="#C8C4BC"/>
          <rect x="220" y="300" width="60" height="55" rx="4" fill="#CCC8C0"/>
          <defs>
            <radialGradient id="h1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7B5CF6" stopOpacity="0.4"/><stop offset="100%" stopColor="#7B5CF6" stopOpacity="0"/></radialGradient>
            <radialGradient id="h2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FF6845" stopOpacity="0.35"/><stop offset="100%" stopColor="#FF6845" stopOpacity="0"/></radialGradient>
            <radialGradient id="h3" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#4A8CF5" stopOpacity="0.3"/><stop offset="100%" stopColor="#4A8CF5" stopOpacity="0"/></radialGradient>
          </defs>
          <ellipse cx="190" cy="240" rx="110" ry="90" fill="url(#h1)"/>
          <ellipse cx="290" cy="140" rx="75" ry="65" fill="url(#h2)"/>
          <ellipse cx="80" cy="360" rx="80" ry="65" fill="url(#h3)"/>
          <g transform="translate(165,218)">
            <circle cx="0" cy="0" r="22" fill="white" opacity="0.95"/>
            <text x="0" y="6" textAnchor="middle" fontSize="16">🎵</text>
          </g>
          <g transform="translate(275,128)">
            <circle cx="0" cy="0" r="20" fill={C.coral} opacity="0.95"/>
            <text x="0" y="6" textAnchor="middle" fontSize="14">🍷</text>
          </g>
          <g transform="translate(75,345)">
            <circle cx="0" cy="0" r="20" fill={C.purple} opacity="0.95"/>
            <text x="0" y="6" textAnchor="middle" fontSize="14">🎨</text>
          </g>
          <g transform="translate(230,300)">
            <circle cx="0" cy="0" r="18" fill={C.blue} opacity="0.95"/>
            <text x="0" y="5" textAnchor="middle" fontSize="13">🌱</text>
          </g>
          <circle cx="205" cy="290" r="12" fill={C.blue} opacity="0.9"/>
          <circle cx="205" cy="290" r="7" fill="white"/>
          <circle cx="205" cy="290" r="26" fill={C.blue} opacity="0.12"/>
        </svg>
        <button style={{ position:"absolute", bottom:140, right:16, width:40, height:40, borderRadius:"50%", background:"white", border:`1px solid ${C.border}`, cursor:"pointer", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.12)" }}>🎯</button>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, background:C.card, borderRadius:"24px 24px 0 0", padding:"16px 20px 12px", boxShadow:"0 -4px 20px rgba(0,0,0,0.09)" }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={{ width:58, height:58, borderRadius:14, background:"linear-gradient(135deg,#CE93D8,#9C27B0)", flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, color:C.coral, fontWeight:700, marginBottom:2 }}>🔥 85% match</div>
              <div style={{ fontSize:16, fontWeight:700, color:C.text }}>Wine &amp; Paint</div>
              <div style={{ fontSize:12, color:C.muted }}>0.6 mi · 3 going tonight</div>
            </div>
            <div style={{ display:"flex" }}>{["R","S","T"].map((l,i)=><Av key={i} name={`${l} Person`} size={30}/>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuraScreen({ energy, setEnergy, intent, setIntent, mode, setMode, onFind, loading, results }) {
  const orbHue = Math.round(250 - energy * 1.9);
  const orbSat = 75 + energy * 0.15;
  return (
    <div className="h-full overflow-y-auto bg-surface pb-28 hide-scrollbar relative">
      {/* Ambient glowing blurs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-10%] w-[250px] h-[250px] aura-gradient rounded-full blur-[60px] opacity-60"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[250px] h-[250px] aura-gradient rounded-full blur-[60px] opacity-40"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="text-center mb-6">
          <h2 className="font-display-lg text-2xl font-extrabold text-on-background tracking-tight">Set your vibe</h2>
          <p className="font-body-md text-sm text-on-surface-variant/80 mt-1">We'll find matches in sync with your aura</p>
        </div>

        {/* Dynamic Vibe Orb */}
        <div className="flex justify-center my-6">
          <div 
            className="w-40 h-40 rounded-full transition-all duration-300 relative"
            style={{ 
              background: `radial-gradient(circle at 38% 33%, hsl(${orbHue+50},100%,88%) 0%, hsl(${orbHue},${orbSat}%,65%) 45%, hsl(${orbHue-50},80%,42%) 100%)`, 
              boxShadow: `0 15px 45px hsl(${orbHue},70%,60%,0.4)`
            }}
          >
            {/* Soft inner glow pulse */}
            <div className="absolute inset-0 rounded-full aura-bg opacity-30"></div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mb-6 bg-white p-5 rounded-3xl border border-outline-variant/30 shadow-soft">
          <div className="flex justify-between items-center mb-3">
            <span className="font-label-md text-sm text-on-background font-bold">Social Energy</span>
            <span className="font-label-sm text-xs text-primary font-bold bg-primary-container px-2 py-0.5 rounded-full">
              {energy}%
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl">😌</span>
            <div className="flex-1 relative h-6 flex items-center">
              <div className="absolute left-0 right-0 h-1.5 rounded-full bg-outline-variant/30 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary via-tertiary to-secondary"
                  style={{ width: `${energy}%` }}
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={energy} 
                onChange={e => setEnergy(+e.target.value)} 
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              />
              {/* Thumb */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-md border-2 border-primary pointer-events-none transition-all"
                style={{ left: `calc(${energy}% - 10px)` }}
              />
            </div>
            <span className="text-xl">🔥</span>
          </div>
        </div>

        {/* Intent Buttons */}
        <div className="mb-6 bg-white p-5 rounded-3xl border border-outline-variant/30 shadow-soft">
          <h4 className="font-label-md text-sm text-on-background font-bold mb-3">Intent</h4>
          <div className="flex gap-2 flex-wrap">
            {["Chill", "Explore", "Meet", "Deep Talk"].map(i => (
              <button 
                key={i} 
                onClick={() => setIntent(i)} 
                className={`px-4 py-2 rounded-full font-label-md text-xs transition-all duration-150 active:scale-95 shadow-sm border ${
                  intent === i 
                    ? "bg-on-background text-surface border-on-background font-extrabold" 
                    : "bg-surface text-on-background border-outline-variant/50 hover:bg-surface-container-low font-medium"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Social Mode Grid */}
        <div className="mb-8 bg-white p-5 rounded-3xl border border-outline-variant/30 shadow-soft">
          <h4 className="font-label-md text-sm text-on-background font-bold mb-3">Social Mode</h4>
          <div className="grid grid-cols-3 gap-3">
            {[{id:"Solo",icon:"👤",desc:"Just me"},{id:"Open",icon:"👥",desc:"Join squad"},{id:"Group",icon:"🎉",desc:"Large scene"}].map(m => (
              <button 
                key={m.id} 
                onClick={() => setMode(m.id)} 
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 ${
                  mode === m.id 
                    ? "border-primary bg-primary-container/30 text-primary font-bold shadow-sm" 
                    : "border-outline-variant/50 bg-surface hover:bg-surface-container-low text-on-surface-variant"
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                <span className="font-label-sm text-xs leading-none">{m.id}</span>
                <span className="text-[9px] text-on-surface-variant/60 leading-none">{m.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Find Button */}
        <button 
          onClick={onFind} 
          disabled={loading} 
          className="w-full py-4 rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary text-white font-label-md text-base font-extrabold transition-transform duration-150 active:scale-[0.98] shadow-md hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
        >
          {loading ? "✨ Calibrating matching waves..." : "Find my people ✨"}
        </button>

        {/* AI Recommendations List */}
        {results && (
          <div className="animate-fade-in">
            <h3 className="font-headline-md text-base font-bold text-on-background mb-4">AI Picks for You &middot; Live</h3>
            <div className="flex flex-col gap-4">
              {results.map((ev, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-3xl p-5 border border-outline-variant/30 shadow-soft hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h4 className="font-headline-md text-[16px] font-bold text-on-background leading-snug flex-1">
                      {ev.name}
                    </h4>
                    <div className="bg-primary-container text-on-primary-container rounded-full px-2.5 py-1 flex items-center gap-1 flex-shrink-0 border border-primary/10">
                      <span className="material-symbols-outlined text-[12px]">psychology</span>
                      <span className="font-label-sm text-[10px] font-bold">{ev.matchScore||ev.match||90}% Match</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 font-body-md text-xs text-on-surface-variant/60 mb-3">
                    <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                    <span>{ev.time}</span>
                    <span>&middot;</span>
                    <span className="material-symbols-outlined text-[13px]">location_on</span>
                    <span>{ev.distance}</span>
                  </div>

                  <p className="font-body-md text-xs italic text-on-surface-variant/80 bg-surface p-3 rounded-2xl border border-outline-variant/10 mb-4 leading-relaxed">
                    "{ev.reason}"
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    <span className="font-label-sm text-[10px] px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-bold">
                      {ev.vibe}
                    </span>
                    <span className="font-label-sm text-[10px] px-2.5 py-1 rounded-full bg-tertiary-container/50 text-on-tertiary-container font-bold">
                      {ev.going} going
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EventDetail({ event, onBack, reasons = [] }) {
  return (
    <div className="h-full overflow-y-auto bg-surface pb-12 hide-scrollbar relative">
      {/* Event Cover Image or Fallback Gradient */}
      <div 
        className="relative h-[240px] w-full bg-cover bg-center overflow-hidden flex-shrink-0"
        style={{ backgroundImage: event.image ? `url(${event.image})` : event.gradient }}
      >
        {!event.image && <div className="absolute inset-0 bg-black/10"></div>}
        
        {/* Navigation Overlays */}
        <button 
          onClick={onBack} 
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center shadow-sm text-on-surface hover:bg-white active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>

        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center shadow-sm text-on-surface hover:bg-white active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[18px]">favorite</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-outline-variant/30 flex items-center justify-center shadow-sm text-on-surface hover:bg-white active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
        </div>

        {/* Match score overlay badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1 shadow-sm border border-outline-variant/20">
          <span className="material-symbols-outlined text-tertiary text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
          <span className="font-label-md text-xs font-bold text-on-surface">{event.match || 92}% Match</span>
        </div>
      </div>

      <div className="p-6 relative z-10">
        {/* Title & Metadata */}
        <h2 className="font-display-lg text-2xl font-extrabold text-on-background tracking-tight leading-tight mb-2">
          {event.name}
        </h2>
        <div className="flex items-center gap-1.5 font-body-md text-xs text-on-surface-variant/70 mb-5">
          <span className="material-symbols-outlined text-[14px]">calendar_today</span>
          <span>{event.time}</span>
          <span className="mx-1">&middot;</span>
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          <span>{event.distance}</span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-6">
          {(event.tags || ["Social", "Outdoor"]).map(t => (
            <span key={t} className="font-label-sm text-[10px] px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant/80 border border-outline-variant/20 font-bold">
              {t}
            </span>
          ))}
        </div>

        {/* Squad Attendance Grid */}
        <div className="bg-white rounded-3xl p-5 border border-outline-variant/30 shadow-soft mb-5">
          <h4 className="font-label-md text-sm text-on-background font-bold mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">groups</span>
            Squad ({event.going || 5} going)
          </h4>
          <div className="flex gap-2 items-center">
            {["Maya", "Alex", "Jordan", "Sam", "Casey"].map((n, i) => (
              <Av key={i} name={n} size={38} />
            ))}
            <div className="w-[38px] h-[38px] rounded-full bg-primary-container border-2 border-white flex items-center justify-center font-label-sm text-[10px] font-bold text-primary shadow-sm flex-shrink-0">
              +2
            </div>
          </div>
        </div>

        {/* Match Scoring Insights */}
        <div className="bg-green-50/70 rounded-3xl p-5 border border-green-200/50 mb-5">
          <h4 className="font-label-md text-sm text-green-800 font-bold mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-green-700 text-[18px]">verified</span>
            Why this is a great match
          </h4>
          <div className="flex flex-col gap-2.5">
            {(reasons.length > 0
              ? reasons
              : [
                  "You both like social, low pressure vibes",
                  "Similar energy levels (Warm / Active)",
                  "Group size matches your preference"
                ]
            ).map((r, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-green-600 font-bold text-sm leading-none mt-0.5">✓</span>
                <span className="font-body-md text-xs text-green-800/90 leading-relaxed">{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Preview */}
        <div className="bg-white rounded-3xl p-5 border border-outline-variant/30 shadow-soft mb-6">
          <h4 className="font-label-md text-sm text-on-background font-bold mb-4 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-[18px]">chat</span>
            Chat Preview
          </h4>
          <div className="flex flex-col gap-4">
            {[
              { n: "Maya", m: "Can't wait! The weather looks perfect 🌤️", t: "2m ago" },
              { n: "Alex", m: "Anyone coming from nearby?", t: "3m ago" }
            ].map((msg, i) => (
              <div key={i} className="flex gap-3">
                <Av name={msg.n} size={34} />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-label-md text-xs text-on-background font-bold">{msg.n}</span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant/50">{msg.t}</span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant/90 mt-1 leading-snug">
                    {msg.m}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <button className="w-full py-4 rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary text-white font-label-md text-base font-extrabold transition-transform duration-150 active:scale-[0.98] shadow-md hover:opacity-95 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          Join Squad
        </button>
      </div>
    </div>
  );
}
function AuraChatScreen({ userProfile, onProfileUpdate }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hey! I'm Aura 👋 I know you from your onboarding, but the more you share, the better I can match you. What's on your mind tonight?",
      time: "now"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const suggestions = [
    "I'm feeling low-key tonight",
    "I want to meet new people",
    "Looking for something creative",
    "Update my food preferences",
    "I prefer small groups",
  ];

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text, time: "now" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Simulate Aura AI response
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 600));
    
    const lowerText = text.toLowerCase();
    let response = "";
    
    if (lowerText.includes("low-key") || lowerText.includes("chill") || lowerText.includes("quiet")) {
      response = "Got it — I'll tune your vibe to \"Chill Explorer\" mode. I'll prioritize smaller, more intimate events with a relaxed atmosphere. Anything else about your mood tonight?";
    } else if (lowerText.includes("meet") || lowerText.includes("people") || lowerText.includes("social")) {
      response = "Love that energy! I'll bump up your Social Connector score and look for events with active mingling and new faces. Do you prefer structured activities or free-form social settings?";
    } else if (lowerText.includes("creative") || lowerText.includes("art") || lowerText.includes("paint")) {
      response = "Creative mode activated 🎨 I'll weight art, music, and maker events more heavily for you. Wine & Paint Evening tonight is a 94% match based on this — want me to pull it up?";
    } else if (lowerText.includes("food") || lowerText.includes("eat") || lowerText.includes("dinner") || lowerText.includes("brunch")) {
      response = "Yum! I'll make food-forward events your top priority. I see Rooftop Brunch & Beats and Garden Dinner Party scoring high for you right now. Want details on either?";
    } else if (lowerText.includes("small") || lowerText.includes("group") || lowerText.includes("intimate")) {
      response = "Noted — I'll filter for events under 15 people so you can actually connect rather than get lost in a crowd. This will adjust your newcomer-friendliness score too.";
    } else if (lowerText.includes("distance") || lowerText.includes("far") || lowerText.includes("walk")) {
      response = "I'll tighten your distance filter. Walking distance only — so within about half a mile. That narrows tonight's picks but keeps things easy. Sound right?";
    } else if (lowerText.includes("yes") || lowerText.includes("sure") || lowerText.includes("ok")) {
      response = "Perfect! I've updated your Aura profile. Head back to Discover to see your freshly tuned picks 🌟";
    } else if (lowerText.includes("how") || lowerText.includes("work") || lowerText.includes("what")) {
      response = "I analyze your energy level, social intent, interests, and past patterns to score every event 0–100. The higher the match, the more aligned it is with who you are right now — not just what you usually do. Tell me something about tonight and I'll calibrate in real time.";
    } else {
      const fallbacks = [
        "Interesting! Tell me more — are you in the mood for something energetic or low-key tonight?",
        "I'm picking up on that vibe. Would you say you want to meet new people, or hang with familiar faces?",
        "Got it. Are you feeling more creative, active, or social right now?",
        "I hear you. What would make tonight feel perfect — great food, great people, or a great atmosphere?",
      ];
      response = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    
    setMessages(prev => [...prev, { role: "assistant", text: response, time: "now" }]);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col bg-surface relative">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[5%] right-[-10%] w-[200px] h-[200px] aura-gradient rounded-full blur-[50px] opacity-50"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[180px] h-[180px] aura-gradient rounded-full blur-[45px] opacity-35"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-5 pb-3 flex items-center gap-3 border-b border-outline-variant/20">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary via-tertiary to-secondary flex items-center justify-center shadow-md flex-shrink-0">
          <img src="logo.png" alt="Aura" className="w-7 h-7 object-contain" onError={(e)=>{e.target.style.display='none';e.target.parentElement.innerHTML='<span class="material-symbols-outlined text-white text-[20px]" style="font-variation-settings:\'FILL\' 1">psychology</span>';}} />
        </div>
        <div className="flex-1">
          <h2 className="font-display-lg text-base font-extrabold text-on-background tracking-tight leading-none">Aura AI</h2>
          <p className="font-body-md text-[10px] text-on-surface-variant/70 mt-0.5">Your personal social compass</p>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 border border-green-200/60">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-label-sm text-[9px] font-bold text-green-700">Live</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="relative z-10 flex-1 overflow-y-auto px-5 py-4 hide-scrollbar flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden">
                <img src="logo.png" alt="" className="w-5 h-5 object-contain" onError={(e)=>{e.target.style.display='none';}} />
              </div>
            )}
            <div className={`max-w-[75%] px-4 py-3 rounded-2xl font-body-md text-xs leading-relaxed shadow-sm ${
              msg.role === "user"
                ? "bg-gradient-to-r from-primary to-tertiary text-white rounded-br-sm"
                : "bg-white border border-outline-variant/25 text-on-background rounded-bl-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5 items-end">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary flex-shrink-0 flex items-center justify-center shadow-sm">
              <img src="logo.png" alt="" className="w-5 h-5 object-contain" onError={(e)=>{e.target.style.display='none';}} />
            </div>
            <div className="bg-white border border-outline-variant/25 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{animationDelay:"0ms"}}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-tertiary/60 animate-bounce" style={{animationDelay:"150ms"}}></div>
                <div className="w-1.5 h-1.5 rounded-full bg-secondary/60 animate-bounce" style={{animationDelay:"300ms"}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 2 && (
        <div className="relative z-10 px-5 pb-2">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-outline-variant/40 font-label-sm text-[10px] text-on-surface-variant font-bold hover:border-primary hover:text-primary transition-colors active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="relative z-10 px-4 pb-28 pt-2 border-t border-outline-variant/20">
        <div className="flex gap-2 items-end bg-white rounded-2xl border border-outline-variant/40 shadow-soft px-4 py-2.5">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Tell Aura about your vibe tonight..."
            className="flex-1 resize-none text-xs font-body-md text-on-background bg-transparent outline-none leading-relaxed placeholder-on-surface-variant/40 max-h-20"
            rows={1}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-tertiary text-white flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all active:scale-90 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PulseScreen() {
  const sigs = [
    { icon:"local_fire_department", color: "text-tertiary", bg:"bg-tertiary-container/30", title:"New Match Signal", sub:"You + 3 others have a high match tonight", type:"Match" },
    { icon:"bolt", color: "text-secondary", bg:"bg-secondary-container/30", title:"Hotspot Alert", sub:"Downtown is heating up &bull; Right now", type:"Alert" },
    { icon:"groups", color: "text-primary", bg:"bg-primary-container/30", title:"Squad Forming", sub:"A squad with 91% match is forming near you", type:"Squad" },
    { icon:"chat", color: "text-blue-600", bg:"bg-blue-50", title:"Warmup Response", sub:'Maya answered: "Best part of a perfect day?"', type:"Chat" },
  ];
  return (
    <div className="h-full overflow-y-auto bg-surface pb-28 hide-scrollbar relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-10%] w-[220px] h-[220px] aura-gradient rounded-full blur-[50px] opacity-50"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[240px] h-[240px] aura-gradient rounded-full blur-[60px] opacity-40"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display-lg text-2xl font-extrabold text-on-background tracking-tight">Pulse</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-outline-variant/60 font-label-md text-xs text-on-surface hover:bg-surface-container-low active:scale-95 transition-transform shadow-sm">
            <span className="material-symbols-outlined text-[15px]">tune</span>
            Filter
          </button>
        </div>

        {/* Signals Section */}
        <div className="mb-8">
          <h4 className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-wider mb-4">
            Live signals for you
          </h4>
          <div className="flex flex-col gap-4">
            {sigs.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-outline-variant/30 shadow-soft flex gap-4 items-start active:scale-[0.99] transition-all hover:shadow-md cursor-pointer">
                <div className={`w-11 h-11 rounded-2xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined ${s.color} text-[22px]`}>
                    {s.icon}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h5 className="font-headline-md text-sm font-bold text-on-background">{s.title}</h5>
                    <span className={`font-label-sm text-[9px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.color}`}>
                      {s.type}
                    </span>
                  </div>
                  <p className="font-body-md text-xs text-on-surface-variant/80 mb-3 leading-snug" dangerouslySetInnerHTML={{ __html: s.sub }} />
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 rounded-full bg-primary text-surface font-label-sm text-[10px] font-bold shadow-sm transition-transform active:scale-95">
                      Answer
                    </button>
                    <button className="px-4 py-1.5 rounded-full bg-surface text-on-surface-variant border border-outline-variant/50 font-label-sm text-[10px] font-bold transition-transform active:scale-95">
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warmups Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-headline-md text-base font-bold text-on-background">Warmups</span>
            <span className="font-label-md text-xs text-primary font-bold hover:underline cursor-pointer">See all</span>
          </div>

          <div className="flex flex-col gap-3">
            {["Maya", "Jordan"].map((name, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 border border-outline-variant/30 shadow-soft flex items-center gap-4 cursor-pointer hover:border-primary active:scale-[0.99] transition-all group">
                <Av name={name} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="font-label-md text-xs text-on-background font-bold group-hover:text-primary transition-colors">
                    You and {name} both chose
                  </div>
                  <div className="font-body-md text-[11px] text-on-surface-variant/70 truncate mt-0.5">
                    "creative people &amp; good food"
                  </div>
                  <div className="font-label-sm text-[10px] text-primary font-bold mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">chat_bubble</span>
                    What's a hidden gem you love here?
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/40 group-hover:translate-x-0.5 transition-transform text-[18px]">
                  arrow_forward
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HostEventScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name:"", type:"Social", date:"", time:"", location:"", maxSize:"10", description:"" });
  const eventTypes = ["Social", "Food & Drinks", "Music", "Art & Creative", "Outdoor", "Games"];

  if (step === 2) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-surface p-8 text-center relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-5%] right-[-10%] w-[220px] h-[220px] aura-gradient rounded-full blur-[50px] opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary flex items-center justify-center mb-6 shadow-lg">
            <span className="material-symbols-outlined text-white text-[40px]" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
          </div>
          <h2 className="font-display-lg text-2xl font-extrabold text-on-background mb-3 tracking-tight">Event Created!</h2>
          <p className="font-body-md text-sm text-on-surface-variant/80 mb-8 leading-relaxed">
            <strong>{form.name}</strong> is live. Aura will start matching attendees based on vibe compatibility.
          </p>
          <button onClick={onBack} className="w-full py-4 rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary text-white font-label-md text-sm font-extrabold active:scale-[0.98] transition-all shadow-md">
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-surface pb-8 hide-scrollbar relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] right-[-10%] w-[200px] h-[200px] aura-gradient rounded-full blur-[50px] opacity-40"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center shadow-sm active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h2 className="font-display-lg text-xl font-extrabold text-on-background tracking-tight">Host an Event</h2>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mb-6">
          {[0,1].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? "bg-primary" : "bg-outline-variant/40"}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="flex flex-col gap-5">
            <h3 className="font-headline-md text-base font-bold text-on-background">Event Details</h3>
            <div>
              <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1.5 block">Event Name</label>
              <input
                type="text"
                placeholder="e.g. Rooftop Sunset Hangout"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-outline-variant/40 font-body-md text-sm text-on-background outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-2 block">Event Type</label>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map(t => (
                  <button key={t} onClick={() => setForm({...form, type: t})}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-[11px] font-bold transition-all active:scale-95 border ${form.type === t ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-on-surface-variant border-outline-variant/40"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1.5 block">Date</label>
                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-2xl bg-white border border-outline-variant/40 font-body-md text-xs text-on-background outline-none focus:border-primary" />
              </div>
              <div>
                <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1.5 block">Time</label>
                <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-2xl bg-white border border-outline-variant/40 font-body-md text-xs text-on-background outline-none focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1.5 block">Location</label>
              <input type="text" placeholder="Add address or venue name" value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-outline-variant/40 font-body-md text-sm text-on-background outline-none focus:border-primary transition-colors" />
            </div>
            <button onClick={() => setStep(1)} disabled={!form.name.trim()}
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-tertiary text-white font-label-md text-sm font-extrabold active:scale-[0.98] transition-all shadow-md disabled:opacity-40 mt-2">
              Continue
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <h3 className="font-headline-md text-base font-bold text-on-background">Vibe Settings</h3>
            <div>
              <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1.5 block">Max Group Size: {form.maxSize} people</label>
              <input type="range" min="3" max="50" value={form.maxSize} onChange={e => setForm({...form, maxSize: e.target.value})}
                className="w-full accent-primary h-1.5 rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between mt-1">
                <span className="font-label-sm text-[9px] text-on-surface-variant/50">Intimate (3)</span>
                <span className="font-label-sm text-[9px] text-on-surface-variant/50">Large (50)</span>
              </div>
            </div>
            <div>
              <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1.5 block">Description</label>
              <textarea placeholder="Describe the vibe, what to bring, or what to expect..." value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                rows={3} className="w-full px-4 py-3 rounded-2xl bg-white border border-outline-variant/40 font-body-md text-sm text-on-background outline-none focus:border-primary resize-none transition-colors" />
            </div>
            <div className="bg-primary-container/40 rounded-2xl p-4 border border-primary/15">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-[16px]" style={{fontVariationSettings:"'FILL' 1"}}>psychology</span>
                <span className="font-label-md text-xs font-bold text-primary">Aura Matching</span>
              </div>
              <p className="font-body-md text-[11px] text-on-background/80 leading-relaxed">
                Aura will automatically match attendees based on vibe compatibility, energy levels, and social preferences.
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 py-3.5 rounded-full bg-white border border-outline-variant/40 text-on-surface font-label-md text-sm font-bold active:scale-[0.98] transition-all">
                Back
              </button>
              <button onClick={() => setStep(2)} className="flex-[2] py-3.5 rounded-full bg-gradient-to-r from-primary to-tertiary text-white font-label-md text-sm font-extrabold active:scale-[0.98] transition-all shadow-md">
                Create Event
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PostSignalScreen({ onBack }) {
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [message, setMessage] = useState("");
  const [posted, setPosted] = useState(false);

  const vibes = [
    { id:"chill", emoji:"🌙", label:"Chill", color:"bg-blue-50 border-blue-200 text-blue-700", active:"bg-blue-500 text-white border-blue-500" },
    { id:"social", emoji:"⚡", label:"Social", color:"bg-yellow-50 border-yellow-200 text-yellow-700", active:"bg-yellow-500 text-white border-yellow-500" },
    { id:"explore", emoji:"🧭", label:"Explore", color:"bg-green-50 border-green-200 text-green-700", active:"bg-green-600 text-white border-green-600" },
    { id:"creative", emoji:"🎨", label:"Creative", color:"bg-purple-50 border-purple-200 text-purple-700", active:"bg-purple-600 text-white border-purple-600" },
    { id:"food", emoji:"🍜", label:"Food Mood", color:"bg-orange-50 border-orange-200 text-orange-700", active:"bg-orange-500 text-white border-orange-500" },
    { id:"music", emoji:"🎵", label:"Music", color:"bg-pink-50 border-pink-200 text-pink-700", active:"bg-pink-600 text-white border-pink-600" },
  ];

  if (posted) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-surface p-8 text-center relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[5%] right-[-10%] w-[220px] h-[220px] aura-gradient rounded-full blur-[50px] opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-5xl mb-5">{vibes.find(v=>v.id===selectedVibe)?.emoji || "✨"}</div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary via-tertiary to-secondary flex items-center justify-center mb-6 shadow-lg">
            <span className="material-symbols-outlined text-white text-[30px]" style={{fontVariationSettings:"'FILL' 1"}}>local_fire_department</span>
          </div>
          <h2 className="font-display-lg text-2xl font-extrabold text-on-background mb-3 tracking-tight">Signal Posted!</h2>
          <p className="font-body-md text-sm text-on-surface-variant/80 mb-2 leading-relaxed">
            Nearby people with a matching vibe will see your signal for the next 3 hours.
          </p>
          <div className="bg-primary-container/50 rounded-2xl px-4 py-2 mb-8">
            <span className="font-label-md text-xs text-primary font-bold">Aura is scanning for matches...</span>
          </div>
          <button onClick={onBack} className="w-full py-4 rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary text-white font-label-md text-sm font-extrabold active:scale-[0.98] transition-all shadow-md">
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-surface pb-8 hide-scrollbar relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-[10%] left-[-10%] w-[200px] h-[200px] aura-gradient rounded-full blur-[50px] opacity-40"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="w-9 h-9 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center shadow-sm active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h2 className="font-display-lg text-xl font-extrabold text-on-background tracking-tight">Post a Signal</h2>
        </div>

        <p className="font-body-md text-sm text-on-surface-variant/70 mb-6 leading-relaxed">
          Let nearby people know what vibe you're in. Aura will match you with others who are feeling the same way right now.
        </p>

        {/* Vibe Picker */}
        <div>
          <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-3 block">What's your vibe?</label>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {vibes.map(v => (
              <button key={v.id} onClick={() => setSelectedVibe(v.id)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border font-label-sm text-[11px] font-bold transition-all active:scale-95 ${selectedVibe === v.id ? v.active : v.color}`}>
                <span className="text-xl">{v.emoji}</span>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional message */}
        <div className="mb-6">
          <label className="font-label-sm text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1.5 block">Add a message (optional)</label>
          <input type="text" placeholder={`"Looking for ${selectedVibe === "food" ? "dinner plans" : selectedVibe === "chill" ? "a chill hangout" : "something fun"}..."`}
            value={message} onChange={e => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-white border border-outline-variant/40 font-body-md text-sm text-on-background outline-none focus:border-primary transition-colors" />
        </div>

        {/* Visibility info */}
        <div className="bg-surface-container rounded-2xl p-4 flex items-center gap-3 mb-6 border border-outline-variant/25">
          <span className="material-symbols-outlined text-on-surface-variant/60 text-[20px]">schedule</span>
          <p className="font-body-md text-xs text-on-surface-variant/70 leading-relaxed flex-1">
            Your signal will be visible to Aura-matched users within <strong>2 miles</strong> for <strong>3 hours</strong>.
          </p>
        </div>

        <button onClick={() => setPosted(true)} disabled={!selectedVibe}
          className="w-full py-4 rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary text-white font-label-md text-sm font-extrabold active:scale-[0.98] transition-all shadow-md disabled:opacity-40 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings:"'FILL' 1"}}>local_fire_department</span>
          Send Signal
        </button>
      </div>
    </div>
  );
}

function ProfileScreen({ onSettings }) {
  return (
    <div className="h-full overflow-y-auto bg-surface pb-28 hide-scrollbar relative">
      {/* Ambient background blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[220px] h-[220px] aura-gradient rounded-full blur-[50px] opacity-60"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[240px] h-[240px] aura-gradient rounded-full blur-[60px] opacity-40"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Settings Header */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={onSettings} 
            className="w-10 h-10 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center shadow-sm text-on-surface hover:bg-surface-container-low active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">settings</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl text-white font-extrabold shadow-md border-4 border-white"
              style={{ background: `linear-gradient(135deg, ${C.purpleMid}, ${C.purple}, ${C.blue})` }}
            >
              L
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary border-2 border-white text-surface flex items-center justify-center shadow-md active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-[14px]">edit</span>
            </button>
          </div>
          <h2 className="font-display-lg text-2xl font-extrabold text-on-background tracking-tight">Likhith</h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-md text-xs font-bold mt-2 shadow-sm">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            Warm Explorer
          </span>
        </div>

        {/* Quick Stats Bento */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Squads Joined", val: "12", icon: "groups" },
            { label: "Matches", val: "8", icon: "psychology" },
            { label: "Success Rate", val: "92%", icon: "check_circle" }
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-outline-variant/30 shadow-soft flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-primary/60 text-[18px] mb-1">{s.icon}</span>
              <div className="font-headline-md text-lg font-bold text-on-background">{s.val}</div>
              <div className="font-label-sm text-[10px] text-on-surface-variant/70 mt-0.5 leading-none">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Social Pattern Bento Card */}
        <div className="bg-white rounded-3xl p-5 border border-outline-variant/30 shadow-soft mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-label-md text-sm text-on-background font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[18px]">insights</span>
              Your Social Pattern
            </h4>
            <span className="material-symbols-outlined text-on-surface-variant/50 text-[18px]">arrow_forward</span>
          </div>
          <div className="flex gap-5 items-center">
            {/* Vibe SVG visualization */}
            <div className="w-16 h-16 flex-shrink-0 relative">
              <svg width="64" height="64" viewBox="0 0 80 80">
                <polygon points="40,6 72,60 8,60" fill={C.purpleLight} stroke={C.purple} strokeWidth="1.5" opacity="0.9"/>
                <polygon points="40,20 58,52 22,52" fill={C.purple} opacity="0.25"/>
                <polygon points="40,32 52,46 28,46" fill={C.purple} opacity="0.2"/>
                {[[40,6],[72,60],[8,60]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4" fill={C.purple}/>)}
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              {["Prefers small groups", "Low pressure vibe", "Creative environments"].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="font-body-md text-xs text-on-surface-variant">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Events */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-headline-md text-base font-bold text-on-background">Saved Events</span>
            <span className="font-label-md text-xs text-primary font-bold hover:underline cursor-pointer">See all</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-6 px-6">
            {events.map(e => (
              <div key={e.id} className="flex-shrink-0 w-24">
                <div 
                  className="w-24 h-[76px] rounded-2xl bg-cover bg-center mb-1.5 shadow-sm border border-outline-variant/15"
                  style={{ backgroundImage: e.image ? `url(${e.image})` : e.gradient }}
                />
                <div className="font-label-md text-[11px] font-bold text-on-background truncate leading-tight">{e.name}</div>
                <div className="font-label-sm text-[9px] text-on-surface-variant/60 mt-0.5 truncate">{e.time.split("·")[0].trim()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Squads */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="font-headline-md text-base font-bold text-on-background">Past Squads</span>
            <span className="font-label-md text-xs text-primary font-bold hover:underline cursor-pointer">See all</span>
          </div>
          <div className="flex gap-2.5">
            {["Maya K", "Alex R", "Jordan L", "Sam T", "Casey M", "Ria P"].map((n, i) => (
              <Av key={i} name={n} size={40} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ onBack }) {
  const [matchIntensity, setMatchIntensity] = useState(80);
  const [maxDistance, setMaxDistance] = useState(15);
  const [incognito, setIncognito] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="h-full overflow-y-auto bg-surface pb-12 hide-scrollbar relative">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack} 
            className="w-9 h-9 rounded-full bg-white border border-outline-variant/60 flex items-center justify-center shadow-sm text-on-surface hover:bg-surface-container-low active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <h2 className="font-display-lg text-xl font-extrabold text-on-background tracking-tight">Settings & Privacy</h2>
        </div>

        {/* Account Settings */}
        <div className="mb-6">
          <h4 className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-wider mb-3 px-1">
            Account
          </h4>
          <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-soft overflow-hidden">
            {[
              { icon: "person", title: "Profile Information", subtitle: "Likhith, Chill Explorer" },
              { icon: "phone", title: "Phone Number", subtitle: "+1 (555) 019-2834" },
              { icon: "mail", title: "Email Address", subtitle: "likhith@example.com" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer border-b border-outline-variant/20 last:border-b-0"
              >
                <div className="flex items-center gap-3.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                  <div>
                    <div className="font-label-md text-xs font-bold text-on-background">{item.title}</div>
                    <div className="font-body-md text-[10px] text-on-surface-variant/70 mt-0.5">{item.subtitle}</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/40 text-[18px]">chevron_right</span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences / AI Tuning */}
        <div className="mb-6">
          <h4 className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-wider mb-3 px-1">
            Match Preferences
          </h4>
          <div className="bg-white rounded-3xl p-5 border border-outline-variant/30 shadow-soft flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-md text-xs font-bold text-on-background">Min Match Score</span>
                <span className="font-headline-md text-xs font-bold text-primary">{matchIntensity}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="95" 
                value={matchIntensity} 
                onChange={(e) => setMatchIntensity(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-outline-variant/35 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-label-md text-xs font-bold text-on-background">Max Distance</span>
                <span className="font-headline-md text-xs font-bold text-primary">{maxDistance} miles</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={maxDistance} 
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-outline-variant/35 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <h4 className="font-label-sm text-[10px] uppercase font-bold text-on-surface-variant/60 tracking-wider mb-3 px-1">
            Privacy & Safety
          </h4>
          <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-soft overflow-hidden">
            {/* Incognito Switch */}
            <div className="flex items-center justify-between p-5 border-b border-outline-variant/20">
              <div className="flex gap-3.5 items-start">
                <span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">visibility_off</span>
                <div>
                  <div className="font-label-md text-xs font-bold text-on-background">Incognito Mode</div>
                  <p className="font-body-md text-[10px] text-on-surface-variant/70 mt-0.5 leading-snug max-w-[200px]">
                    Hide your profile from new recommendations and discovery maps.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIncognito(!incognito)}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none flex-shrink-0 ${incognito ? "bg-primary" : "bg-outline-variant/70"}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${incognito ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>

            {/* Notification Switch */}
            <div className="flex items-center justify-between p-5">
              <div className="flex gap-3.5 items-start">
                <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">notifications</span>
                <div>
                  <div className="font-label-md text-xs font-bold text-on-background">Push Notifications</div>
                  <p className="font-body-md text-[10px] text-on-surface-variant/70 mt-0.5 leading-snug max-w-[200px]">
                    Get real-time updates for squad formation, matches, and chats.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none flex-shrink-0 ${notifications ? "bg-primary" : "bg-outline-variant/70"}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${notifications ? "translate-x-5" : "translate-x-0"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-4 rounded-full bg-surface text-error border border-error/30 font-label-md text-xs font-bold hover:bg-error/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Sign Out of Plot
        </button>
      </div>
    </div>
  );
}

function LoginScreen({ onContinue }) {
  return (
    <div className="h-full flex flex-col justify-between bg-surface p-8 relative">
      {/* Ambient background blur inside screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[200px] h-[200px] aura-gradient rounded-full blur-[40px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[220px] h-[220px] aura-gradient rounded-full blur-[50px] opacity-40"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center items-center">
        {/* Plot Logo */}
        <img src="logo.png" alt="Plot" className="h-20 object-contain mb-2" onError={(e)=>{e.target.style.display='none';}} />
        <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-[240px]">
          Discover your people. Connect in creative, low-pressure environments.
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-full bg-on-background text-surface font-label-md text-label-md flex items-center justify-center gap-3 transition-transform duration-150 active:scale-[0.98] shadow-sm hover:opacity-95"
        >
          <span className="text-[20px] leading-none"></span> Continue with Apple
        </button>
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-full bg-white text-on-background font-label-md text-label-md flex items-center justify-center gap-3 border border-outline-variant/30 transition-transform duration-150 active:scale-[0.98] shadow-sm hover:bg-surface-container-low"
        >
          <span className="text-[18px] font-bold text-[#EA4335]">G</span> Continue with Google
        </button>
        <div className="text-center font-label-sm text-label-sm text-on-surface-variant/60 my-1">
          or
        </div>
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-primary via-tertiary to-secondary text-white font-label-md text-label-md font-extrabold transition-transform duration-150 active:scale-[0.98] shadow-soft hover:opacity-95"
        >
          Use Phone Number
        </button>
      </div>
    </div>
  );
}
function OnboardingScreen({ onFinish }) {
  const [name, setName] = useState("");

  return (
    <div className="h-full flex flex-col justify-between bg-surface p-8 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[180px] h-[180px] aura-gradient rounded-full blur-[40px] opacity-55"></div>
      </div>

      <div className="relative z-10 flex-1">
        {/* Logo Header */}
        <div className="flex items-center gap-2 mb-8 mt-2">
          <img src="logo.png" alt="Plot" className="h-8 object-contain" onError={(e)=>{e.target.style.display='none';}} />
        </div>

        <div>
          <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-2">
            What's your name?
          </h3>
          <p className="font-body-md text-sm text-on-surface-variant mb-8">
            This is how you'll appear to others when checking in.
          </p>

          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary-container/40 border-2 border-dashed border-primary/40 flex flex-col items-center justify-center text-primary cursor-pointer hover:bg-primary-container/60 transition-colors shadow-sm relative group overflow-hidden">
              <span className="material-symbols-outlined text-[32px]">add_a_photo</span>
              <span className="font-label-sm text-[10px] mt-1">Add Photo</span>
            </div>
          </div>

          <input
            type="text"
            placeholder="First Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-outline-variant/60 text-lg font-semibold bg-white text-on-background placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
          />
        </div>
      </div>

      <button
        onClick={() => onFinish(name || "Explorer")}
        className="relative z-10 w-full py-4 rounded-full bg-on-background text-surface font-label-md text-label-md font-extrabold transition-transform duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none"
        disabled={!name.trim()}
      >
        Next
      </button>
    </div>
  );
}

const ONBOARDING_QUESTIONS = [
  {
    id:"q1", label:"What are you into?",
    question:"What kind of experience sounds best tonight?",
    options:[
      { label:"Food & drinks",    emoji:"🍽️", value:"food"    },
      { label:"Music & dancing",  emoji:"🎵", value:"music"   },
      { label:"Art & culture",    emoji:"🎨", value:"art"     },
      { label:"Outdoor & active", emoji:"🌄", value:"outdoor" },
    ],
  },
  {
    id:"q2", label:"Your energy right now",
    question:"How's your social energy feeling?",
    options:[
      { label:"Keep it chill",          emoji:"😌", value:1 },
      { label:"Easy and social",        emoji:"🥂", value:2 },
      { label:"Ready to get out there", emoji:"⚡", value:3 },
      { label:"Full send tonight",      emoji:"🔥", value:4 },
    ],
  },
  {
    id:"q3", label:"Crowd size",
    question:"What crowd feels right for you?",
    options:[
      { label:"Just a few people",   emoji:"🫂", value:"intimate" },
      { label:"Small group (5–15)",  emoji:"👥", value:"small"    },
      { label:"Good scene (15–50)",  emoji:"🎉", value:"medium"   },
      { label:"Bigger the better",   emoji:"🏟️", value:"large"    },
    ],
  },
  {
    id:"q4", label:"What you're looking for",
    question:"What are you actually hoping for tonight?",
    options:[
      { label:"Meet new people",     emoji:"🤝", value:"meet"    },
      { label:"Hang with my crew",   emoji:"💛", value:"friends" },
      { label:"Just explore & vibe", emoji:"🧭", value:"explore" },
      { label:"Maybe something romantic", emoji:"💫", value:"romance" },
    ],
  },
  {
    id:"q5", label:"When works for you?",
    question:"What time are you thinking?",
    options:[
      { label:"This afternoon",    emoji:"☀️", value:"afternoon" },
      { label:"Early evening",     emoji:"🌅", value:"evening"   },
      { label:"Later tonight",     emoji:"🌙", value:"night"     },
      { label:"Flexible",          emoji:"🎲", value:"anytime"   },
    ],
  },
  {
    id:"q6", label:"How far will you go?",
    question:"How far are you willing to travel?",
    options:[
      { label:"Walking distance",   emoji:"🚶", value:1 },
      { label:"Short ride (< 1.5 mi)", emoji:"🛵", value:2 },
      { label:"Worth the trip (< 3 mi)", emoji:"🚗", value:3 },
      { label:"Anywhere great",    emoji:"🗺️", value:4 },
    ],
  },
  {
    id:"q7", label:"Budget check",
    question:"What are you comfortable spending?",
    options:[
      { label:"Free only",         emoji:"🆓", value:0 },
      { label:"Up to $20",         emoji:"💵", value:1 },
      { label:"Up to $50",         emoji:"💳", value:2 },
      { label:"Whatever it takes", emoji:"💰", value:3 },
    ],
  },
  {
    id:"q8", label:"Meeting strangers",
    question:"How do you feel about meeting people you don't know?",
    options:[
      { label:"Prefer knowing people",      emoji:"😌", value:1 },
      { label:"Open if it flows naturally", emoji:"🌱", value:2 },
      { label:"Love meeting new faces",     emoji:"🤩", value:3 },
      { label:"Strangers are the whole point", emoji:"🌍", value:4 },
    ],
  },
];

function AuraOnboardingScreen({ onComplete }) {
  const [step, setStep]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const q       = ONBOARDING_QUESTIONS[step];
  const total   = ONBOARDING_QUESTIONS.length;
  const pct     = (step / total) * 100;

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        onComplete(answers);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loading, answers, onComplete]);

  function pick(value) {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (step < total - 1) {
      setStep(s => s + 1);
    } else {
      setLoading(true);
    }
  }

  if (loading) {
    return (
      <div className="h-full flex flex-col justify-center items-center bg-surface p-8 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[20%] left-[10%] w-[250px] h-[250px] aura-gradient rounded-full blur-[60px] opacity-75"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center">
          {/* Calibrating Orb */}
          <div 
            className="w-40 h-40 rounded-full mb-10 shadow-glow animate-spin" 
            style={{ 
              background: `radial-gradient(circle at 38% 33%, #F0EEFF 0%, ${C.purple} 45%, ${C.blue} 100%)`, 
              boxShadow: `0 20px 60px rgba(123,92,246,0.35)`,
              animationDuration: '3s'
            }}
          />
          <h2 className="font-display-lg text-2xl text-on-background font-extrabold tracking-tight text-center">
            Calibrating Aura...
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant/80 mt-2 text-center">
            Analyzing vibes & matching with squads
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-surface relative">
      {/* Progress bar */}
      <div className="h-1 bg-outline-variant/20 flex-shrink-0 w-full">
        <div 
          className="h-full bg-gradient-to-r from-primary via-tertiary to-secondary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
        <div>
          {/* Step label */}
          <div className="font-label-sm text-[10px] uppercase font-bold text-tertiary tracking-widest mb-2 mt-1">
            {q.label}
          </div>

          {/* Question */}
          <h3 className="font-headline-lg-mobile text-xl text-on-background font-extrabold leading-tight mb-8">
            {q.question}
          </h3>

          {/* Option cards */}
          <div className="flex flex-col gap-3">
            {q.options.map(opt => (
              <button
                key={String(opt.value)}
                onClick={() => pick(opt.value)}
                className="w-full flex items-center gap-4 bg-white border border-outline-variant/60 rounded-2xl p-4 text-left shadow-sm hover:border-tertiary hover:shadow-soft active:scale-[0.99] transition-all duration-150 group"
              >
                {/* Emoji box */}
                <span 
                  style={{ fontSize: '26px' }}
                  className="w-11 h-11 flex items-center justify-center bg-surface-container-low rounded-xl flex-shrink-0 group-hover:bg-primary-container/40 transition-colors"
                >
                  {opt.emoji}
                </span>
                <span className="font-label-md text-sm text-on-background leading-snug">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step counter */}
        <div className="text-center font-label-sm text-xs text-on-surface-variant/60 py-2">
          Question {step + 1} of {total}
        </div>
      </div>
    </div>
  );
}

export default function PlotApp() {
  const [authState, setAuthState] = useState("login");
  const [userName, setUserName] = useState("");
  const [screen, setScreen] = useState("discover");
  const [activeTab, setActiveTab] = useState("discover");
  const [addPopoverOpen, setAddPopoverOpen] = useState(false);
  const [selEvent, setSelEvent] = useState(null);
  const [energy, setEnergy] = useState(45);
  const [intent, setIntent] = useState("Explore");
  const [socialMode, setSocialMode] = useState("Open");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [onboardingDone, setOnboardingDone] = useState(false);

  // Compute real Aura scores whenever userProfile changes
  const scoredEvents = useMemo(() =>
    events
      .map(ev => ({ ...ev, match: computeAuraScore(userProfile, ev) }))
      .sort((a, b) => b.match - a.match),
    [userProfile]
  );

  function finishOnboarding(profile) {
    setUserProfile(profile);
    setOnboardingDone(true);
    setScreen("discover");
    setActiveTab("discover");
  }

  const go = (tab) => { setActiveTab(tab); setScreen(tab); };
  const openEvent = (ev) => { setSelEvent(ev); setScreen("event"); };

  const findPeople = async () => {
    setAiLoading(true);
    setAiResults(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:800,
          messages:[{role:"user",content:`You are Plot's AI "Aura". Generate 3 personalized event recommendations based on: Energy ${energy}/100 (${energy<35?"low-key":energy<65?"moderate":"high"}), Intent: ${intent}, Social mode: ${socialMode}. Reply ONLY with valid JSON, no markdown: {"events":[{"name":"...","vibe":"...","matchScore":92,"reason":"one sentence why it fits","time":"Tonight · 8 PM","distance":"0.4 mi","going":8}]}`}]
        })
      });
      const data = await res.json();
      const txt = data.content.map(c=>c.type==="text"?c.text:"").join("").replace(/```json|```/g,"").trim();
      setAiResults(JSON.parse(txt).events);
    } catch {
      setAiResults([
        {name:"Rooftop Jazz Night",vibe:"Chill Vibes",matchScore:94,reason:"Matches your relaxed energy and open social mode",time:"Tonight · 8 PM",distance:"0.4 mi",going:12},
        {name:"Art Gallery Opening",vibe:"Creative",matchScore:88,reason:"Low-pressure creative space perfect for exploration",time:"Tonight · 7 PM",distance:"0.8 mi",going:24},
        {name:"Sunset Picnic Social",vibe:"Laid Back",matchScore:83,reason:"Small group outdoor setting fits your preferences",time:"Today · 6:30 PM",distance:"1.2 mi",going:8},
      ]);
    }
    setAiLoading(false);
  };

  const tabs = [
    {id:"discover",label:"Discover"},{id:"map",label:"Map"},
    {id:"add",label:"Add"},{id:"aura",label:"Aura"},{id:"you",label:"You"},
  ];
  const tabScreenMap = {you:"profile"};

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", minHeight:"100vh", padding:"20px 16px 24px", background:"linear-gradient(135deg, #EDE8FC 0%, #E6F0FF 50%, #FDE8E0 100%)", fontFamily:"-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif" }}>
      <div style={{ marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
        <img src="logo.png" alt="Plot Logo" style={{ height:40, objectFit:"contain" }} onError={(e) => { e.target.style.display = 'none'; }} />
        <span style={{ fontSize:16, fontWeight:700, color:"#9A9590", letterSpacing:0, marginTop:10 }}>prototype</span>
      </div>
      <div style={{ width:375, background:C.bg, borderRadius:50, overflow:"hidden", boxShadow:"0 40px 80px rgba(0,0,0,0.22), 0 0 0 10px #1C1917, 0 0 0 12px #2E2E2E", display:"flex", flexDirection:"column", height:800 }}>
        <div style={{ background:C.bg, padding:"10px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
          <span style={{ fontSize:15, fontWeight:700, color:C.text }}>9:41</span>
          <div style={{ width:112, height:30, background:"#1C1917", borderRadius:20 }}/>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            <svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="3" width="2.5" height="7" rx="1" fill={C.text} opacity="0.4"/><rect x="4" y="2" width="2.5" height="8" rx="1" fill={C.text} opacity="0.6"/><rect x="8" y="0.5" width="2.5" height="9.5" rx="1" fill={C.text}/><rect x="12" y="0.5" width="4" height="9.5" rx="1" stroke={C.text} fill="none" strokeWidth="1"/><rect x="12.8" y="1.3" width="2.4" height="7.9" rx="0.5" fill={C.text}/></svg>
          </div>
        </div>
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
          {authState === "login" && <LoginScreen onContinue={() => setAuthState("onboarding")} />}
          {authState === "onboarding" && <OnboardingScreen onFinish={(name) => { setUserName(name); setAuthState("authenticated"); }} />}
          {authState === "authenticated" && (
            !onboardingDone
              ? <AuraOnboardingScreen onComplete={finishOnboarding}/>
              : <>
                  {screen === "discover" && <DiscoverScreen onEvent={openEvent} userName={userName} events={scoredEvents} userProfile={userProfile} />}
                  {screen === "map" && <MapScreen/>}
                  {screen === "aura" && <AuraChatScreen userProfile={userProfile} />}
                  {screen === "vibe" && <AuraScreen energy={energy} setEnergy={setEnergy} intent={intent} setIntent={setIntent} mode={socialMode} setMode={setSocialMode} onFind={findPeople} loading={aiLoading} results={aiResults}/>}
                  {screen === "pulse" && <PulseScreen/>}
                  {screen === "hostEvent" && <HostEventScreen onBack={() => setScreen("discover")} />}
                  {screen === "postSignal" && <PostSignalScreen onBack={() => setScreen("discover")} />}
                  {screen === "profile" && <ProfileScreen onSettings={() => setScreen("settings")} />}
                  {screen === "settings" && <SettingsScreen onBack={() => setScreen("profile")} />}
                  {screen === "event" && selEvent && <EventDetail event={selEvent} onBack={()=>setScreen("discover")} reasons={getMatchReasons(userProfile, selEvent)}/>}
                  
                  {/* Interactive Add Popover */}
                  {addPopoverOpen && (
                    <div 
                      className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex flex-col justify-end transition-all duration-300"
                      onClick={() => setAddPopoverOpen(false)}
                    >
                      <div 
                        className="bg-white rounded-t-[32px] p-6 pb-8 shadow-2xl flex flex-col gap-4 transform translate-y-0 transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Pull Bar */}
                        <div className="w-12 h-1 bg-outline-variant/60 rounded-full mx-auto mb-2" />
                        
                        <h3 className="font-display-lg text-lg font-extrabold text-on-background mb-1">Create or Tune</h3>
                        
                        {/* Option: Talk to Aura AI */}
                        <button 
                          onClick={() => {
                            setAddPopoverOpen(false);
                            setActiveTab("aura");
                            setScreen("aura");
                          }}
                          className="flex items-center gap-4 p-4 rounded-3xl bg-gradient-to-r from-primary/10 via-tertiary/10 to-secondary/10 border border-primary/20 text-left hover:opacity-95 transition-all active:scale-[0.98]"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary via-tertiary to-secondary flex items-center justify-center text-white flex-shrink-0 shadow-md overflow-hidden">
                            <img src="logo.png" alt="" className="w-8 h-8 object-contain" onError={(e)=>{e.target.style.display='none';e.target.parentElement.innerHTML='<span class="material-symbols-outlined text-white text-[22px]" style="font-variation-settings:\'FILL\' 1">psychology</span>';}} />
                          </div>
                          <div>
                            <div className="font-label-md text-sm font-extrabold text-on-background">Talk to Aura AI</div>
                            <p className="font-body-md text-xs text-on-surface-variant/80 mt-0.5 leading-tight">
                              Chat with your AI social compass to tune your vibe.
                            </p>
                          </div>
                        </button>

                        {/* Option: Host Event */}
                        <button 
                          onClick={() => {
                            setAddPopoverOpen(false);
                            setScreen("hostEvent");
                          }}
                          className="flex items-center gap-4 p-4 rounded-3xl bg-surface border border-outline-variant/20 text-left hover:bg-surface-container-low transition-all active:scale-[0.98]"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-primary-container flex items-center justify-center text-primary flex-shrink-0 border border-primary/10 shadow-sm">
                            <span className="material-symbols-outlined text-[22px]">
                              groups
                            </span>
                          </div>
                          <div>
                            <div className="font-label-md text-sm font-bold text-on-background">Host Event</div>
                            <p className="font-body-md text-xs text-on-surface-variant/70 mt-0.5 leading-tight">
                              Create a new event, invite friends, and form a squad.
                            </p>
                          </div>
                        </button>

                        {/* Option: Post a Signal */}
                        <button 
                          onClick={() => {
                            setAddPopoverOpen(false);
                            setScreen("postSignal");
                          }}
                          className="flex items-center gap-4 p-4 rounded-3xl bg-surface border border-outline-variant/20 text-left hover:bg-surface-container-low transition-all active:scale-[0.98]"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary flex-shrink-0 border border-secondary/10 shadow-sm">
                            <span className="material-symbols-outlined text-[22px]">
                              local_fire_department
                            </span>
                          </div>
                          <div>
                            <div className="font-label-md text-sm font-bold text-on-background">Post a Signal</div>
                            <p className="font-body-md text-xs text-on-surface-variant/70 mt-0.5 leading-tight">
                              Let nearby matches know what you're up to right now.
                            </p>
                          </div>
                        </button>

                        {/* Cancel Button */}
                        <button 
                          onClick={() => setAddPopoverOpen(false)}
                          className="w-full py-3.5 rounded-full bg-surface-container border border-outline-variant/30 text-on-surface font-label-md text-sm font-bold active:scale-[0.98] transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </>
          )}
        </div>
        {authState === "authenticated" && onboardingDone && screen !== "event" && screen !== "settings" && screen !== "hostEvent" && screen !== "postSignal" && (
          <div style={{ background:C.navBg, borderTop:`1px solid ${C.border}`, padding:"8px 0 22px", display:"flex", justifyContent:"space-around", flexShrink:0 }}>
            {tabs.map(tab=>{
              const screenId = tabScreenMap[tab.id]||tab.id;
              const isActive = activeTab===tab.id;
              return (
                <button 
                  key={tab.id} 
                  onClick={() => {
                    if (tab.id === "add") {
                      setAddPopoverOpen(true);
                    } else {
                      setActiveTab(tab.id);
                      setScreen(screenId);
                    }
                  }} 
                  style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"4px 10px", color:isActive?C.purple:C.muted }}
                >
                  <NavIcon type={tab.id==="you"?"you":tab.id} active={isActive}/>
                  <span style={{ fontSize:10, fontWeight:isActive?700:400 }}>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div style={{ marginTop:16, fontSize:12, color:"rgba(28,25,23,0.5)", textAlign:"center" }}>
        Tap <strong style={{ color:C.purple }}>Aura</strong> to get AI-powered event recommendations
      </div>
    </div>
  );
}
