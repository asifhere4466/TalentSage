import type { Job, Candidate, RubricCriteria } from './types';

export const mockJobs: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Houston, TX',
    type: 'full-time',
    status: 'open',
    postedDate: '2026-01-15',
    description: 'We are looking for a Senior Frontend Engineer to join our team and help build the next generation of AI-powered recruitment tools. You will work closely with our design and backend teams to create beautiful, performant user interfaces.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of state management (Redux, Zustand, etc.)',
      'Experience with modern CSS frameworks (Tailwind, Styled Components)',
      'Familiarity with testing frameworks (Jest, Cypress)',
      'Excellent problem-solving and communication skills',
    ],
    responsibilities: [
      'Build and maintain user-facing features using React and TypeScript',
      'Collaborate with designers to implement pixel-perfect UIs',
      'Write clean, maintainable, and well-tested code',
      'Participate in code reviews and architectural discussions',
      'Mentor junior developers and contribute to team growth',
    ],
    salary: { min: 120000, max: 180000, currency: 'USD' },
    rubric: [
      { id: 'r1', name: 'Technical Skills', description: 'Proficiency in required technologies', weight: 30, maxScore: 10 },
      { id: 'r2', name: 'Problem Solving', description: 'Ability to solve complex problems', weight: 25, maxScore: 10 },
      { id: 'r3', name: 'Communication', description: 'Clear and effective communication', weight: 20, maxScore: 10 },
      { id: 'r4', name: 'Culture Fit', description: 'Alignment with company values', weight: 15, maxScore: 10 },
      { id: 'r5', name: 'Experience', description: 'Relevant work experience', weight: 10, maxScore: 10 },
    ],
    candidateCount: 12,
  },
  {
    id: 'job-2',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'full-time',
    status: 'open',
    postedDate: '2026-01-10',
    description: 'Join our design team to create intuitive and beautiful experiences for our AI recruitment platform. You will own the end-to-end design process from research to implementation.',
    requirements: [
      '4+ years of product design experience',
      'Strong portfolio demonstrating UI/UX skills',
      'Proficiency in Figma and design systems',
      'Experience with user research and testing',
      'Understanding of accessibility standards',
    ],
    responsibilities: [
      'Design user flows, wireframes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Maintain and evolve our design system',
      'Collaborate closely with engineering and product teams',
      'Present design decisions to stakeholders',
    ],
    salary: { min: 100000, max: 150000, currency: 'USD' },
    rubric: [
      { id: 'r1', name: 'Design Skills', description: 'Visual and interaction design abilities', weight: 35, maxScore: 10 },
      { id: 'r2', name: 'Portfolio', description: 'Quality of previous work', weight: 25, maxScore: 10 },
      { id: 'r3', name: 'Communication', description: 'Ability to articulate design decisions', weight: 20, maxScore: 10 },
      { id: 'r4', name: 'Collaboration', description: 'Cross-functional teamwork', weight: 20, maxScore: 10 },
    ],
    candidateCount: 8,
  },
  {
    id: 'job-3',
    title: 'Machine Learning Engineer',
    department: 'Engineering',
    location: 'Dubai, UAE',
    type: 'full-time',
    status: 'open',
    postedDate: '2026-01-20',
    description: 'Build and deploy machine learning models that power our AI-native recruitment platform. Work on cutting-edge NLP and recommendation systems.',
    requirements: [
      'MS/PhD in Computer Science, ML, or related field',
      '3+ years of experience in ML/AI',
      'Strong Python skills and ML frameworks (PyTorch, TensorFlow)',
      'Experience with NLP and text processing',
      'Understanding of MLOps and model deployment',
    ],
    responsibilities: [
      'Develop and train ML models for candidate matching',
      'Build and maintain ML pipelines',
      'Collaborate with product team on AI features',
      'Research and implement state-of-the-art techniques',
      'Optimize model performance and scalability',
    ],
    salary: { min: 140000, max: 200000, currency: 'USD' },
    rubric: [
      { id: 'r1', name: 'ML Expertise', description: 'Deep knowledge of ML algorithms', weight: 35, maxScore: 10 },
      { id: 'r2', name: 'Engineering', description: 'Software engineering skills', weight: 25, maxScore: 10 },
      { id: 'r3', name: 'Research', description: 'Ability to read and implement papers', weight: 20, maxScore: 10 },
      { id: 'r4', name: 'Communication', description: 'Technical communication skills', weight: 20, maxScore: 10 },
    ],
    candidateCount: 6,
  },
];

export const mockCandidates: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Frontend Engineer',
    jobId: 'job-1',
    stage: 'shortlisted',
    appliedDate: '2026-01-18',
    score: 92,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Testing'],
    experience: '6 years as a Frontend Engineer at various tech companies including Meta and Stripe.',
    education: 'BS Computer Science, Stanford University',
    resumeText: `SARAH CHEN
Senior Frontend Engineer

SUMMARY
Experienced frontend engineer with 6+ years building scalable web applications. Passionate about creating intuitive user experiences and writing clean, maintainable code.

EXPERIENCE
Senior Frontend Engineer - Stripe (2022-Present)
• Led development of new payment dashboard using React and TypeScript
• Improved page load times by 40% through code splitting and optimization
• Mentored team of 3 junior developers

Frontend Engineer - Meta (2019-2022)
• Built features for Facebook Marketplace reaching 1B+ users
• Implemented A/B testing framework for rapid experimentation
• Contributed to internal React component library

EDUCATION
BS Computer Science - Stanford University (2019)

SKILLS
React, TypeScript, Next.js, GraphQL, Tailwind CSS, Jest, Cypress`,
    location: 'San Francisco, CA',
    aiEvaluation: {
      overallScore: 92,
      skillsMatch: 95,
      experienceMatch: 90,
      cultureFit: 88,
      recommendation: 'strong_yes',
      summary: 'Exceptional candidate with strong technical skills and relevant experience at top tech companies. Demonstrates leadership potential and excellent communication.',
      strengths: ['Deep React/TypeScript expertise', 'Experience at scale (1B+ users)', 'Leadership and mentoring experience', 'Strong educational background'],
      concerns: ['May have high salary expectations', 'Relocation might be needed'],
      evaluatedAt: '2026-01-19T10:30:00Z',
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Senior Frontend Engineer position', timestamp: '2026-01-18T09:00:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 92/100', timestamp: '2026-01-18T09:05:00Z', actor: 'TalentSage AI' },
      { id: 'al-3', type: 'stage_change', description: 'Moved to Shortlisted stage', timestamp: '2026-01-19T14:00:00Z', actor: 'John Recruiter' },
    ],
  },
  {
    id: 'cand-2',
    name: 'Michael Rodriguez',
    email: 'm.rodriguez@email.com',
    phone: '+1 (555) 234-5678',
    position: 'Senior Frontend Engineer',
    jobId: 'job-1',
    stage: 'applied',
    appliedDate: '2026-01-20',
    score: 78,
    skills: ['React', 'JavaScript', 'Vue.js', 'CSS', 'Node.js'],
    experience: '4 years as a Frontend Developer at startups and mid-size companies.',
    education: 'BS Software Engineering, UT Austin',
    resumeText: `MICHAEL RODRIGUEZ
Frontend Developer

EXPERIENCE
Frontend Developer - TechStartup Inc (2022-Present)
• Built customer-facing dashboard with React
• Integrated third-party APIs and services

Junior Developer - WebAgency (2020-2022)
• Developed responsive websites for clients
• Worked with React and Vue.js

EDUCATION
BS Software Engineering - UT Austin (2020)`,
    location: 'Austin, TX',
    aiEvaluation: {
      overallScore: 78,
      skillsMatch: 75,
      experienceMatch: 72,
      cultureFit: 85,
      recommendation: 'maybe',
      summary: 'Solid candidate with good fundamentals but less experience than ideal. Shows potential for growth.',
      strengths: ['Good foundation in React', 'Located in Texas', 'Eager to learn'],
      concerns: ['Limited TypeScript experience', 'No experience at scale', 'Shorter tenure at companies'],
      evaluatedAt: '2026-01-20T11:00:00Z',
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Senior Frontend Engineer position', timestamp: '2026-01-20T10:00:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 78/100', timestamp: '2026-01-20T10:05:00Z', actor: 'TalentSage AI' },
    ],
  },
  {
    id: 'cand-3',
    name: 'Emily Watson',
    email: 'emily.watson@email.com',
    phone: '+1 (555) 345-6789',
    position: 'Senior Frontend Engineer',
    jobId: 'job-1',
    stage: 'interview',
    appliedDate: '2026-01-16',
    score: 88,
    skills: ['React', 'TypeScript', 'Angular', 'Testing', 'Performance Optimization'],
    experience: '5 years as a Frontend Engineer, specializing in performance optimization.',
    education: 'MS Computer Science, MIT',
    resumeText: `EMILY WATSON
Senior Frontend Engineer

EXPERIENCE
Senior Frontend Engineer - Netflix (2021-Present)
• Optimized video player performance by 35%
• Led migration from Angular to React

Frontend Engineer - Airbnb (2019-2021)
• Built booking flow components
• Implemented accessibility improvements

EDUCATION
MS Computer Science - MIT (2019)`,
    location: 'Los Angeles, CA',
    aiEvaluation: {
      overallScore: 88,
      skillsMatch: 90,
      experienceMatch: 85,
      cultureFit: 90,
      recommendation: 'yes',
      summary: 'Strong candidate with excellent performance optimization skills and experience at top companies.',
      strengths: ['Performance optimization expertise', 'Experience at Netflix/Airbnb', 'Strong educational background'],
      concerns: ['Limited GraphQL experience'],
      evaluatedAt: '2026-01-17T09:00:00Z',
    },
    videoScreening: {
      id: 'vs-1',
      videoUrl: '/mock-video.mp4',
      duration: 45,
      submittedAt: '2026-01-22T14:00:00Z',
      transcript: 'Hello, I am Emily Watson. I am excited about this opportunity at TalentSage. In my current role at Netflix, I have been focused on optimizing the video player performance, which reduced load times by 35%. I believe my experience with performance optimization and building scalable frontend systems would be valuable here...',
      aiSummary: {
        communicationScore: 92,
        clarityScore: 88,
        confidenceScore: 85,
        technicalScore: 90,
        overallScore: 89,
        transcript: 'Hello, I am Emily Watson. I am excited about this opportunity at TalentSage...',
        keyPoints: [
          'Strong articulation of past achievements',
          'Clear understanding of role requirements',
          'Demonstrated technical depth',
        ],
        recommendation: 'Strong candidate with excellent communication skills and relevant technical background. Recommend proceeding to technical interview.',
      },
      recruiterDecision: {
        decision: 'pass',
        notes: 'Excellent communication and technical knowledge. Moving forward to technical interview.',
        decidedAt: '2026-01-23T10:00:00Z',
      },
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Senior Frontend Engineer position', timestamp: '2026-01-16T08:00:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 88/100', timestamp: '2026-01-16T08:05:00Z', actor: 'TalentSage AI' },
      { id: 'al-3', type: 'stage_change', description: 'Moved to Shortlisted stage', timestamp: '2026-01-17T11:00:00Z', actor: 'John Recruiter' },
      { id: 'al-4', type: 'screening_submitted', description: 'Video screening submitted', timestamp: '2026-01-22T14:00:00Z', actor: 'Emily Watson' },
      { id: 'al-5', type: 'screening_reviewed', description: 'Video screening reviewed - Passed', timestamp: '2026-01-23T10:00:00Z', actor: 'John Recruiter' },
      { id: 'al-6', type: 'interview_scheduled', description: 'Technical interview scheduled for Jan 28, 2026', timestamp: '2026-01-24T09:00:00Z', actor: 'John Recruiter' },
      { id: 'al-7', type: 'stage_change', description: 'Moved to Interview stage', timestamp: '2026-01-24T09:00:00Z', actor: 'John Recruiter' },
    ],
  },
  {
    id: 'cand-4',
    name: 'David Kim',
    email: 'd.kim@email.com',
    phone: '+1 (555) 456-7890',
    position: 'Senior Frontend Engineer',
    jobId: 'job-1',
    stage: 'rejected',
    appliedDate: '2026-01-14',
    score: 45,
    skills: ['jQuery', 'HTML', 'CSS', 'PHP'],
    experience: '8 years as a Web Developer with focus on WordPress sites.',
    education: 'Associate Degree, Community College',
    resumeText: `DAVID KIM
Web Developer

EXPERIENCE
Web Developer - Local Agency (2016-Present)
• Built WordPress websites for local businesses
• Maintained legacy jQuery applications

EDUCATION
Associate Degree - Community College (2016)`,
    location: 'Houston, TX',
    aiEvaluation: {
      overallScore: 45,
      skillsMatch: 30,
      experienceMatch: 40,
      cultureFit: 70,
      recommendation: 'no',
      summary: 'Candidate lacks required modern frontend skills. Experience is primarily with legacy technologies.',
      strengths: ['Long tenure in web development', 'Local to Houston'],
      concerns: ['No React/TypeScript experience', 'Outdated tech stack', 'No experience with modern frameworks'],
      evaluatedAt: '2026-01-14T10:00:00Z',
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Senior Frontend Engineer position', timestamp: '2026-01-14T10:00:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 45/100', timestamp: '2026-01-14T10:05:00Z', actor: 'TalentSage AI' },
      { id: 'al-3', type: 'stage_change', description: 'Moved to Rejected stage - Skills mismatch', timestamp: '2026-01-15T09:00:00Z', actor: 'John Recruiter' },
    ],
  },
  {
    id: 'cand-5',
    name: 'Jessica Liu',
    email: 'j.liu@email.com',
    phone: '+1 (555) 567-8901',
    position: 'Senior Frontend Engineer',
    jobId: 'job-1',
    stage: 'shortlisted',
    appliedDate: '2026-01-19',
    score: 85,
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'AWS'],
    experience: '5 years as a Full-Stack Engineer with frontend focus.',
    education: 'BS Computer Science, UC Berkeley',
    resumeText: `JESSICA LIU
Full-Stack Engineer

EXPERIENCE
Full-Stack Engineer - Uber (2021-Present)
• Built driver-facing React applications
• Implemented real-time tracking features

Software Engineer - Dropbox (2019-2021)
• Developed file preview components
• Worked on React-based desktop app

EDUCATION
BS Computer Science - UC Berkeley (2019)`,
    location: 'San Francisco, CA',
    aiEvaluation: {
      overallScore: 85,
      skillsMatch: 88,
      experienceMatch: 82,
      cultureFit: 85,
      recommendation: 'yes',
      summary: 'Strong full-stack engineer with solid frontend skills. Experience at Uber and Dropbox demonstrates ability to work at scale.',
      strengths: ['Full-stack capabilities', 'Experience at scale', 'Strong technical foundation'],
      concerns: ['May prefer full-stack role', 'Competitive market for this candidate'],
      evaluatedAt: '2026-01-19T15:00:00Z',
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Senior Frontend Engineer position', timestamp: '2026-01-19T14:00:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 85/100', timestamp: '2026-01-19T14:05:00Z', actor: 'TalentSage AI' },
      { id: 'al-3', type: 'stage_change', description: 'Moved to Shortlisted stage', timestamp: '2026-01-20T10:00:00Z', actor: 'TalentSage AI' },
    ],
  },
  {
    id: 'cand-6',
    name: 'Alex Thompson',
    email: 'alex.t@email.com',
    phone: '+1 (555) 678-9012',
    position: 'Senior Frontend Engineer',
    jobId: 'job-1',
    stage: 'applied',
    appliedDate: '2026-01-21',
    score: 72,
    skills: ['React', 'JavaScript', 'CSS', 'Redux'],
    experience: '3 years as a Frontend Developer.',
    education: 'Bootcamp Graduate',
    resumeText: `ALEX THOMPSON
Frontend Developer

EXPERIENCE
Frontend Developer - StartupXYZ (2023-Present)
• Building React applications for B2B SaaS

Junior Developer - TechCorp (2021-2023)
• Maintained existing React codebase

EDUCATION
Coding Bootcamp Graduate (2021)`,
    location: 'Denver, CO',
    aiEvaluation: {
      overallScore: 72,
      skillsMatch: 70,
      experienceMatch: 65,
      cultureFit: 80,
      recommendation: 'maybe',
      summary: 'Junior-level candidate applying for senior role. Shows potential but lacks required experience.',
      strengths: ['Eager to learn', 'Recent React experience'],
      concerns: ['Insufficient experience for senior role', 'No TypeScript', 'Limited scale experience'],
      evaluatedAt: '2026-01-21T11:00:00Z',
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Senior Frontend Engineer position', timestamp: '2026-01-21T10:30:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 72/100', timestamp: '2026-01-21T10:35:00Z', actor: 'TalentSage AI' },
    ],
  },
  // Product Designer candidates
  {
    id: 'cand-7',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '+1 (555) 789-0123',
    position: 'Product Designer',
    jobId: 'job-2',
    stage: 'shortlisted',
    appliedDate: '2026-01-12',
    score: 90,
    skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping', 'Accessibility'],
    experience: '5 years as a Product Designer at tech companies.',
    education: 'BFA Graphic Design, RISD',
    resumeText: `MARIA GARCIA
Product Designer

EXPERIENCE
Senior Product Designer - Spotify (2022-Present)
• Led redesign of playlist creation experience
• Built and maintained design system

Product Designer - Slack (2019-2022)
• Designed messaging features
• Conducted user research studies

EDUCATION
BFA Graphic Design - RISD (2019)`,
    location: 'New York, NY',
    aiEvaluation: {
      overallScore: 90,
      skillsMatch: 92,
      experienceMatch: 88,
      cultureFit: 90,
      recommendation: 'strong_yes',
      summary: 'Exceptional designer with strong portfolio and experience at top companies.',
      strengths: ['Strong portfolio', 'Design system expertise', 'User research experience'],
      concerns: ['Remote work preference'],
      evaluatedAt: '2026-01-12T14:00:00Z',
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Product Designer position', timestamp: '2026-01-12T13:00:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 90/100', timestamp: '2026-01-12T13:05:00Z', actor: 'TalentSage AI' },
      { id: 'al-3', type: 'stage_change', description: 'Moved to Shortlisted stage', timestamp: '2026-01-13T09:00:00Z', actor: 'Jane Recruiter' },
    ],
  },
  {
    id: 'cand-8',
    name: 'Ryan O\'Brien',
    email: 'ryan.obrien@email.com',
    phone: '+1 (555) 890-1234',
    position: 'Product Designer',
    jobId: 'job-2',
    stage: 'applied',
    appliedDate: '2026-01-22',
    score: 75,
    skills: ['Figma', 'Sketch', 'UI Design', 'Illustration'],
    experience: '3 years as a UI Designer.',
    education: 'BA Design, Art Institute',
    resumeText: `RYAN O'BRIEN
UI Designer

EXPERIENCE
UI Designer - Agency (2021-Present)
• Created visual designs for clients

EDUCATION
BA Design - Art Institute (2021)`,
    location: 'Chicago, IL',
    aiEvaluation: {
      overallScore: 75,
      skillsMatch: 72,
      experienceMatch: 70,
      cultureFit: 82,
      recommendation: 'maybe',
      summary: 'Good visual designer but lacks product design and research experience.',
      strengths: ['Strong visual skills', 'Illustration abilities'],
      concerns: ['Limited product experience', 'No user research background'],
      evaluatedAt: '2026-01-22T10:00:00Z',
    },
    auditLog: [
      { id: 'al-1', type: 'stage_change', description: 'Applied for Product Designer position', timestamp: '2026-01-22T09:30:00Z', actor: 'system' },
      { id: 'al-2', type: 'ai_evaluation', description: 'AI evaluation completed with score 75/100', timestamp: '2026-01-22T09:35:00Z', actor: 'TalentSage AI' },
    ],
  },
];

export const defaultRubric: RubricCriteria[] = [
  { id: 'r1', name: 'Technical Skills', description: 'Proficiency in required technologies and tools', weight: 30, maxScore: 10 },
  { id: 'r2', name: 'Problem Solving', description: 'Ability to analyze and solve complex problems', weight: 25, maxScore: 10 },
  { id: 'r3', name: 'Communication', description: 'Clear and effective verbal and written communication', weight: 20, maxScore: 10 },
  { id: 'r4', name: 'Culture Fit', description: 'Alignment with company values and team dynamics', weight: 15, maxScore: 10 },
  { id: 'r5', name: 'Experience', description: 'Relevant work experience and achievements', weight: 10, maxScore: 10 },
];

export const generateRubricForRole = (jobTitle: string): RubricCriteria[] => {
  if (jobTitle.toLowerCase().includes('engineer') || jobTitle.toLowerCase().includes('developer')) {
    return [
      { id: 'r1', name: 'Technical Proficiency', description: 'Mastery of required programming languages and frameworks', weight: 35, maxScore: 10 },
      { id: 'r2', name: 'System Design', description: 'Ability to design scalable and maintainable systems', weight: 25, maxScore: 10 },
      { id: 'r3', name: 'Code Quality', description: 'Writing clean, tested, and documented code', weight: 20, maxScore: 10 },
      { id: 'r4', name: 'Collaboration', description: 'Team player with strong communication skills', weight: 15, maxScore: 10 },
      { id: 'r5', name: 'Learning Agility', description: 'Ability to quickly learn new technologies', weight: 5, maxScore: 10 },
    ];
  }
  if (jobTitle.toLowerCase().includes('designer')) {
    return [
      { id: 'r1', name: 'Visual Design', description: 'Strong aesthetic sense and attention to detail', weight: 30, maxScore: 10 },
      { id: 'r2', name: 'User Research', description: 'Understanding user needs through research', weight: 25, maxScore: 10 },
      { id: 'r3', name: 'Prototyping', description: 'Ability to create interactive prototypes', weight: 20, maxScore: 10 },
      { id: 'r4', name: 'Design Systems', description: 'Experience building and maintaining design systems', weight: 15, maxScore: 10 },
      { id: 'r5', name: 'Presentation', description: 'Ability to present and defend design decisions', weight: 10, maxScore: 10 },
    ];
  }
  return defaultRubric;
};
