/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResumeData } from "./types";

export const resumeData: ResumeData = {
  name: "Yash Kumar Singh",
  title: "AI Engineer | Full-Stack Developer | ML Systems Specialist",
  email: "singhyash3103@gmail.com",
  phone: "+91 7558697035",
  location: "Pune, Maharashtra 411014",
  linkedin: "https://linkedin.com/in/yash-k-singh",
  github: "https://github.com/yashMsingh",
  instagram: "https://instagram.com/_yash_3103",
  youtube: "https://youtube.com/@yashftyash",
  avatarUrl: "/images/profile.jpg",
  summary: "Results-driven AI Engineering student with three distinct internships and a deep technical foundation in full-stack development. Specialized in the design and deployment of production-grade ML systems, RAG (Retrieval-Augmented Generation) pipelines, and autonomous agents. Proven ability to bridge the gap between academic research and enterprise level applications, with a focus on optimizing workflows and enhancing user experience through intelligent automation.",
  education: [
    {
      institution: "Vishwakarma Institute of Information Technology (VIIT)",
      degree: "B.Tech in Artificial Intelligence & Data Science",
      location: "Pune, India",
      duration: "2023 – 2027",
      cgpa: "CGPA : 9.08",
      keyCoursework: [
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "Transformers",
        "Distributed Systems",
        "Advanced Database Management"
      ],
      honors: [
        "Smart India Hackathon 2025 Internal Winner",
        "Active contributor to college technical research cell"
      ]
    },
    {
      institution: "Sir Parashurambhau College",
      degree: "Higher Secondary Education (HSC)",
      location: "Pune, India",
      duration: "2021 – 2023",
      cgpa: "",
      keyCoursework: [],
      honors: []
    }
  ],
  experience: [
    {
      company: "Eonverse",
      role: "AI Intern",
      location: "Remote",
      duration: "Jan 2026 – Apr 2026",
      isRemote: true,
      highlights: [
        "Architecting cutting-edge AI/ML solutions within a production environment, focusing on LLM fine-tuning and deployment.",
        "Developing intelligent, context-aware systems leveraging multi-agent frameworks to automate complex decision-making processes.",
        "Collaborating with the core engineering team to optimize inference latency for real-time AI applications."
      ]
    },
    {
      company: "Primus Techsystems Ltd.",
      role: "Full-Stack Development Intern",
      location: "Pune, India",
      duration: "Dec 2025 – Jan 2026",
      isRemote: false,
      highlights: [
        "Engineered an enterprise-grade data visualization dashboard using React (TypeScript) and .NET Core API, enabling real-time analytics for multi-module datasets.",
        "Developed a custom MCP Toolbox for PostgreSQL, streamlining database management and data migration tasks for sales order processing.",
        "Built a modular UI component library, ensuring aesthetic and functional consistency across the company’s internal software suite.",
        "Utilized Agile methodologies, participating in daily stand-ups and bi-weekly sprints to ensure timely delivery of client-facing features."
      ]
    },
    {
      company: "TechKnowGreen Solutions Ltd.",
      role: "Data Analysis Intern",
      location: "Pune, India",
      duration: "Jul 2025 – Aug 2025",
      isRemote: false,
      highlights: [
        "Conducted high-impact evaluation of environmental sustainability metrics for over 100 villages for the Maharashtra government’s Majhi Vasundhara initiative.",
        "Developed a proprietary scoring framework to qualitatively assess critical metrics including water conservation and waste management.",
        "Presented data-driven insights to government stakeholders, facilitating informed policy decisions for local green cover expansion."
      ]
    }
  ],
  projects: [
    {
      title: "Financial Statement AI Auditor",
      technologies: ["Groq", "LLaMA 3.3 70B", "Scikit-learn", "PyTorch", "Yahoo Finance API", "Monte Carlo"],
      githubUrl: "https://github.com/kritikadamahe/Financial-Statement-AI-Auditor",
      highlights: [
        "Engineered a 5-layer heterogeneous anomaly detection stack combining rule-based heuristics, 3-test Benford's Law consensus (Chi-Square, KS test), Ensemble ML (Isolation Forest + LOF + One-Class SVM majority voting), Autoencoder reconstruction error, and temporal slope divergence analysis.",
        "Designed a LLM-powered PDF extraction pipeline using Groq (LLaMA 3.3 70B) to parse unstructured financial statement PDFs into structured multi-year CSV tables, benchmarked against ground-truth data across 4 industry sectors.",
        "Impact: Validated system performance via a 1,200-trial Monte Carlo simulation (1,000 normal + 200 fraudulent synthetic companies) spanning 5 fraud types: revenue inflation, Benford violation, earnings-cash divergence, debt hiding, and revenue smoothing.",
        "Built a real-time industry benchmarking engine pulling live TTM peer metrics from Yahoo Finance (MSFT, AAPL, JNJ) and an automated accounting reconciliation engine enforcing 6 GAAP/IFRS identity checks per audit."
      ]
    },
    {
      title: "SARATHI: Autonomous Agent for Grievance Redressal",
      technologies: ["Gemini", "Playwright", "FastAPI", "Pinecone"],
      githubUrl: "https://github.com/Art-655/Sarathi-",
      highlights: [
        "Developed an end-to-end AI agent that parses colloquial civic complaints and automates the submission process on the Pune Municipal Corporation portal.",
        "Impact: Achieved a 96% first-attempt success rate, reducing manual submission time by 95% (from 52 minutes to 2.7 minutes).",
        "Implemented semantic ward mapping using Pinecone vector DB and handled real-world automation hurdles like dynamic form shifts and CAPTCHA fallback mechanisms."
      ]
    },
    {
      title: "IntelliNews: AI-Powered Multi-Source News Platform",
      technologies: ["Flask", "LLaMA 3.1", "spaCy", "React"],
      githubUrl: "https://github.com/kritikadamahe/AI-News-Aggregator",
      highlights: [
        "Built a news ecosystem that ingests data from RSS feeds and YouTube transcripts, utilizing LLaMA 3.1 for high-fidelity summarization.",
        "Integrated entity-protected translation for 4+ regional languages, maintaining an 88% entity fidelity rate.",
        "Designed interactive relationship mapping using force-directed graphs to visualize connections between different news entities."
      ]
    },
    {
      title: "RAG-Based PDF Question-Answering System",
      technologies: ["LangChain", "FAISS", "Llama 3.1", "Gradio"],
      highlights: [
        "Developed a semantic chunking pipeline for complex, multi-page PDF documents to minimize context loss in LLM responses.",
        "Integrated FAISS for vector similarity search, delivering context-aware answers with source citations in under 5 seconds for 100+ page files."
      ]
    },
    {
      title: "EmotionSync: NLP-Based Emotion Recognition",
      technologies: ["PyTorch", "DistilBERT", "Streamlit", "SMOTE"],
      githubUrl: "https://github.com/yashMsingh/emotion-detector",
      highlights: [
        "Fine-tuned DistilBERT on a dataset of 50K+ entries to classify 13 distinct emotions with high F1-scores.",
        "Applied PCA for dimensionality reduction and SMOTE to address class imbalance, ensuring robust performance across minority classes."
      ]
    },
    {
      title: "Blockchain-Based Supply Chain Transparency",
      technologies: ["Solidity", "Ethereum", "Hardhat", "React"],
      githubUrl: "https://github.com/yashMsingh/supplychainblockchain",
      highlights: [
        "Architected a full-stack Ethereum DApp for product traceability using Solidity smart contracts, ensuring immutable event logging.",
        "Validated contract logic via 29+ unit tests, achieving low-latency query performance on local Hardhat nodes."
      ]
    }
  ],

  skills: [
    {
      category: "Languages",
      skills: ["Python", "JavaScript", "TypeScript", "C++", "SQL"]
    },
    {
      category: "Frontend",
      skills: ["React.js", "Tailwind CSS", "Framer Motion", "Radix UI", "Three.js (3D Visualization)"]
    },
    {
      category: "Backend",
      skills: ["FastAPI", "Node.js", "Express.js", ".NET Core", "Flask", "Drizzle ORM"]
    },
    {
      category: "AI/ML",
      skills: ["PyTorch", "TensorFlow", "LangChain", "HuggingFace", "Scikit-learn", "OpenCV", "FAISS"]
    },
    {
      category: "Tools & Cloud",
      skills: ["Git", "Power BI", "Figma"]
    }
  ],
  leadership: [
    {
      role: "Active Member & Videography Lead",
      organization: "Artificial Intelligence Students Association (AiSA)",
      location: "VIIT, Pune",
      duration: "2024 – 2025",
      details: [
        "Orchestrated 5+ technical workshops on CNNs and Reinforcement Learning for over 50 students.",
        "Managed and mentored three interdisciplinary teams on project development using Git-based workflows.",
        "Led the media team for major symposiums including Viz-a-thon 3.0 and Perception events."
      ]
    }
  ],
  certifications: [
    {
      name: "Six Sigma Green Belt",
      year: "2024"
    },
    {
      name: "AI Bootcamp",
      issuer: "NASSCOM & MeitY, FutureSkills PRIME",
      year: "2024"
    },
    {
      name: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
      year: "2023"
    },
    {
      name: "Introduction to Generative AI",
      issuer: "Google",
      year: "2023"
    }
  ]
};
