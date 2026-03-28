export interface JobFilters {
  keywords: string;
  quickApply: boolean;
  openToAll: boolean;
  locations: string[];
  workType: string[];
  domains: string[];
  workingDays: string[];
  timing: string[];
  roles: string[];
  datePosted: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  deadline: string;
  domain: string;
  workType?: string;
  matchScore?: number;
  matchedSkills?: string[];
}

export interface Application {
  jobId: string;
  status: "Applied" | "Shortlisted" | "Interview" | "Offer" | "Rejected";
  appliedAt: string;
}
