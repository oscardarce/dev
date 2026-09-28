// Contenido del sitio. Fuente: _referencias/cv.pdf. Cambiar textos aquí, no en los componentes.

export type SocialId = 'email' | 'linkedin' | 'github'

type Social = {
  id: SocialId
  label: string
  display: string
  href: string
}

type SkillGroup = {
  category: string
  items: string[]
}

type Job = {
  company: string
  role: string
  location: string
  period: string
  website?: { label: string; href: string }
  highlights: string[]
  stack: string[]
}

type Study = {
  institution: string
  website?: { label: string; href: string }
  programs: { name: string; status?: string }[]
}

export const profile = {
  name: 'Oscar Darce',
  headline: 'Software Developer | Full-Stack Development | Cloud, Automation & AI',
  motto: 'Build. Break. Figure it out. Make it better.',
  location: 'San José, Costa Rica',

  summary: [
    'Software Developer and Computer Engineering student with 3+ years of professional experience developing software, enterprise systems, APIs, integrations, and automated business processes. Experienced across frontend, backend, databases, application deployment, testing, and production troubleshooting.',
    'Hands-on experience with React, TypeScript, JavaScript, Node.js, Python, Express, PostgreSQL, SQL, NetSuite, Git, AWS, and cloud technologies. Currently expanding expertise in backend engineering, DevOps, system design, AI-powered applications, and intelligent automation.',
  ],

  facts: [
    { value: '3+', label: 'Years of professional experience' },
    { value: 'UNED', label: 'Computer Engineering student' },
    { value: 'ES · EN', label: 'Spanish: Native | English: B2 — Upper-Intermediate' },
  ],

  skills: [
    { category: 'Programming Languages', items: ['JavaScript', 'TypeScript', 'Python', 'SQL'] },
    { category: 'Frontend', items: ['React', 'Vite', 'HTML', 'CSS', 'Material UI'] },
    {
      category: 'Backend',
      items: ['Node.js', 'Express.js', 'REST APIs', 'API Integration', 'Authentication', 'Business Logic'],
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'SQL', 'Supabase', 'Database Design', 'Data Integration'],
    },
    { category: 'Cloud and DevOps', items: ['AWS', 'Git', 'CI/CD', 'Linux', 'Application Deployment'] },
    {
      category: 'Automation and AI',
      items: ['Process Automation', 'Workflow Automation', 'AI Agents', 'AI-Powered Applications'],
    },
    {
      category: 'Enterprise Systems',
      items: ['Oracle NetSuite', 'ERP', 'CRM', 'Enterprise Applications', 'Business Process Automation'],
    },
    {
      category: 'Software Engineering',
      items: ['Testing', 'Debugging', 'Troubleshooting', 'System Integration', 'Agile', 'Scrum'],
    },
  ] satisfies SkillGroup[],

  experience: [
    {
      company: 'ROCCA Development Group',
      role: 'Software Developer / IT Specialist',
      location: 'Costa Rica',
      period: '2022 – Present',
      highlights: [
        'Develop and maintain web applications, backend services, APIs, and internal software solutions supporting business operations.',
        'Develop and maintain NetSuite customizations, scripts, workflows, integrations, and business process automations.',
        'Design and maintain database queries, data flows, system integrations, and API-based communication between business applications.',
        'Investigate production issues across applications, databases, integrations, and infrastructure, identifying root causes and implementing solutions.',
      ],
      stack: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Express', 'PostgreSQL', 'SQL', 'NetSuite'],
    },
    {
      company: 'Initium CR',
      role: 'Co-Founder & Software Developer',
      location: 'Costa Rica',
      period: '2025 – Present',
      website: { label: 'initiumcr.com', href: 'https://initiumcr.com' },
      highlights: [
        'Co-founded and developed a digital platform for event management and registration, contributing to both product and technical decisions.',
        'Developed the frontend using React and Vite and backend services and REST APIs using Node.js and Express.js.',
        'Designed and managed the application data layer using Supabase and PostgreSQL.',
        'Integrated external services including Upstash Redis for caching and Resend for transactional email and automated communications.',
      ],
      stack: ['React', 'Vite', 'Node.js', 'Express.js', 'Supabase', 'PostgreSQL', 'Upstash Redis', 'Resend'],
    },
  ] satisfies Job[],

  education: [
    {
      institution: 'Universidad Estatal a Distancia (UNED)',
      programs: [
        { name: "Bachelor's Degree in Computer Engineering", status: 'In Progress' },
        { name: 'Diploma in Computer Science / Diplomado en Informática', status: 'Completed 2026' },
      ],
    },
    {
      institution: 'Lyfter',
      website: { label: 'lyfter.academy', href: 'https://lyfter.academy' },
      programs: [{ name: 'Software Development Program' }],
    },
  ] as Study[],

  openSource: {
    title: 'Open Source & Professional Development',
    items: [
      'Building a public GitHub portfolio focused on software engineering, backend development, cloud technologies, automation, and AI-powered applications.',
      'Interested in contributing to open source through code, documentation, bug fixes, and technical improvements.',
    ],
  },

  // Canales aprobados. El teléfono del CV no se publica.
  socials: [
    { id: 'email', label: 'Email', display: 'oscardarce@gmail.com', href: 'mailto:oscardarce@gmail.com' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      display: 'in/oscar-darce-reyes',
      href: 'https://www.linkedin.com/in/oscar-darce-reyes-305726187/',
    },
    { id: 'github', label: 'GitHub', display: 'github.com/oscardarce', href: 'https://github.com/oscardarce' },
  ] satisfies Social[],
}

// Orden de las secciones y etiquetas de la navegación.
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']
