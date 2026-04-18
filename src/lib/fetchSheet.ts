import Papa from 'papaparse';
import { Project, Experience, Certificate } from '../types';

const SHEET_ID = import.meta.env?.VITE_PUBLIC_SHEET_ID || '';

export async function fetchSheetData<T>(sheetName: string): Promise<T[]> {
  if (!SHEET_ID) {
    console.warn(`No SHEET_ID provided. Returning empty array for ${sheetName}.`);
    return [];
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data.map((row: any, index) => ({
            id: `row-${index}`,
            ...row,
            // Normalize Featured field (projects sheet)
            Featured:
              typeof row.Featured === 'string'
                ? row.Featured.toLowerCase() === 'true'
                : Boolean(row.Featured),
            // Legacy aliases for backward compat / fallback
            featured:
              typeof row.Featured === 'string'
                ? row.Featured.toLowerCase() === 'true'
                : Boolean(row.Featured),
          }));
          resolve(data as T[]);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error);
    return [];
  }
}

// ─── Fallback Projects ──────────────────────────────────────────────────────
export const fallbackProjects: Project[] = [
  {
    id: 'p1',
    Id: 'p1',
    Title: 'TMDB Movie Data Analysis Dashboard',
    Category: 'Power BI',
    Featured: true,
    Technologies: 'Power BI, Python, JSON, EDA',
    Description:
      'In-depth EDA on the TMDB movie dataset analyzing revenue, budget, ratings, and popularity trends. Converted JSON datasets to structured data and built an interactive Power BI dashboard.',
    GithubUrl: 'https://github.com/asaranya98',
    LiverUrl: '',
    Image: '',
    Features: '',
    // legacy
    title: 'TMDB Movie Data Analysis Dashboard',
    category: 'Power BI',
    featured: true,
    tools: 'Power BI, Python, JSON, EDA',
    description: 'In-depth EDA on the TMDB movie dataset.',
    github: 'https://github.com/asaranya98',
    link: '',
    image_url: '',
  },
  {
    id: 'p2',
    Id: 'p2',
    Title: 'Call Center Performance Dashboard',
    Category: 'Power BI',
    Featured: true,
    Technologies: 'Power BI, Excel, KPI Analysis',
    Description:
      'Analyzed call center data to evaluate call volume, agent performance, and customer satisfaction.',
    GithubUrl: 'https://github.com/asaranya98',
    LiverUrl: '',
    Image: '',
    Features: '',
    title: 'Call Center Performance Dashboard',
    category: 'Power BI',
    featured: true,
    tools: 'Power BI, Excel, KPI Analysis',
    description: 'Analyzed call center data.',
    github: 'https://github.com/asaranya98',
    link: '',
    image_url: '',
  },
  {
    id: 'p3',
    Id: 'p3',
    Title: 'Atliq Hospitality Analysis Dashboard',
    Category: 'Power BI',
    Featured: false,
    Technologies: 'Power BI, DAX, Data Modeling',
    Description:
      'Built a two-page Power BI dashboard (Monthly & Annual Analysis) to monitor hotel booking performance.',
    GithubUrl: 'https://github.com/asaranya98',
    LiverUrl: '',
    Image: '',
    Features: '',
    title: 'Atliq Hospitality Analysis Dashboard',
    category: 'Power BI',
    featured: false,
    tools: 'Power BI, DAX, Data Modeling',
    description: 'Two-page Power BI dashboard.',
    github: 'https://github.com/asaranya98',
    link: '',
    image_url: '',
  },
];

// ─── Fallback Experience ────────────────────────────────────────────────────
export const fallbackExperience: Experience[] = [
  {
    id: 'e1',
    'S. No': '1',
    Title: 'Data Analytics Intern (Onsite)',
    Company: 'Edu Tantr',
    Period: 'Jan 2026 – Present',
    Location: 'On-site',
    'Key Contributions':
      '• Data cleaning & preprocessing using Python (Pandas, NumPy) and Excel\n• SQL queries to extract and analyze data from relational databases\n• Created interactive Power BI dashboards tracking customer journey KPIs\n• Python visualization using Matplotlib and Seaborn\n• Analyzed real-world datasets to generate actionable business insights',
    // legacy
    company: 'Edu Tantr',
    role: 'Data Analytics Intern (Onsite)',
    start_date: 'Jan 2026',
    end_date: '',
    description:
      '• Data cleaning & preprocessing using Python (Pandas, NumPy) and Excel\n• SQL queries to extract and analyze data from relational databases\n• Created interactive Power BI dashboards tracking customer journey KPIs\n• Python visualization using Matplotlib and Seaborn\n• Analyzed real-world datasets to generate actionable business insights',
    logo_url: '',
    is_current: true,
  },
  {
    id: 'e2',
    'S. No': '2',
    Title: 'Web Development Intern',
    Company: 'Aspirentech Business Solutions',
    Period: 'Jun 2025 – Jul 2025',
    Location: 'Remote',
    'Key Contributions':
      '• Built responsive web pages using HTML, CSS, Bootstrap\n• Designed user-friendly UI components\n• Version control using Git and GitHub\n• Technical documentation and stakeholder status updates',
    // legacy
    company: 'Aspirentech Business Solutions',
    role: 'Web Development Intern',
    start_date: 'Jun 2025',
    end_date: 'Jul 2025',
    description:
      '• Built responsive web pages using HTML, CSS, Bootstrap\n• Designed user-friendly UI components\n• Version control using Git and GitHub\n• Technical documentation and stakeholder status updates',
    logo_url: '',
    is_current: false,
  },
];

// ─── Fallback Certificates ──────────────────────────────────────────────────
export const fallbackCertificates: Certificate[] = [
  {
    id: 'c1',
    'S. No': '1',
    Title: 'Gen AI Powered Data Analytics Job Simulation',
    Issuer: 'Forage',
    Date: '2024',
    Category: 'AI & Data',
    Link: '#',
    Image: '',
    title: 'Gen AI Powered Data Analytics Job Simulation',
    issuer: 'Forage',
    date: '2024',
    category: 'AI & Data',
    credential_url: '#',
    image_url: '',
  },
  {
    id: 'c2',
    'S. No': '2',
    Title: 'Masters in Excel',
    Issuer: 'Udemy',
    Date: '2024',
    Category: 'Excel',
    Link: '#',
    Image: '',
    title: 'Masters in Excel',
    issuer: 'Udemy',
    date: '2024',
    category: 'Excel',
    credential_url: '#',
    image_url: '',
  },
  {
    id: 'c3',
    'S. No': '3',
    Title: 'Git, GitLab, GitHub Fundamentals for Software Developers',
    Issuer: 'Udemy',
    Date: '2024',
    Category: 'DevTools',
    Link: '#',
    Image: '',
    title: 'Git, GitLab, GitHub Fundamentals',
    issuer: 'Udemy',
    date: '2024',
    category: 'DevTools',
    credential_url: '#',
    image_url: '',
  },
  {
    id: 'c4',
    'S. No': '4',
    Title: 'UI/UX Design Skill',
    Issuer: 'Guvi / HCL',
    Date: '2024',
    Category: 'Design',
    Link: '#',
    Image: '',
    title: 'UI/UX Design Skill',
    issuer: 'Guvi / HCL',
    date: '2024',
    category: 'Design',
    credential_url: '#',
    image_url: '',
  },
  {
    id: 'c5',
    'S. No': '5',
    Title: 'Tally Accountant',
    Issuer: 'CSC',
    Date: '2023',
    Category: 'Finance',
    Link: '#',
    Image: '',
    title: 'Tally Accountant',
    issuer: 'CSC',
    date: '2023',
    category: 'Finance',
    credential_url: '#',
    image_url: '',
  },
  {
    id: 'c6',
    'S. No': '6',
    Title: 'Office Administrator',
    Issuer: 'CSC',
    Date: '2023',
    Category: 'Admin',
    Link: '#',
    Image: '',
    title: 'Office Administrator',
    issuer: 'CSC',
    date: '2023',
    category: 'Admin',
    credential_url: '#',
    image_url: '',
  },
];