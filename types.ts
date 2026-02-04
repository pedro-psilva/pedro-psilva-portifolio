export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl: string;
  image?: string;
  category?: string;
}

export interface Skill {
  name: string;
  level: 'Básico' | 'Bom';
  category: 'code' | 'infra' | 'data' | 'tools';
}

export interface EducationItem {
  id: number;
  year: string;
  title: string;
  institution: string;
  description: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
}