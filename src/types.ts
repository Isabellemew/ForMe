export interface Internship {
  id: string;
  title: string;
  organization: string;
  location: string;
  acceptanceRate: number;
  type: string;
  deadline: string;
  description: string;
  tags: string[];
  mentor: string;
  reward: string;
  remote: boolean;
  applyLink?: string;
}

export interface Professor {
  id: string;
  name: string;
  title: string;
  department: string;
  researchAreas: string[];
  availability: string;
  bio: string;
  imageUrl: string;
}
