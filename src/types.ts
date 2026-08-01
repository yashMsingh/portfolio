/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Experience {
  company: string;
  role: string;
  location: string;
  duration: string;
  isRemote?: boolean;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  cgpa: string;
  keyCoursework: string[];
  honors: string[];
}

export interface Project {
  title: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  year?: string;
  issuer?: string;
}

export interface LeadershipActivity {
  role: string;
  organization: string;
  location: string;
  duration: string;
  details: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  instagram?: string;
  youtube?: string;
  avatarUrl?: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  leadership: LeadershipActivity[];
  certifications: Certification[];
}
