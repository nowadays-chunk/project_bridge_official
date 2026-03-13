export type ProjectItem = {
  slug: string;
  name: string;
  href: string;
  summary: string;
  shaping: string[];
};

export type IndustryItem = {
  slug: string;
  category: string;
  overview: string;
  shaping: string[];
  projects: ProjectItem[];
};

export const heroContent = {
  kicker: "Project Bridge",
  title: "2026 / 2035 — Making The Applications Work Efficiently",
  subtitle:
    "Reach 100 projects by 2035 — each 40% big, but 100% complete",
  highlights: ["9 Industries", "14 Applications", "2035 Horizon"],
};

export const visionStatements = [
  "Everything is a knowledge base system with different processings.",
  "Make To Believe, Believe To Share",
];

export const industries: IndustryItem[] = [
  {
    slug: "banking",
    category: "Banking",
    overview:
      "We are shaping banking as calm, trusted application infrastructure where flows become clearer, more complete, and operationally dependable.",
    shaping: [
      "We frame banking workflows into structured, understandable application systems.",
      "We prioritize trust, stability, and clarity over unnecessary complexity.",
      "We build toward complete execution rather than fragmented financial tooling.",
    ],
    projects: [
      {
        slug: "banking-application",
        name: "Banking Application",
        href: "banking.projectbridge.space",
        summary:
          "A focused banking product shaped around reliable movement, readable operations, and practical completeness.",
        shaping: [
          "We simplify financial flows into clear application steps.",
          "We reduce friction between operations, visibility, and control.",
          "We keep the product grounded in trust and execution quality.",
        ],
      },
    ],
  },
  {
    slug: "architects",
    category: "Architects",
    overview:
      "We are shaping architecture tools as systems for thinking, modeling, and aligning design intention with executable structure.",
    shaping: [
      "We turn architectural reasoning into visible system decisions.",
      "We make structure easier to explain, share, and evolve.",
      "We treat design systems as operational knowledge bases.",
    ],
    projects: [
      {
        slug: "system-designer",
        name: "System Designer",
        href: "architecture.projectbridge.space",
        summary:
          "A design environment for structuring systems with more clarity, coherence, and strategic intent.",
        shaping: [
          "We make system composition more deliberate and intelligible.",
          "We help architecture move from abstract thinking to usable models.",
          "We keep complexity visible without making the experience heavy.",
        ],
      },
    ],
  },
  {
    slug: "developers-utilities",
    category: "Developers Utilities",
    overview:
      "We are shaping developer utilities as practical knowledge surfaces that help engineers inspect, understand, and work faster with confidence.",
    shaping: [
      "We remove friction from technical exploration and learning.",
      "We translate complexity into tools that reveal system logic.",
      "We value usefulness, insight, and speed of understanding.",
    ],
    projects: [
      {
        slug: "code-explorer",
        name: "Code Explorer",
        href: "explorer.projectbridge.space",
        summary:
          "A utility for reading codebases with more structure, confidence, and navigational clarity.",
        shaping: [
          "We help developers see code as an organized system.",
          "We reduce the cognitive cost of moving through implementation details.",
          "We make technical discovery feel cleaner and more direct.",
        ],
      },
      {
        slug: "algorithms-visualizer",
        name: "Algorithms Visualizer",
        href: "algorithms.projectbridge.space",
        summary:
          "A visual learning and inspection environment for understanding algorithmic behavior more clearly.",
        shaping: [
          "We turn abstract algorithmic movement into visible reasoning.",
          "We support learning through clarity rather than overload.",
          "We make logic easier to observe, compare, and retain.",
        ],
      },
    ],
  },
  {
    slug: "business",
    category: "Business",
    overview:
      "We are shaping business applications as systems of decision support, operational clarity, and repeatable usefulness.",
    shaping: [
      "We organize business tasks into more usable application flows.",
      "We make generation, publishing, and review more direct.",
      "We keep products close to what people actually need to get done.",
    ],
    projects: [
      {
        slug: "queries-generators",
        name: "Queries Generators",
        href: "queries.projectbridge.space",
        summary:
          "A business utility for producing structured query outputs with speed, consistency, and practical value.",
        shaping: [
          "We reduce manual repetition through clearer generation systems.",
          "We support repeatable outputs with more confidence and less waste.",
          "We shape the tool around direct business usefulness.",
        ],
      },
      {
        slug: "news-application",
        name: "News Application",
        href: "news.projectbridge.space",
        summary:
          "A news-focused application designed for readable distribution, organized content, and disciplined presentation.",
        shaping: [
          "We structure information so it can be consumed more intelligently.",
          "We keep editorial flows orderly and useful.",
          "We reduce noise while preserving reach and accessibility.",
        ],
      },
    ],
  },
  {
    slug: "consultancy",
    category: "Consultancy",
    overview:
      "We are shaping consultancy as an operating system for advice, process visibility, and higher-quality execution support.",
    shaping: [
      "We clarify consulting work into structured operating flows.",
      "We make expertise easier to deliver as a system.",
      "We align strategic support with practical execution tools.",
    ],
    projects: [
      {
        slug: "consultant-os",
        name: "Consultant OS",
        href: "consultancy.projectbridge.space",
        summary:
          "An operating environment for consultancy workflows, decision structure, and service clarity.",
        shaping: [
          "We organize consulting work into reusable systems.",
          "We support better visibility across strategy and delivery.",
          "We build toward a cleaner relationship between advice and action.",
        ],
      },
    ],
  },
  {
    slug: "integrators",
    category: "Integrators",
    overview:
      "We are shaping integrator products as connective application systems that make deployment, composition, and adaptation more complete.",
    shaping: [
      "We help systems connect with more reliability and less friction.",
      "We support adaptation without sacrificing clarity.",
      "We build products that move from setup toward durable operation.",
    ],
    projects: [
      {
        slug: "e-commerce",
        name: "E-commerce",
        href: "ecommerce.projectbridge.space",
        summary:
          "A commerce application shaped for connected operations, cleaner transactions, and adaptable growth.",
        shaping: [
          "We structure commerce around operational continuity.",
          "We improve the relationship between product, order, and system flow.",
          "We keep the platform practical, scalable, and complete.",
        ],
      },
      {
        slug: "cms",
        name: "CMS",
        href: "cms.projectbridge.space",
        summary:
          "A content management system designed for clarity, structure, and controlled publishing workflows.",
        shaping: [
          "We make content systems easier to operate with confidence.",
          "We reduce publishing complexity without reducing capability.",
          "We shape content operations as durable application structure.",
        ],
      },
      {
        slug: "project-deployer",
        name: "Project Deployer",
        href: "deployer.projectbridge.space",
        summary:
          "A deployment-oriented application for shipping systems with more consistency and operational steadiness.",
        shaping: [
          "We simplify the movement from prepared work to live execution.",
          "We make deployment more visible and less fragile.",
          "We support repeatable delivery flows that stay understandable.",
        ],
      },
      {
        slug: "themer",
        name: "Themer",
        href: "themer.projectbridge.space",
        summary:
          "A theming system for controlling visual language with more consistency, flexibility, and compositional elegance.",
        shaping: [
          "We make interface adaptation more systematic.",
          "We help visual systems remain coherent across products.",
          "We treat theming as infrastructure, not surface decoration alone.",
        ],
      },
    ],
  },
  {
    slug: "sound-processing",
    category: "Sound Processing",
    overview:
      "We are shaping sound applications as precise environments for creative work, listening structure, and processing clarity.",
    shaping: [
      "We support creative flow with less operational noise.",
      "We make sound handling more deliberate and more complete.",
      "We design for expressive capability without losing calm structure.",
    ],
    projects: [
      {
        slug: "music-application",
        name: "Music Application",
        href: "music.projectbridge.space",
        summary:
          "A sound-focused product designed for cleaner musical workflows and more intentional processing experiences.",
        shaping: [
          "We shape music interaction around expressive clarity.",
          "We reduce friction in the path from idea to handling.",
          "We support sound work through focused application structure.",
        ],
      },
    ],
  },
  {
    slug: "video-processing",
    category: "Video Processing",
    overview:
      "We are shaping video applications as systems for structured media work, cleaner operations, and purposeful processing.",
    shaping: [
      "We make video workflows easier to understand and operate.",
      "We reduce unnecessary complexity in processing-heavy interfaces.",
      "We build toward complete media systems instead of isolated utilities.",
    ],
    projects: [
      {
        slug: "video-application",
        name: "Video Application",
        href: "video.projectbridge.space",
        summary:
          "A video product shaped for processing clarity, operational flow, and a more stable media experience.",
        shaping: [
          "We organize media actions into coherent processing steps.",
          "We improve the relationship between control, preview, and output.",
          "We keep the product grounded in practical execution quality.",
        ],
      },
    ],
  },
  {
    slug: "business-integration",
    category: "Business Integration",
    overview:
      "We are shaping business integration as a knowledge-driven layer where systems, teams, and operational logic become more aligned.",
    shaping: [
      "We turn organizational knowledge into usable system structure.",
      "We connect process understanding with practical application delivery.",
      "We build for continuity, clarity, and decision confidence.",
    ],
    projects: [
      {
        slug: "knowledge-base-system",
        name: "Knowledge Base System",
        href: "knowledge.projectbridge.space",
        summary:
          "A knowledge-driven application for structuring information, process logic, and operational understanding.",
        shaping: [
          "We make knowledge more usable inside live application systems.",
          "We support teams through clearer structure and retrieval.",
          "We shape information into a system that can be acted on.",
        ],
      },
    ],
  },
];

export const projectGroups = industries;

export const allProjects = industries.flatMap((industry) =>
  industry.projects.map((project) => ({
    ...project,
    industrySlug: industry.slug,
    industryCategory: industry.category,
    industryOverview: industry.overview,
  })),
);

export function getIndustryBySlug(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export function getProjectBySlug(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}

export const principleGroups = [
  {
    title: "Principles",
    items: ["Frame", "Capability", "Agreement"],
  },
  {
    title: "Values",
    items: ["Belief", "Justice", "Fortune"],
  },
];

export const philosophyContent = {
  opening: "Oh! We are Dancing…!",
  rules: [
    "Don’t do anything that we don’t want",
    "Don’t do anything that will cost us a lot",
    "Don’t do anything that the users don’t want",
  ],
};

export const companyItems = [
  "Software Development & Engineering",
  "Coding Unleashed LLC",
  "Hamza El Jaouhari",
];
