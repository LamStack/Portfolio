export type Project = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  repo: string;
  live?: string;
  highlight?: string;
};

export const projects: Project[] = [
  {
    name: "Auctor",
    tagline: "Bahrain's first gamified assessments platform",
    description:
      "AI hiring platform that helps companies hire on real ability, not just a CV. Candidates play through role-specific engines: a real coding IDE, a real SQL sandbox, a branching sales scenario, adaptive soft-skill mini-games, and it turns their run into a skill report with a rank against everyone else on the same track.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Claude API", "Monaco Editor"],
    repo: "https://github.com/LamStack/Auctor",
    live: "https://auctor-eta.vercel.app",
    highlight: "Semi-Finalist, Startup Bahrain",
  },
  {
    name: "Wafid",
    tagline: "An AI travel companion that knows you've landed",
    description:
      "Activates the moment a phone starts roaming in a new country, using telecom network signals instead of GPS, so it works without the traveler even opening the app. An AI agent authenticates via CAMARA Number Verification, detects the border crossing via CAMARA Device Status, generates a personalized arrival briefing with Claude, and stays on as a chat companion for the rest of the trip.",
    tags: ["CAMARA APIs", "Claude API", "Next.js", "Hackathon"],
    repo: "https://github.com/LamStack/Wafid",
    highlight: "Built for GSMA's MENA Ignite Hackathon (with Nokia)",
  },
  {
    name: "BlinkTalk",
    tagline: "Turning eye blinks into speech",
    description:
      "An assistive communication system for people with severe disabilities. A Raspberry Pi and camera track eye blinks with MediaPipe Face Mesh, translate them into Morse code, and convert that into text, speech, and calls or SMS via Twilio, with an autocomplete engine to speed everything up.",
    tags: ["Raspberry Pi", "MediaPipe", "Computer Vision", "Twilio"],
    repo: "https://github.com/LamStack/BlinkTalk-website",
    live: "https://blink-talk-website.vercel.app",
    highlight: "1st Place, Senior Projects Exhibition",
  },
  {
    name: "BrightSmile Triage Console",
    tagline: "An AI front desk that never panics",
    description:
      "A working prototype of an AI-assisted triage console for a busy dental clinic running on two staff and three remaining slots, deciding who gets handled first across a VIP cancellation, an angry double-charge, a same-day request, and more. Built in pure HTML/CSS/JS, no backend required.",
    tags: ["JavaScript", "AI Prototyping", "UX"],
    repo: "https://github.com/LamStack/BuildersLeageChallenge",
    highlight: "DOO Builders League Challenge",
  },
  {
    name: "VoidChat",
    tagline: "Real-time chat with a bit of personality",
    description:
      "A multi-channel chat app with live text, image sharing with built-in compression, in-browser audio recording, and emoji reactions: general, media-share, and random channels with unread badges to keep track of it all.",
    tags: ["Firebase", "Realtime", "JavaScript"],
    repo: "https://github.com/LamStack/VoidChat",
    live: "https://void-chat-two.vercel.app",
  },
  {
    name: "StuServe",
    tagline: "Student talent, professional results",
    description:
      "A marketplace connecting talented Bahraini students with people who need design, tutoring, photography, writing, and more, with a soft, editorial visual language built to make student work feel credible.",
    tags: ["HTML/CSS", "Design System"],
    repo: "https://github.com/LamStack/StuServe",
  },
  {
    name: "Salmaniya Medical Complex",
    tagline: "A bilingual hospital site, built RTL-first",
    description:
      "A full Arabic (RTL) informational website for مجمع السلمانية الطبي, Bahrain's largest medical complex, covering departments, services, and visitor information with a calm, clinical visual language.",
    tags: ["HTML/CSS", "RTL", "Arabic UX"],
    repo: "https://github.com/LamStack/SalmaniyaMedicalComplex",
  },
];
