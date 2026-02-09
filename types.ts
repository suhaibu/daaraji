
export enum ResourceType {
  POEM = 'قصائد',
  EXPLANATION = 'شروح',
  FIQH = 'فقه',
  BIOGRAPHY = 'سيرة',
  LETTER = 'رسائل',
  RESEARCH = 'بحوث'
}

export enum Language {
  ARABIC = 'العربية',
  WOLOF = 'الولفية',
  FRENCH = 'الفرنسية'
}

export enum UserRole {
  ADMIN = 'مدير المكتبة',
  EDITOR = 'محرر',
  READER = 'قارئ'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface LibraryResource {
  id: string;
  title: string;
  author: string;
  type: ResourceType;
  language: Language;
  dateCreated?: string;
  description: string;
  tags: string[];
  source: string;
  fileType: 'pdf' | 'word' | 'txt' | 'image' | 'drive';
  fileUrl?: string;
  driveLink?: string;
  addedBy: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  parent?: string;
}
