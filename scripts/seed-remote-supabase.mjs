import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ddubxuxvprdqvfbiniwf.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkdWJ4dXh2cHJkcXZmYmluaXdmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTI3Njk5MywiZXhwIjoyMTA2ODUyOTkzfQ.0_llnLVA-N1YcjSNOsCmjCBjJ91JnLpw_KUuApkBUOg'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const EVENTS = [
  {
    title: 'IFSA Forum 2026: Flagship Finance Summit',
    tag: 'Networking',
    date: '07 Feb 2026',
    venue: 'NIT Trichy Campus & Virtual',
    description: 'The inaugural national finance summit at NIT Trichy featuring executive keynotes, M&A strategy panels, live venture workshops, and inter-collegiate leadership networking.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 200,
  },
  {
    title: 'IFSC 2026: National Finance & Strategy Case Competition',
    tag: 'Case competition',
    date: '08 Feb 2026',
    venue: 'Main Auditorium / Online Finals',
    description: 'Premier national case challenge with ₹1,20,000 cash prizes and ₹17 Lakhs total rewards. Grand finale judged by Anil Gutlapalli (Vice President, Northern Trust).',
    registration_link: '#',
    is_upcoming: false,
    attendance: 150,
  },
  {
    title: 'Executive Masterclass: Global Banking & Risk Architectures',
    tag: 'Speaker session',
    date: '15 Mar 2026',
    venue: 'Virtual Keynote Room',
    description: 'Exclusive executive session hosted by Santhesh Aloysius, FRM (Assistant Director, HSBC) on structured finance, Basel regulations, and global debt market mechanics.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 120,
  },
  {
    title: 'From Engineering to High Finance: Strategy & M&A Advisory',
    tag: 'Speaker session',
    date: '28 Mar 2026',
    venue: 'Auditorium Hall 2',
    description: 'Keynote by Chezhian P (Director, KPMG Global Services) exploring how quantitative engineering rigor transforms private equity diligence and corporate M&A advisory.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 140,
  },
  {
    title: 'Wall Street Oasis (WSO) Global Finance Fireside Q&A',
    tag: 'Speaker session',
    date: '12 Apr 2026',
    venue: 'Interactive Webinar Room',
    description: 'Direct interactive Q&A session with Patrick Curtis (Founder & CEO, Wall Street Oasis) on breaking into bulge-bracket investment banking, private equity, and hedge funds.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 250,
  },
  {
    title: 'Market Mania: Freshers Orientation & Trading Simulation',
    tag: 'Trading and markets',
    date: '20 Jan 2026',
    venue: 'NIT Trichy Campus',
    description: 'Flagship orientation event welcoming 150+ first-year engineers with live stock trading floor simulations, portfolio bidding, and M&A synergy teardowns.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 150,
  },
  {
    title: 'Syndicate & Life Ledger: Financial Modeling Workshop',
    tag: 'Workshop',
    date: '18 Apr 2026',
    venue: 'Financial Computation Lab',
    description: 'Hands-on 3-statement modeling, three-stage DCF, sensitivity matrices, and valuation comps for chapter analysts and aspiring participants.',
    registration_link: '#',
    is_upcoming: false,
    attendance: 80,
  },
]

const PUBLICATIONS = [
  {
    title: 'End of Cheap Sovereignty: Debt, Fiscal Fragility & Capital Realignment',
    authors: 'Macroeconomic & Global Strategy Desk',
    category: 'Macro',
    year: 2026,
    abstract: 'An empirical examination of how the structural conclusion of ultra-low global interest rates is permanently reshaping sovereign debt issuance, debt-to-GDP sustainability trajectories, currency volatility, and institutional asset allocation across emerging and developed markets.',
    pdf_link: '/END%20OF%20CHEAP%20SOVEREIGNTY%20REPORT.pdf',
    is_free: true,
    read_time: 15,
  },
  {
    title: 'One Big Beautiful Bill: Navigating US Debt, Fiscal Shocks & Global Markets',
    authors: 'Macroeconomic & Global Strategy Desk',
    category: 'Macro',
    year: 2026,
    abstract: 'Thematic macro brief examining the international market ramifications of landmark US fiscal policy legislation. Assesses sovereign debt issuance, yield curve implications, USD currency dynamics, and downstream spillover effects across APAC emerging markets.',
    pdf_link: '/one%20big%20beatiful%20bill.pdf',
    is_free: true,
    read_time: 10,
  },
  {
    title: 'Is the AI Bubble About to Burst? Valuations, Multiples & Market Realities',
    authors: 'Technology & Venture Capital Coverage Desk',
    category: 'Sector notes',
    year: 2026,
    abstract: 'An investigative teardown dissecting mega venture rounds ($183B, $500B), sky-high forward enterprise value multiples, hyperscaler capex runways, and post-hype consolidation. Analyzes unit economics, customer churn in AI SaaS, and structural margin sustainability.',
    pdf_link: '/is%20ai%20bubble%20about%20to%20burst.pdf',
    is_free: true,
    read_time: 8,
  },
  {
    title: 'Sustaining Rural Credit Access: Strategic Analysis of WMI Microfinance',
    authors: 'IFSA Research Vertical · Micro-Thesis Series',
    category: 'Case studies',
    year: 2026,
    abstract: 'An empirical investigation into Women’s Microfinance Initiative (WMI) operating across East Africa. Explores loan velocity, 97.5% historical repayment rates, transition to mobile money (M-Pesa/Airtel), and sustainable blended finance structures for rural empowerment.',
    pdf_link: '/Sustaining%20Rural%20Credit%20Access.pdf',
    is_free: true,
    read_time: 8,
  },
  {
    title: 'Wise PLC: Unlocking Global Financial Connectivity Through Tech & Trust',
    authors: 'Fintech & Payments Research Desk',
    category: 'Sector notes',
    year: 2025,
    abstract: 'Comprehensive industry teardown of Wise PLC (LON: WISE). Analyzes direct central bank API rails, cross-border fee compression to <0.6%, unit economics, sustained 33% EBITDA margin profile, and competitive moats against legacy SWIFT and fintech contenders.',
    pdf_link: '/wise%20pe%20report.pdf',
    is_free: true,
    read_time: 10,
  },
  {
    title: 'Kia Motors: Global Strategy, EV Expansion & Indian Market Leadership',
    authors: 'Automotive & Industrials Coverage Team',
    category: 'Equity research',
    year: 2025,
    abstract: 'Equity research initiation on Kia Corporation. Deep-dives into the $2B Anantapur manufacturing facility, EV transition roadmaps (EV6 & EV9 platforms), global supply chain agility, operating margin trajectory, and discounted cash flow (DCF) valuation.',
    pdf_link: '/kia%20motors%20equity%20report.pdf',
    is_free: true,
    read_time: 12,
  },
  {
    title: 'HCLTech: Digital Engineering Resilience & Mode 1-2-3 Growth Playbook',
    authors: 'TMT Equity Research Desk',
    category: 'Equity research',
    year: 2025,
    abstract: 'Comprehensive valuation and business model appraisal of HCL Technologies. Evaluates the strategic edge in Engineering and R&D Services (ERS), margin resilience in software products, Generative AI cloud alliances, and long-term shareholder return potential.',
    pdf_link: '/hcl%20tech%20equity%20report.pdf',
    is_free: true,
    read_time: 11,
  },
]

const TEAM_MEMBERS = [
  {
    name: 'Achyuth Sai',
    role: 'President',
    vertical: 'Executive Board',
    headshot_url: null,
    linkedin_url: 'https://www.linkedin.com/in/achyuthsaicmuonx/',
  },
  {
    name: 'Swarnabh Dutta',
    role: 'Vice President',
    vertical: 'Executive Board',
    headshot_url: null,
    linkedin_url: 'https://www.linkedin.com/in/swarnabh-dutta-8a1b22287/',
  },
  {
    name: 'Tejas Kamath',
    role: 'Director of Internal Affairs',
    vertical: 'Internal Affairs & Operations',
    headshot_url: null,
    linkedin_url: 'https://www.linkedin.com/in/tejas-kamath-2a07962b5/',
  },
  {
    name: 'Sanjushree Das',
    role: 'Director of External Affairs',
    vertical: 'External Affairs & Corporate Relations',
    headshot_url: null,
    linkedin_url: 'https://www.linkedin.com/in/sanjushree-das-9a69902b0/',
  },
]

const FAQS = [
  {
    question: 'How do I join IFSA NIT Trichy as a junior analyst?',
    answer: 'We recruit annually in the autumn semester through a rigorous multi-stage selection process: written quantitative & financial aptitude assessment, real-world case presentation, and partner interview. Applications open to all undergraduate engineering disciplines at NIT Trichy.',
    sort_order: 1,
  },
  {
    question: 'Do I need prior financial modeling experience to apply?',
    answer: 'No. We value analytical rigor, first-principles curiosity, and dedication above formal background. Selected junior analysts undergo our comprehensive internal training curriculum covering 3-statement modeling, DCF, and macroeconomic data analysis.',
    sort_order: 2,
  },
  {
    question: 'How can companies or startups engage IFSA NIT Trichy for client advisory?',
    answer: 'We take on selective advisory, market research, and valuation mandates each semester. Contact our Corporate Relations vertical via the partner inquiry form or email us directly at ifsa@nitt.edu to discuss scope, timelines, and deliverables.',
    sort_order: 3,
  },
  {
    question: 'Are your research publications and case studies open-access?',
    answer: 'Yes. All publications produced by our Research & Macro desks are freely available in our Research archive to foster open financial education and rigorous discourse.',
    sort_order: 4,
  },
  {
    question: 'How does IFSA NIT Trichy connect with the global IFSA network?',
    answer: 'As an official chapter of the International Finance Students’ Association, we participate in global case competitions, cross-chapter research exchanges, and international networking summits across 40+ countries.',
    sort_order: 5,
  },
]

async function seed() {
  console.log('--- Connecting to Supabase with Service Role ---')

  // 1. Events
  console.log('1. Clearing & seeding Events...')
  await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { data: insertedEvents, error: eventsErr } = await supabase.from('events').insert(EVENTS).select()
  if (eventsErr) {
    console.error('Events error:', eventsErr)
  } else {
    console.log(`✓ Inserted ${insertedEvents.length} events successfully.`)
  }

  // 2. Publications
  console.log('2. Clearing & seeding Publications...')
  await supabase.from('publications').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { data: insertedPubs, error: pubsErr } = await supabase.from('publications').insert(PUBLICATIONS).select()
  if (pubsErr) {
    console.error('Publications error:', pubsErr)
  } else {
    console.log(`✓ Inserted ${insertedPubs.length} publications successfully.`)
  }

  // 3. Team Members
  console.log('3. Clearing & seeding Team Members...')
  await supabase.from('team_members').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { data: insertedTeam, error: teamErr } = await supabase.from('team_members').insert(TEAM_MEMBERS).select()
  if (teamErr) {
    console.error('Team error:', teamErr)
  } else {
    console.log(`✓ Inserted ${insertedTeam.length} team members successfully.`)
  }

  // 4. FAQs
  console.log('4. Clearing & seeding FAQs...')
  await supabase.from('faqs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { data: insertedFaqs, error: faqsErr } = await supabase.from('faqs').insert(FAQS).select()
  if (faqsErr) {
    console.error('FAQs error:', faqsErr)
  } else {
    console.log(`✓ Inserted ${insertedFaqs.length} FAQs successfully.`)
  }

  console.log('--- Database Seeding Complete ---')
}

seed().catch(console.error)
