export type Category = "Quality" | "Safety" | "Efficacy" | "Multidisciplinary";

export type Step = 1 | 2 | 3 | 4 | 5;

export type StepLabel = "Step 1" | "Step 2a" | "Step 2b" | "Step 3" | "Step 4" | "Step 5";

export interface ImplementationStatus {
  FDA: boolean;
  EMA: boolean;
  PMDA: boolean;
  HC: boolean;
  ANVISA: boolean;
}

export interface Guideline {
  id: string;
  title: string;
  category: Category;
  step: Step;
  stepLabel?: StepLabel;
  currentVersion: string;
  dateReached: string;
  lastUpdated: string;
  description: string;
  pdfUrl: string;
  relatedGuidelines: string[];
  relatedTraining: string[];
  hasActiveConsultation: boolean;
  implementationStatus: ImplementationStatus;
  tags: string[];
}

export type TrainingType = "video" | "webinar" | "document" | "e-learning";

export interface Training {
  id: string;
  title: string;
  type: TrainingType;
  duration: string;
  relatedGuideline: string;
  category: Category;
  language: string;
  datePublished: string;
  thumbnail: string;
}

export type ConsultationStatus = "open" | "closed" | "upcoming";

export interface Consultation {
  id: string;
  guidelineId: string;
  title: string;
  status: ConsultationStatus;
  openDate: string;
  closeDate: string;
  description: string;
  category: Category;
}

export type UpdateType = "step_change" | "consultation" | "training" | "revision" | "news" | "event";
export type ChangeType = "step_change";

export interface Update {
  id: string;
  type: UpdateType;
  title: string;
  description: string;
  date: string;
  guidelineId?: string;
  fromStep?: number;
  toStep?: number;
  isNew: boolean;
}

export interface GovernanceMember {
  name: string;
  fullName: string;
  region: string;
  type: "regulatory" | "industry";
  flag: string;
  since: number;
}

export interface Observer {
  name: string;
  fullName: string;
  region: string;
  flag: string;
}

export interface Assembly {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "upcoming" | "past";
}

export interface GovernanceData {
  members: GovernanceMember[];
  observers: Observer[];
  assemblies: Assembly[];
}
