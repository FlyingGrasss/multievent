export type Locale = "tr" | "en";

export type ArtistType = {
  id: string;
  nameTr: string;
  nameEn: string;
  imageUrl: string;
  link?: string | null;
  sortOrder: number;
  active: boolean;
};

export type ServiceType = {
  id: string;
  titleTr: string;
  titleEn: string;
  descriptionTr?: string | null;
  descriptionEn?: string | null;
  icon?: string | null;
  sortOrder: number;
  active: boolean;
};

export type EventMediaType = {
  id?: string;
  url: string;
  type: "image" | "video";
  sortOrder: number;
};

export type EventType = {
  id: string;
  slug: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  venueTr?: string | null;
  venueEn?: string | null;
  eventDate?: Date | string | null;
  sortOrder: number;
  active: boolean;
  media: EventMediaType[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type TodoPriority = "P1" | "P2" | "P3" | "P4";

export type TodoType = {
  id: string;
  title: string;
  notes?: string | null;
  priority: TodoPriority;
  dueDate: Date | string;
  completed: boolean;
  completedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type ApplicationQuestionType =
  | "shortText"
  | "longText"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "url"
  | "select"
  | "radio"
  | "checkboxes"
  | "consent";

export type ApplicationQuestionOption = {
  id: string;
  labelTr: string;
  labelEn: string;
};

export type ApplicationQuestion = {
  id: string;
  type: ApplicationQuestionType;
  labelTr: string;
  labelEn: string;
  helpTr: string;
  helpEn: string;
  required: boolean;
  options: ApplicationQuestionOption[];
  sortOrder: number;
};

export type ApplicationFormDefinition = {
  id: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  isOpen: boolean;
  questions: ApplicationQuestion[];
};

export type ApplicationSettings = Pick<
  ApplicationFormDefinition,
  "titleTr" | "titleEn" | "descriptionTr" | "descriptionEn" | "isOpen"
>;

export type ApplicationAnswerValue = string | number | boolean | string[];

export type ApplicationAnswerSnapshot = {
  questionId: string | null;
  questionLabelTr: string;
  questionLabelEn: string;
  questionType: ApplicationQuestionType;
  value: ApplicationAnswerValue;
  displayTr: string;
  displayEn: string;
  sortOrder: number;
};

export type ApplicationSubmissionListItem = {
  id: string;
  submittedAt: string;
  locale: Locale;
  answerCount: number;
  previewTr: string;
  previewEn: string;
};

export type ApplicationSubmissionDetail = {
  id: string;
  submittedAt: string;
  locale: Locale;
  answers: ApplicationAnswerSnapshot[];
};

export type ApplicationSubmissionPage = {
  items: ApplicationSubmissionListItem[];
  nextCursor: string | null;
  total: number;
};

export type ApplicationFieldErrorCode =
  | "REQUIRED"
  | "CONSENT_REQUIRED"
  | "CHECKBOX_REQUIRED"
  | "TOO_LONG"
  | "INVALID_EMAIL"
  | "INVALID_PHONE"
  | "INVALID_NUMBER"
  | "INVALID_DATE"
  | "INVALID_URL"
  | "INVALID_OPTION"
  | "INVALID_VALUE";

export type ApplicationFieldError = {
  code: ApplicationFieldErrorCode;
  messageTr: string;
  messageEn: string;
};

export type ApplicationQuestionInput = {
  id?: string;
  type: ApplicationQuestionType;
  labelTr: string;
  labelEn: string;
  helpTr: string;
  helpEn: string;
  required: boolean;
  options: Array<{ id?: string; labelTr: string; labelEn: string }>;
};

export type ApplicationActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
