export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  stack: string[];
  metrics: { label: string; value: string };
  category: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Experiment {
  id: string;
  code: string;
  title: string;
  description: string;
  tech: string[];
  status: 'STABLE' | 'EXPERIMENTAL' | 'ACTIVE';
  year: string;
}

export interface SkillItem {
  name: string;
  category: 'Core' | 'Systems' | 'Web' | 'Graphics';
  level: string;
  note: string;
}
