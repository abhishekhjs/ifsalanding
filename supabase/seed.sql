-- IFSA NIT Trichy — Seed Data from Annual Report 2025-26
-- Execute in Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- 1. Ensure schema columns exist
ALTER TABLE publications ADD COLUMN IF NOT EXISTS cover_image text;

-- 2. Clear legacy demo rows before inserting verified Annual Report records
TRUNCATE TABLE events, publications, team_members, faqs CASCADE;

-- 3. Insert Verified Events
INSERT INTO events (title, tag, date, venue, description, registration_link, is_upcoming, attendance)
VALUES
  (
    'IFSA Forum 2026: Flagship Finance Summit',
    'Networking',
    '07 Feb 2026',
    'NIT Trichy Campus & Virtual',
    'The inaugural national finance summit at NIT Trichy featuring executive keynotes, M&A strategy panels, live venture workshops, and inter-collegiate leadership networking.',
    '#',
    false,
    200
  ),
  (
    'IFSC 2026: National Finance & Strategy Case Competition',
    'Case competition',
    '08 Feb 2026',
    'Main Auditorium / Online Finals',
    'Premier national case challenge with ₹1,20,000 cash prizes and ₹17 Lakhs total rewards. Grand finale judged by Anil Gutlapalli (Vice President, Northern Trust).',
    '#',
    false,
    150
  ),
  (
    'Executive Masterclass: Global Banking & Risk Architectures',
    'Speaker session',
    '15 Mar 2026',
    'Virtual Keynote Room',
    'Exclusive executive session hosted by Santhesh Aloysius, FRM (Assistant Director, HSBC) on structured finance, Basel regulations, and global debt market mechanics.',
    '#',
    false,
    120
  ),
  (
    'From Engineering to High Finance: Strategy & M&A Advisory',
    'Speaker session',
    '28 Mar 2026',
    'Auditorium Hall 2',
    'Keynote by Chezhian P (Director, KPMG Global Services) exploring how quantitative engineering rigor transforms private equity diligence and corporate M&A advisory.',
    '#',
    false,
    140
  ),
  (
    'Wall Street Oasis (WSO) Global Finance Fireside Q&A',
    'Speaker session',
    '12 Apr 2026',
    'Interactive Webinar Room',
    'Direct interactive Q&A session with Patrick Curtis (Founder & CEO, Wall Street Oasis) on breaking into bulge-bracket investment banking, private equity, and hedge funds.',
    '#',
    false,
    250
  ),
  (
    'Market Mania: Freshers Orientation & Trading Simulation',
    'Trading and markets',
    '20 Jan 2026',
    'NIT Trichy Campus',
    'Flagship orientation event welcoming 150+ first-year engineers with live stock trading floor simulations, portfolio bidding, and M&A synergy teardowns.',
    '#',
    false,
    150
  ),
  (
    'Syndicate & Life Ledger: Financial Modeling Workshop',
    'Workshop',
    '18 Apr 2026',
    'Financial Computation Lab',
    'Hands-on 3-statement modeling, three-stage DCF, sensitivity matrices, and valuation comps for chapter analysts and aspiring participants.',
    '#',
    false,
    80
  );

-- 4. Insert Verified Publications
INSERT INTO publications (title, authors, category, year, abstract, pdf_link, cover_image, is_free, read_time)
VALUES
  (
    'End of Cheap Sovereignty: Debt, Fiscal Fragility & Capital Realignment',
    'Macroeconomic & Global Strategy Desk',
    'Macro',
    2026,
    'An empirical examination of how the structural conclusion of ultra-low global interest rates is permanently reshaping sovereign debt issuance, debt-to-GDP sustainability trajectories, currency volatility, and institutional asset allocation across emerging and developed markets.',
    '/END%20OF%20CHEAP%20SOVEREIGNTY%20REPORT.pdf',
    '/publications/covers/end-of-cheap-sovereignty.webp',
    true,
    15
  ),
  (
    'One Big Beautiful Bill: Navigating US Debt, Fiscal Shocks & Global Markets',
    'Macroeconomic & Global Strategy Desk',
    'Macro',
    2026,
    'Thematic macro brief examining the international market ramifications of landmark US fiscal policy legislation. Assesses sovereign debt issuance, yield curve implications, USD currency dynamics, and downstream spillover effects across APAC emerging markets.',
    '/one%20big%20beatiful%20bill.pdf',
    '/publications/covers/one-big-beautiful-bill.webp',
    true,
    10
  ),
  (
    'Is the AI Bubble About to Burst? Valuations, Multiples & Market Realities',
    'Technology & Venture Capital Coverage Desk',
    'Sector notes',
    2026,
    'An investigative teardown dissecting mega venture rounds ($183B, $500B), sky-high forward enterprise value multiples, hyperscaler capex runways, and post-hype consolidation. Analyzes unit economics, customer churn in AI SaaS, and structural margin sustainability.',
    '/is%20ai%20bubble%20about%20to%20burst.pdf',
    '/publications/covers/is-ai-bubble-bursting.webp',
    true,
    8
  ),
  (
    'Sustaining Rural Credit Access: Strategic Analysis of WMI Microfinance',
    'IFSA Research Vertical · Micro-Thesis Series',
    'Case studies',
    2026,
    'An empirical investigation into Women’s Microfinance Initiative (WMI) operating across East Africa. Explores loan velocity, 97.5% historical repayment rates, transition to mobile money (M-Pesa/Airtel), and sustainable blended finance structures for rural empowerment.',
    '/Sustaining%20Rural%20Credit%20Access.pdf',
    '/publications/covers/sustaining-rural-credit.webp',
    true,
    8
  ),
  (
    'Wise PLC: Unlocking Global Financial Connectivity Through Tech & Trust',
    'Fintech & Payments Research Desk',
    'Sector notes',
    2025,
    'Comprehensive industry teardown of Wise PLC (LON: WISE). Analyzes direct central bank API rails, cross-border fee compression to <0.6%, unit economics, sustained 33% EBITDA margin profile, and competitive moats against legacy SWIFT and fintech contenders.',
    '/wise%20pe%20report.pdf',
    '/publications/covers/wise-pe.webp',
    true,
    10
  ),
  (
    'Kia Motors: Global Strategy, EV Expansion & Indian Market Leadership',
    'Automotive & Industrials Coverage Team',
    'Equity research',
    2025,
    'Equity research initiation on Kia Corporation. Deep-dives into the $2B Anantapur manufacturing facility, EV transition roadmaps (EV6 & EV9 platforms), global supply chain agility, operating margin trajectory, and discounted cash flow (DCF) valuation.',
    '/kia%20motors%20equity%20report.pdf',
    '/publications/covers/kia-motors.webp',
    true,
    12
  ),
  (
    'HCLTech: Digital Engineering Resilience & Mode 1-2-3 Growth Playbook',
    'TMT Equity Research Desk',
    'Equity research',
    2025,
    'Comprehensive valuation and business model appraisal of HCL Technologies. Evaluates the strategic edge in Engineering and R&D Services (ERS), margin resilience in software products, Generative AI cloud alliances, and long-term shareholder return potential.',
    '/hcl%20tech%20equity%20report.pdf',
    '/publications/covers/hcltech.webp',
    true,
    11
  );

-- 5. Insert Chapter Leadership
INSERT INTO team_members (name, role, vertical, headshot_url, linkedin_url)
VALUES
  (
    'Achyuth Sai',
    'President',
    'Executive Board',
    null,
    'https://www.linkedin.com/in/achyuthsaicmuonx/'
  ),
  (
    'Swarnabh Dutta',
    'Vice President',
    'Executive Board',
    null,
    'https://www.linkedin.com/in/swarnabh-dutta-8a1b22287/'
  ),
  (
    'Tejas Kamath',
    'Director of Internal Affairs',
    'Internal Affairs & Operations',
    null,
    'https://www.linkedin.com/in/tejas-kamath-2a07962b5/'
  ),
  (
    'Sanjushree Das',
    'Director of External Affairs',
    'External Affairs & Corporate Relations',
    null,
    'https://www.linkedin.com/in/sanjushree-das-9a69902b0/'
  );

-- 6. Insert Verified Chapter FAQs
INSERT INTO faqs (question, answer, sort_order)
VALUES
  (
    'How do I join IFSA NIT Trichy as a junior analyst?',
    'We recruit annually in the autumn semester through a rigorous multi-stage selection process: written quantitative & financial aptitude assessment, real-world case presentation, and partner interview. Applications open to all undergraduate engineering disciplines at NIT Trichy.',
    1
  ),
  (
    'Do I need prior financial modeling experience to apply?',
    'No. We value analytical rigor, first-principles curiosity, and dedication above formal background. Selected junior analysts undergo our comprehensive internal training curriculum covering 3-statement modeling, DCF, and macroeconomic data analysis.',
    2
  ),
  (
    'How can companies or startups engage IFSA NIT Trichy for client advisory?',
    'We take on selective advisory, market research, and valuation mandates each semester. Contact our Corporate Relations vertical via the partner inquiry form or email us directly at ifsa@nitt.edu to discuss scope, timelines, and deliverables.',
    3
  ),
  (
    'Are your research publications and case studies open-access?',
    'Yes. All publications produced by our Research & Macro desks are freely available in our Research archive to foster open financial education and rigorous discourse.',
    4
  ),
  (
    'How does IFSA NIT Trichy connect with the global IFSA network?',
    'As an official chapter of the International Finance Students’ Association, we participate in global case competitions, cross-chapter research exchanges, and international networking summits across 40+ countries.',
    5
  );
