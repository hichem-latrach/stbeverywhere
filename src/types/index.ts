
export interface User {
  id: number;
  email: string;
  password: string;
  register(): void;
  authenticate(): void;
  updateProfile(): void;
  disconnect(): void;
}

export interface Admin extends User {
  name: string;
  department: string;
}

export interface Client extends User {
  id: number;
  fullName: string;
  firstName: string;
  address: string;
  email: string;
  telephone: string;
  city: string;
  country: string;
  birthDate: Date;
  maritalStatus: string;
  mainNationality: string;
  otherNationality: string;
  fatherName: string;
  motherName: string;
  civilStatus: string;
  residence: string;
  cinNumber: string;
  deliveryDate: Date;
  financialSituation: string;
  activeNature: string;
  domiciliationAgency: string;
}

export interface Account {
  id: number;
  rib: string;
  iban: string;
  type: string;
  balance: number;
  creationDate: Date;
  status: string;
  number: string;
  overdraftAuthorized: number;
  view(): void;
}

export interface Transaction {
  id: number;
  accountId: number;
  type: string;
  amount: number;
  label: string;
  transactionDate: Date;
  view(): void;
}

export interface Card {
  id: number;
  cardNumber: string;
  cardType: string;
  expirationDate: Date;
  securityCode: string;
  status: string;
  view(): void;
  activateCard(): void;
  blockCard(): void;
}

export interface Agency {
  id: number;
  name: string;
  address: string;
  telephone: string;
  email: string;
  city: string;
  postalCode: string;
}

export interface Request {
  id: number;
  rib: string;
  email: string;
  requestDate: Date;
  view(): void;
  add(): void;
  modify(): void;
  delete(): void;
}

export interface CheckRequest extends Request {
  checkType: string;
}

export interface CardRequest extends Request {
  cardType: string;
  mobile: string;
  amount: number;
  typeid: string;
}

export interface Contact {
  id: number;
  clientId: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  sendDate: Date;
  send(): void;
  view(): void;
}

// Editable KYC fields
export enum EditableKycField {
  PhoneNumber = 'phoneNumber',
  Email = 'email',
  Address = 'address',
  NatureOfActivity = 'natureOfActivity',
  RelationshipType = 'relationshipType',
  ResidencyStatus = 'residencyStatus',
}

// KYC Modification Request Status
enum KycModificationStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

// KYC Modification Request interface
export interface KycModificationRequest {
  id: number;
  userId: number;
  fieldName: EditableKycField;
  oldValue: string;
  newValue: string;
  status: KycModificationStatus;
  createdAt: string;
  updatedAt: string;
  decisionDate?: string;
}
