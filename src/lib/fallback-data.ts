import type { Database } from '@/types/database'

type Event = Database['public']['Tables']['events']['Row']
type Publication = Database['public']['Tables']['publications']['Row']
type TeamMember = Database['public']['Tables']['team_members']['Row']
type FAQ = Database['public']['Tables']['faqs']['Row']

export interface Mentor {
  name: string
  role: string
  company: string
  credentials: string
  bio: string
  linkedin_url?: string
}

export interface ClientProject {
  id: string
  client: string
  tagline: string
  domain: string
  overview: string
  deliverables: string[]
  impact: string
  logo: string
  status?: string
}

export interface Achievement {
  id: string
  title: string
  competition: string
  organizer: string
  tier: 'Winner' | 'Runner-Up' | 'Finalist' | 'Top Podium'
  description: string
  year: string
}

export const FALLBACK_PUBLICATIONS: Publication[] = [
  {
    id: 'pub-cheap-sovereignty',
    title: 'End of Cheap Sovereignty: Debt, Fiscal Fragility & Capital Realignment',
    authors: 'Macroeconomic & Global Strategy Desk',
    category: 'Macro',
    year: 2026,
    abstract: 'An empirical examination of how the structural conclusion of ultra-low global interest rates is permanently reshaping sovereign debt issuance, debt-to-GDP sustainability trajectories, currency volatility, and institutional asset allocation across emerging and developed markets.',
    pdf_link: '/END%20OF%20CHEAP%20SOVEREIGNTY%20REPORT.pdf',
    cover_image: '/publications/covers/end-of-cheap-sovereignty.webp',
    is_free: true,
    read_time: 15,
    created_at: new Date('2026-03-01').toISOString(),
  },
  {
    id: 'pub-big-beautiful-bill',
    title: 'One Big Beautiful Bill: Navigating US Debt, Fiscal Shocks & Global Markets',
    authors: 'Macroeconomic & Global Strategy Desk',
    category: 'Macro',
    year: 2026,
    abstract: 'Thematic macro brief examining the international market ramifications of landmark US fiscal policy legislation. Assesses sovereign debt issuance, yield curve implications, USD currency dynamics, and downstream spillover effects across APAC emerging markets.',
    pdf_link: '/one%20big%20beatiful%20bill.pdf',
    cover_image: '/publications/covers/one-big-beautiful-bill.webp',
    is_free: true,
    read_time: 10,
    created_at: new Date('2026-01-25').toISOString(),
  },
  {
    id: 'pub-ai-bubble',
    title: 'Is the AI Bubble About to Burst? Valuations, Multiples & Market Realities',
    authors: 'Technology & Venture Capital Coverage Desk',
    category: 'Sector notes',
    year: 2026,
    abstract: 'An investigative teardown dissecting mega venture rounds ($183B, $500B), sky-high forward enterprise value multiples, hyperscaler capex runways, and post-hype consolidation. Analyzes unit economics, customer churn in AI SaaS, and structural margin sustainability.',
    pdf_link: '/is%20ai%20bubble%20about%20to%20burst.pdf',
    cover_image: '/publications/covers/is-ai-bubble-about-to-burst.webp',
    is_free: true,
    read_time: 8,
    created_at: new Date('2026-02-20').toISOString(),
  },
  {
    id: 'pub-wmi-microfinance',
    title: 'Sustaining Rural Credit Access: Strategic Analysis of WMI Microfinance',
    authors: 'IFSA Research Vertical · Micro-Thesis Series',
    category: 'Case studies',
    year: 2026,
    abstract: 'An in-depth empirical investigation into Women’s Microfinance Initiative (WMI) operating across East Africa. Explores loan velocity, 97.5% historical repayment rates, transition to mobile money (M-Pesa/Airtel), and sustainable blended finance structures for rural empowerment.',
    pdf_link: '/Sustaining%20Rural%20Credit%20Access.pdf',
    cover_image: '/publications/covers/sustaining-rural-credit-access.webp',
    is_free: true,
    read_time: 8,
    created_at: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'pub-wise-plc',
    title: 'Wise PLC: Unlocking Global Financial Connectivity Through Tech & Trust',
    authors: 'Fintech & Payments Research Desk',
    category: 'Sector notes',
    year: 2025,
    abstract: 'Comprehensive industry teardown of Wise PLC (LON: WISE). Analyzes direct central bank API rails, cross-border fee compression to <0.6%, unit economics, sustained 33% EBITDA margin profile, and competitive moats against legacy SWIFT and fintech contenders.',
    pdf_link: '/wise%20pe%20report.pdf',
    cover_image: '/publications/covers/wise-plc.webp',
    is_free: true,
    read_time: 10,
    created_at: new Date('2025-11-20').toISOString(),
  },
  {
    id: 'pub-kia-motors',
    title: 'Kia Motors: Global Strategy, EV Expansion & Indian Market Leadership',
    authors: 'Automotive & Industrials Coverage Team',
    category: 'Equity research',
    year: 2025,
    abstract: 'Equity research initiation on Kia Corporation. Deep-dives into the $2B Anantapur manufacturing facility, EV transition roadmaps (EV6 & EV9 platforms), global supply chain agility, operating margin trajectory, and discounted cash flow (DCF) valuation.',
    pdf_link: '/kia%20motors%20equity%20report.pdf',
    cover_image: '/publications/covers/kia-motors.webp',
    is_free: true,
    read_time: 12,
    created_at: new Date('2025-09-10').toISOString(),
  },
  {
    id: 'pub-hcltech',
    title: 'HCLTech: Digital Engineering Resilience & Mode 1-2-3 Growth Playbook',
    authors: 'TMT Equity Research Desk',
    category: 'Equity research',
    year: 2025,
    abstract: 'Comprehensive valuation and business model appraisal of HCL Technologies. Evaluates the strategic edge in Engineering and R&D Services (ERS), margin resilience in software products, Generative AI cloud alliances, and long-term shareholder return potential.',
    pdf_link: '/hcl%20tech%20equity%20report.pdf',
    cover_image: '/publications/covers/hcltech.webp',
    is_free: true,
    read_time: 11,
    created_at: new Date('2025-06-18').toISOString(),
  },
]

export const FALLBACK_EVENTS: Event[] = [
  {
    id: 'ev-ifsa-forum-2026',
    title: 'IFSA Forum 2026: Flagship Finance Summit',
    tag: 'Networking',
    date: '07 Feb 2026',
    venue: 'NIT Trichy Campus & Virtual',
    description: 'The inaugural national finance summit at NIT Trichy featuring executive keynotes, M&A strategy panels, live venture workshops, and inter-collegiate leadership networking.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 200,
    created_at: new Date('2026-02-07').toISOString(),
  },
  {
    id: 'ev-ifsc-case-comp',
    title: 'IFSC 2026: National Finance & Strategy Case Competition',
    tag: 'Case competition',
    date: '08 Feb 2026',
    venue: 'Main Auditorium / Online Finals',
    description: 'Premier national case challenge with ₹1,20,000 cash prizes and ₹17 Lakhs total rewards. Grand finale judged by Anil Gutlapalli (Vice President, Northern Trust).',
    registration_link: '#',
    is_upcoming: false,
    attendance: 150,
    created_at: new Date('2026-02-08').toISOString(),
  },
  {
    id: 'ev-hsbc-masterclass',
    title: 'Executive Masterclass: Global Banking & Risk Architectures',
    tag: 'Speaker session',
    date: '15 Mar 2026',
    venue: 'Virtual Keynote Room',
    description: 'Exclusive executive session hosted by Santhesh Aloysius, FRM (Assistant Director, HSBC) on structured finance, Basel regulations, and global debt market mechanics.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 120,
    created_at: new Date('2026-03-15').toISOString(),
  },
  {
    id: 'ev-kpmg-masterclass',
    title: 'From Engineering to High Finance: Strategy & M&A Advisory',
    tag: 'Speaker session',
    date: '28 Mar 2026',
    venue: 'Auditorium Hall 2',
    description: 'Keynote by Chezhian P (Director, KPMG Global Services) exploring how quantitative engineering rigor transforms private equity diligence and corporate M&A advisory.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 140,
    created_at: new Date('2026-03-28').toISOString(),
  },
  {
    id: 'ev-wso-session',
    title: 'Wall Street Oasis (WSO) Global Finance Fireside Q&A',
    tag: 'Speaker session',
    date: '12 Apr 2026',
    venue: 'Interactive Webinar Room',
    description: 'Direct interactive Q&A session with Patrick Curtis (Founder & CEO, Wall Street Oasis) on breaking into bulge-bracket investment banking, private equity, and hedge funds.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 250,
    created_at: new Date('2026-04-12').toISOString(),
  },
  {
    id: 'ev-market-mania',
    title: 'Market Mania: Freshers Orientation & Trading Simulation',
    tag: 'Trading and markets',
    date: '20 Jan 2026',
    venue: 'NIT Trichy Campus',
    description: 'Flagship orientation event welcoming 150+ first-year engineers with live stock trading floor simulations, portfolio bidding, and M&A synergy teardowns.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 150,
    created_at: new Date('2026-01-20').toISOString(),
  },
  {
    id: 'ev-modelling-bootcamp',
    title: 'Syndicate & Life Ledger: Financial Modeling Workshop',
    tag: 'Workshop',
    date: '18 Apr 2026',
    venue: 'Financial Computation Lab',
    description: 'Hands-on 3-statement modeling, three-stage DCF, sensitivity matrices, and valuation comps for chapter analysts and aspiring participants.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 80,
    created_at: new Date('2026-04-18').toISOString(),
  },
]

export const FALLBACK_MENTORS: Mentor[] = [
  {
    name: 'Aruniya Selladurai',
    role: 'Chapter Mentor & Advisory Board',
    company: 'Impactable Investment Group (London)',
    credentials: 'CFA Charterholder · Cambridge University (MSc Finance)',
    bio: 'Investment Analyst in London focusing on impact investing, global capital allocation, and sustainable finance. Mentors IFSA NIT Trichy analysts on international valuation standards and research rigour.',
    linkedin_url: 'https://www.linkedin.com/in/aruniyaselladurai',
  },
  {
    name: 'Anagha Sethuraman',
    role: 'Chapter Mentor & Advisory Board',
    company: 'Edelweiss Alternatives',
    credentials: 'ex-D.E. Shaw & Bain & Company · IIM Calcutta ’24 · NIT Trichy Alum',
    bio: 'Alternative asset investment professional with top-tier private equity and management consulting experience. Guides chapter members on case competition strategy, consulting frameworks, and career pathways.',
    linkedin_url: 'https://www.linkedin.com/in/anagha-sethuraman',
  },
]

export const FALLBACK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-achyuth-sai',
    name: 'Achyuth Sai',
    role: 'President',
    vertical: 'Executive Board',
    headshot_url: '/achyuth presi.png',
    linkedin_url: 'https://www.linkedin.com/in/achyuthsaicmuonx/',
    created_at: new Date('2024-12-02').toISOString(),
  },
  {
    id: 'team-swarnabh-dutta',
    name: 'Swarnabh Dutta',
    role: 'Vice President',
    vertical: 'Executive Board',
    headshot_url: '/swarnabh-vp.png',
    linkedin_url: 'https://www.linkedin.com/in/swarnabh-dutta-8a1b22287/',
    created_at: new Date('2024-12-02').toISOString(),
  },
  {
    id: 'team-tejas-kamath',
    name: 'Tejas Kamath',
    role: 'Director of Internal Affairs',
    vertical: 'Internal Affairs & Operations',
    headshot_url: '/tejas-doe.jpg',
    linkedin_url: 'https://www.linkedin.com/in/tejas-kamath-2a07962b5/',
    created_at: new Date('2024-12-02').toISOString(),
  },
  {
    id: 'team-sanjushree-das',
    name: 'Sanjushree Das',
    role: 'Director of External Affairs',
    vertical: 'External Affairs & Corporate Relations',
    headshot_url: '/sanjushree-doe.png',
    linkedin_url: 'https://www.linkedin.com/in/sanjushree-das-9a69902b0/',
    created_at: new Date('2024-12-02').toISOString(),
  },
]


export const FALLBACK_FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Do I need prior finance knowledge or a commerce degree to join?',
    answer: 'No prior finance degree is required. IFSA NIT Trichy was built specifically to bridge the engineering curriculum with high finance. We look for analytical curiosity, quantitative aptitude, and intellectual rigour. Our comprehensive analyst onboarding bootcamps cover fundamental valuation, accounting, and financial modeling from ground up.',
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-2',
    question: 'How was IFSA NIT Trichy established and what is its global standing?',
    answer: 'Founded on December 2nd, 2024, IFSA NIT Trichy is the 10th APAC chapter of the International Finance Students Association, which spans 15+ countries across Europe, the Americas, and Asia. We are also 1 of only 2 student clubs across India strategically partnered with Wall Street Oasis (WSO).',
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-3',
    question: 'What kind of client projects do student analysts execute?',
    answer: 'Our junior and senior analysts execute live mandates for startups, VC funds, and global consulting firms. Recent and ongoing projects include credit line mechanics for Loan Against Mutual Funds (Varicash), physical and transition risk analytics with NGFS scenarios (Climate B Venture), digital operating system and compliance architecture for distributors (myMFD), carbon compliance frameworks (Carbon6), startup valuation models (Spotlight), MSME hybrid debt structures (VentureWolf), UAE corporate tax credit modeling (Infisum), healthcare TAM sizing (Cosmo Health), and angel syndication GTM (FundCapita).',
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-4',
    question: 'What mentorship opportunities are available to chapter members?',
    answer: 'Members receive direct one-on-one mentorship from distinguished industry professionals and alumni, including Aruniya Selladurai (CFA, Cambridge MSc, London Investment Analyst) and Anagha Sethuraman (Edelweiss Alternatives, ex-D.E. Shaw & Bain, IIM Calcutta). Mentors guide research publications, competition prep, and career strategy.',
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  {
    id: 'faq-5',
    question: 'How do national case competitions and forum initiatives work?',
    answer: 'We prepare and field high-performing analyst teams for premier domestic and international case competitions, securing podiums at EY CAFTA, IIT Madras FinVent, IIM Ahmedabad Impetus, and HEC Paris. We also host the annual IFSA Forum and IFSC, attracting national participants and industry leaders.',
    sort_order: 5,
    created_at: new Date().toISOString(),
  },
]

export const FALLBACK_CLIENT_PROJECTS: ClientProject[] = [
  // Live Active Client Mandates (Only these 3 are live)
  {
    id: 'client-varicash',
    client: 'Varicash',
    tagline: 'Loan Against Mutual Funds (LAMF) & Credit Line Architecture',
    domain: 'Fintech & Digital Lending',
    status: 'Live Mandate',
    logo: '/varicash-logo.png',
    overview: 'Architected the loan economics, LTV risk models, and registrar integration logic for a digital credit platform allowing investors to access instant overdraft liquidity by pledging mutual fund holdings without liquidating units.',
    deliverables: [
      'Pledge vs. Redeem tax & compounding yield retention models across CAMS & KFintech rails',
      'Flexible overdraft credit line mechanics & drawdown duration interest calculations',
      'SEBI & RBI-aligned Loan-to-Value (LTV) framework (45–50% equity funds, 80–85% debt funds)',
      'Partner monetization & recurring trail income preservation model for MFDs & RIAs',
    ],
    impact: 'Equipped Varicash with defensible regulatory lending matrices and an advisor-first distribution strategy preserving distributor AUM while unlocking instant credit liquidity.',
  },
  {
    id: 'client-climate-b',
    client: 'Climate B Venture',
    tagline: 'Physical & Transition Risk Modeling & NGFS Scenarios',
    domain: 'Climate Risk & ESG Analytics',
    status: 'Live Mandate',
    logo: '/climate-b-logo.png',
    overview: 'Engineered institutional climate risk assessment models and quantitative financial impact engines simulating acute/chronic physical perils and policy transition shocks for corporate portfolios and lending books.',
    deliverables: [
      'Acute and chronic physical hazard risk modeling (floods, cyclones, heatwaves, and water stress)',
      'Policy & carbon pricing transition risk framework aligning with TCFD and ISSB disclosures',
      'Multi-horizon scenario analysis engine based on NGFS and IPCC representative concentration pathways',
      'Quantitative financial impact models assessing asset write-downs, operational downtime, and cost-of-capital shifts',
    ],
    impact: 'Delivered an enterprise-grade climate exposure quantification engine enabling asset managers and commercial lenders to stress-test multi-decade portfolio resilience.',
  },
  {
    id: 'client-mymfd',
    client: 'myMFD',
    tagline: 'Digital Operating System & Practice Engine for MFDs',
    domain: 'WealthTech & SaaS Platform',
    status: 'Live Mandate',
    logo: '/mymfd-logo.png',
    overview: 'Structured operational workflows, revenue intelligence architecture, and automated compliance frameworks for an all-in-one digital operating system built to modernize practice management for Mutual Fund Distributors (MFDs).',
    deliverables: [
      'Integrated CRM architecture with NFC smart card lead ingestion and pipeline segmentation',
      'Automated financial content studio with pre-flight SEBI advertising code validation',
      'Revenue intelligence dashboards tracking AUM expansion, SIP cohort health, and trail decay',
      'Automated regulatory disclosure scanner and immutable audit trail verification system',
    ],
    impact: 'Formulated the end-to-end platform blueprint enabling independent financial advisors to scale client acquisition while guaranteeing 100% adherence to statutory compliance standards.',
  },

  // Completed Client Advisory Engagements
  {
    id: 'client-carbon6',
    client: 'Carbon6',
    tagline: 'Carbon Compliance & Environmental Markets',
    domain: 'Climate Finance & ESG',
    status: 'Completed Mandate',
    logo: '/carbon6-framed.png',
    overview: 'Structured a comparative carbon market framework evaluating the European Union Emissions Trading System (EU ETS) against the Indian Perform, Achieve, and Trade (PAT) mechanism.',
    deliverables: [
      'Comprehensive Scope 1, 2, and 3 carbon accounting framework',
      'Regulatory compliance alignment with GRI and TCFD reporting guidelines',
      'Cross-border carbon border adjustment mechanism (CBAM) risk analysis',
    ],
    impact: 'Provided the client with a modular carbon accounting roadmap for international compliance and institutional ESG readiness.',
  },
  {
    id: 'client-spotlight',
    client: 'Spotlight Strategic Partners',
    tagline: 'Venture Valuation & Deal Advisory',
    domain: 'Venture Capital & Valuation',
    status: 'Completed Mandate',
    logo: '/spotlight-framed.png',
    overview: 'Constructed robust valuation and scenario-stressing architectures for early-stage and growth startups in emerging sectors.',
    deliverables: [
      '3-Statement DCF valuation models with scenario probability weighting',
      'Unit economics & customer lifetime value (LTV/CAC) sensitivity matrix',
      'Comparable company analysis (CCA) and precedent transaction comps',
    ],
    impact: 'Enabled seed and Series-A portfolio founders to negotiate funding rounds backed by defensible financial models.',
  },
  {
    id: 'client-venturewolf',
    client: 'VentureWolf (Wolf Group)',
    tagline: 'MSME Hybrid Financing & Capital Structure',
    domain: 'Corporate Finance & Debt Advisory',
    status: 'Completed Mandate',
    logo: '/venturewolf-framed.png',
    overview: 'Investigated structural credit deficits across Indian MSMEs and engineered hybrid financing structures bridging equity and debt.',
    deliverables: [
      'Hybrid mezzanine financing and revenue-based financing frameworks',
      'Proprietary Investor-Readiness Scorecard for high-growth enterprises',
      'Capital structure optimization and cost-of-capital minimization models',
    ],
    impact: 'Equipped MSME founders with actionable deal structures to access institutional and alternative credit markets.',
  },
  {
    id: 'client-infisum',
    client: 'Infisum Inc. (ISM)',
    tagline: 'UAE Corporate & R&D Tax Incentive Architecture',
    domain: 'International Tax & Economic Policy',
    status: 'Completed Mandate',
    logo: '/infisum-framed.png',
    overview: 'Evaluated the United Arab Emirates R&D Tax Credit landscape in direct alignment with OECD Pillar Two minimum tax guidelines and Vision 2031 diversification.',
    deliverables: [
      'OECD Pillar Two regulatory mapping for technology and R&D enterprises',
      'Financial tax-incentive models quantifying post-credit cash flow yields',
      'Strategic corporate structuring blueprints for GCC market expansion',
    ],
    impact: 'Delivered an executive-level tax advisory dossier clarifying compliance obligations and capital benefits for multinational tech entities.',
  },
  {
    id: 'client-cosmo',
    client: 'Cosmo Health',
    tagline: 'Digital Health Market Sizing & Unit Economics',
    domain: 'Healthcare Strategy & Market Intelligence',
    status: 'Completed Mandate',
    logo: '/cosmo-framed.png',
    overview: 'Delivered institutional market intelligence and granular TAM/SAM/SOM expansion models for a digital-first healthcare platform.',
    deliverables: [
      'Granular TAM, SAM, and SOM bottom-up market sizing across Tier 1 & 2 cities',
      'Digital patient acquisition unit economics and churn cohort analytics',
      'Dynamic investor dashboard benchmarking subscription vs. fee-for-service models',
    ],
    impact: 'Provided leadership with clear quantitative justification for geographic expansion and healthcare provider onboarding.',
  },
  {
    id: 'client-fundcapita',
    client: 'FundCapita',
    tagline: 'Early-Stage Venture Platform & GTM Strategy',
    domain: 'Fintech & Capital Syndication',
    status: 'Completed Mandate',
    logo: '/fundcapita-framed.png',
    overview: 'Formulated go-to-market strategies and competitive benchmarking for a modern angel and seed fundraising syndication platform.',
    deliverables: [
      'Ecosystem benchmarking of top domestic and global angel syndication platforms',
      'Investor onboarding funnel optimization and compliance workflow analysis',
      'Strategic GTM roadmap targeting active angel networks and family offices',
    ],
    impact: 'Defined the core value proposition and acquisition mechanics for platform scale and investor syndication.',
  },
]

export const FALLBACK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-finvent',
    title: 'National Winner 🏆',
    competition: 'FinVent 2025',
    organizer: 'IIT Madras',
    tier: 'Winner',
    description: 'Secured 1st place nationwide in the premier inter-collegiate financial valuation and strategic analysis championship.',
    year: '2025',
  },
  {
    id: 'ach-ey-cafta',
    title: 'First Runner-Up (Top 2 of 1000+ Teams)',
    competition: 'EY CAFTA Case Championship',
    organizer: 'Ernst & Young (EY)',
    tier: 'Runner-Up',
    description: 'Ranked 2nd out of over 1,000 national collegiate teams in corporate finance structuring and strategic turnaround.',
    year: '2025',
  },
  {
    id: 'ach-iima-impetus',
    title: 'First Runner-Up',
    competition: 'Impetus Strategy Competition',
    organizer: 'IIM Ahmedabad',
    tier: 'Runner-Up',
    description: 'Podium finish among top business school and undergraduate teams in high-stakes corporate strategy.',
    year: '2025',
  },
  {
    id: 'ach-iima-prameya',
    title: 'First Runner-Up',
    competition: 'Prameya Case Challenge',
    organizer: 'IIM Ahmedabad',
    tier: 'Runner-Up',
    description: 'Awarded 2nd place for comprehensive financial forecasting and business model redesign.',
    year: '2025',
  },
  {
    id: 'ach-hec-paris',
    title: 'International Finalist',
    competition: 'HEC Paris Business Game',
    organizer: 'HEC Paris (France)',
    tier: 'Finalist',
    description: 'Represented India on the global stage, competing against top international universities in real-time business strategy simulations.',
    year: '2025',
  },
  {
    id: 'ach-mckinsey',
    title: '2nd Runner-Up',
    competition: 'TechQuest & Consularium',
    organizer: 'McKinsey & Company / IIT Madras',
    tier: 'Top Podium',
    description: 'Double podium finish in management consulting, market entry frameworks, and technology strategy.',
    year: '2025',
  },
  {
    id: 'ach-iimc-veritas',
    title: '4th Place Finalist',
    competition: 'Veritas Financial Case Comp',
    organizer: 'IIM Calcutta',
    tier: 'Top Podium',
    description: 'Top-4 national finish for leveraged buyout (LBO) analysis and M&A synergy evaluation.',
    year: '2025',
  },
  {
    id: 'ach-iimk-iiml',
    title: 'Top 5 National Finalist',
    competition: 'Kotler Sutra & ProdWiz',
    organizer: 'IIM Kozhikode & IIM Lucknow',
    tier: 'Top Podium',
    description: 'Ranked among the top 5 teams in cross-functional market expansion and product monetization case competitions.',
    year: '2025',
  },
]
