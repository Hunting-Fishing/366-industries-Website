export type Game = {
  slug: string; title: string; label: string; tagline: string; summary: string;
  image: string; color: string; mission: string; loop: string[]; rules: string[]; outcomes: string[];
};

export const games: Game[] = [
  {
    slug: "carrington-protocol", title: "Carrington Protocol", label: "Flagship physical board game",
    tagline: "When the grid goes dark, cooperation becomes the protocol.",
    summary: "A cooperative disaster-preparedness board game set during an extreme solar storm. Players stabilize power, water, communications, transport and community trust before cascading failures overwhelm the region.",
    image: "/assets/carrington-protocol-hero.png", color: "#ff6a21", mission: "Turn real preparedness, repair and coordination into a tense tabletop experience where every role matters and the strongest strategy is keeping communities connected.",
    loop: ["Reveal the solar-weather forecast and crisis cards", "Assign specialist roles and limited equipment", "Repair critical systems and establish local resilience hubs", "Share resources before failures cascade across the map", "Complete the recovery objective before time and trust run out"],
    rules: ["Players win or lose together.", "Every round advances the disruption timeline.", "Power, water, communications, mobility and trust are connected systems.", "Resources can be traded, repaired or repurposed—but never created without cost.", "Scenario guidance is educational gameplay, not professional emergency instruction."],
    outcomes: ["Critical power restored", "Water access protected", "Communications reconnected", "Community recovery completed"]
  },
  {
    slug: "world-fix", title: "World Fix", label: "Digital world-building game",
    tagline: "Repair one community. Connect a better world.",
    summary: "A hopeful strategy and puzzle game where every level begins with a real problem—unsafe water, flooding, waste, unemployment or broken access—and ends with a visible, working solution.",
    image: "/assets/worldfix.png", color: "#f15a24", mission: "Make problem-solving satisfying, visual and shareable while introducing players to practical ideas that communities can use today.",
    loop: ["Choose a community challenge", "Build a solution with limited resources", "Balance people, nature and prosperity", "See the community visibly recover", "Connect successful solutions to the world map"],
    rules: ["Every level must show a clear before and after.", "Solutions must be based on plausible tools or community actions.", "No pay-to-win progress or punishment for taking a break.", "Failure teaches; it never humiliates the player.", "Players win by improving lives, not destroying opponents."],
    outcomes: ["Clean water restored", "Local work created", "Disaster risk reduced", "Community trust increased"]
  },
  {
    slug: "drone-guardian", title: "Drone Guardian", label: "Rescue & wildlife awareness",
    tagline: "See the danger. Reach them first.",
    summary: "Short, skill-based drone missions: spot swimmers in trouble, scan for crocodiles or sharks, deliver a GPS rescue raft, map flood routes and bring urgent medicine.",
    image: "/assets/drone-guardian.png", color: "#49c7ba", mission: "Turn practical rescue uses for drones into tense, accessible play that builds awareness without pretending a game replaces trained responders.",
    loop: ["Read the weather and mission brief", "Launch with limited battery and payload", "Scan, identify and prioritize", "Deliver, warn or map", "Earn accuracy and response-time ratings"],
    rules: ["Rescue and prevention always outrank score chasing.", "Wildlife is observed and avoided, never harmed.", "Battery, weather and payload limits matter.", "Civilian privacy is part of every mission.", "Real emergency guidance is clearly separated from gameplay."],
    outcomes: ["Faster simulated rescue", "Safer route identified", "Wildlife hazard avoided", "Supplies delivered"]
  },
  {
    slug: "relief-run", title: "Relief Run", label: "Disaster logistics puzzle",
    tagline: "Every minute. Every route. Every life.",
    summary: "A low-cost routing game where players coordinate boats, trucks, volunteers and drones after storms while roads close, needs change and supplies remain limited.",
    image: "/assets/community-relief.png", color: "#70b8df", mission: "Show why good information, fair prioritization and last-mile coordination matter during disaster response.",
    loop: ["Review verified community needs", "Pack limited supplies", "Choose safe delivery routes", "Adapt to changing conditions", "Publish a transparent mission result"],
    rules: ["Urgency and vulnerability guide priority.", "No community is disposable.", "Unverified reports must be checked.", "Players cannot hoard or sell donated supplies.", "Scores reward lives reached and waste prevented."],
    outcomes: ["Families reached", "Waste prevented", "Routes reopened", "Needs verified"]
  },
  {
    slug: "community-builder", title: "Community Builder", label: "Small-business simulation",
    tagline: "Start small. Build something that lasts.",
    summary: "A friendly business-building game about launching useful local services—from repair and water refills to food, farming and solar cleaning—without unrealistic overnight riches.",
    image: "/assets/community-relief.png", color: "#f0b84b", mission: "Make the fundamentals of small business understandable through quick decisions, visible customer impact and realistic trade-offs.",
    loop: ["Choose a real local need", "Start with a tiny budget", "Price, serve and reinvest", "Train workers and improve quality", "Share a proven model with another community"],
    rules: ["Revenue must come from delivering real value.", "Cash flow matters more than vanity growth.", "Fair wages and safe products are mandatory.", "Debt and expansion create real trade-offs.", "The strongest businesses improve their community."],
    outcomes: ["Income stabilized", "Jobs supported", "Useful service opened", "Skills transferred"]
  }
];
