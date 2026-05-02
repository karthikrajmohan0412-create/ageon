// Curated Unsplash imagery for AGEON brand.
// Each URL is constructed with auto-format + quality + crop params.
// All photos have been verified to return HTTP 200.

const base = "https://images.unsplash.com/photo-";
const params = (w: number, h?: number) =>
  `?auto=format&q=80&w=${w}&fit=crop${h ? `&h=${h}` : ""}`;

export const imagery = {
  hero: {
    // Subdued / "living" left side — figure looking pensive
    living: `${base}1545167622-3a6ac756afa4${params(1200, 1400)}`,
    // Vibrant / "alive" right side — active, healthy person
    alive: `${base}1571019613454-1cb2f99b2d8b${params(1200, 1400)}`,
  },
  pillars: {
    // Prevention — clinical / health monitoring
    prevention: `${base}1576091160399-112ba8d25d1d${params(800, 1000)}`,
    // Regeneration — sauna / recovery space
    regeneration: `${base}1571902943202-507ec2618e8f${params(800, 1000)}`,
    // Adaptation — consultation / clinical advisory
    adaptation: `${base}1559757148-5c350d0d3c56${params(800, 1000)}`,
  },
  witness: {
    // Lifestyle — measurable improvement / vitality
    lifestyle: `${base}1583416750470-965b2707b355${params(1000, 1200)}`,
  },
  membership: {
    // Recovery / spa atmosphere — backdrop only
    backdrop: `${base}1540555700478-4be289fbecef${params(1600, 900)}`,
  },
  location: {
    // Kochi / India context (river / building)
    kochi: `${base}1582510003544-4d00b7f74220${params(1400, 1000)}`,
  },
  testimonials: {
    rajesh: `${base}1507003211169-0a1dd7228f2d${params(160, 160)}`,
    ananya: `${base}1438761681033-6461ffad8d80${params(160, 160)}`,
    vivek: `${base}1573497019418-b400bb3ab074${params(160, 160)}`,
    suresh: `${base}1556228720-195a672e8a03${params(160, 160)}`,
    priya: `${base}1599901860904-17e6ed7083a0${params(160, 160)}`,
  },
};
