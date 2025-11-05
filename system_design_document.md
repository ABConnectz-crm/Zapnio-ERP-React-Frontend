# System Design Document (SDD)
## Enterprise ERP Platform

**Document Version:** 1.0  
**Last Updated:** October 10, 2025  
**Document Owner:** Lead Architect / Engineering Team  
**Review Cycle:** Monthly or with major feature releases  

---

## Executive Summary

This System Design Document provides detailed technical specifications for implementing the Enterprise ERP Platform. It translates the high-level architecture into concrete implementation guidelines, database schemas, API specifications, and component designs that developers will use to build the system.

**Scope:** This document covers the initial CRM module implementation with architectural foundation for future ERP modules (HR, Inventory, Accounting, etc.).

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Database Architecture](#2-database-architecture)
3. [API Specifications](#3-api-specifications)
4. [Authentication & Authorization](#4-authentication--authorization)
5. [Module Designs](#5-module-designs)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Backend Architecture](#7-backend-architecture)
8. [Integration Patterns](#8-integration-patterns)
9. [Data Flow Diagrams](#9-data-flow-diagrams)
10. [Implementation Guidelines](#10-implementation-guidelines)

---

## 1. System Overview

### 1.1 Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                         │
│  Next.js Frontend (React Components + Pages)                │
├─────────────────────────────────────────────────────────────┤
│                  APPLICATION LAYER                          │
│  NestJS Backend (Controllers + Services + Guards)           │
├─────────────────────────────────────────────────────────────┤
│                  BUSINESS LOGIC LAYER                       │
│  Domain Services + Business Rules + Validation             │
├─────────────────────────────────────────────────────────────┤
│                  DATA ACCESS LAYER                          │
│  Prisma ORM + Repository Pattern                           │
├─────────────────────────────────────────────────────────────┤
│                  DATA LAYER                                 │
│  PostgreSQL + Redis Cache                                  │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Project Structure

#### **Backend Structure (NestJS)**
```
backend/
├── src/
│   ├── main.ts                    # Application entry point
│   ├── app.module.ts              # Root module
│   │
│   ├── core/                      # Core infrastructure
│   │   ├── guards/                # Authentication guards
│   │   ├── interceptors/          # Request/response interceptors
│   │   ├── filters/               # Exception filters
│   │   ├── pipes/                 # Validation pipes
│   │   └── decorators/            # Custom decorators
│   │
│   ├── common/                    # Shared utilities
│   │   ├── utils/                 # Helper functions
│   │   ├── constants/             # Application constants
│   │   ├── types/                 # TypeScript types
│   │   └── interfaces/            # Interfaces
│   │
│   ├── modules/                   # Feature modules
│   │   ├── auth/                  # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/        # JWT, Refresh Token strategies
│   │   │   └── dto/               # Data Transfer Objects
│   │   │
│   │   ├── users/                 # User management
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── companies/             # Company/tenant management
│   │   │   ├── companies.module.ts
│   │   │   ├── companies.controller.ts
│   │   │   ├── companies.service.ts
│   │   │   └── dto/
│   │   │
│   │   ├── crm/                   # CRM module
│   │   │   ├── crm.module.ts
│   │   │   ├── leads/             # Leads sub-module
│   │   │   │   ├── leads.controller.ts
│   │   │   │   ├── leads.service.ts
│   │   │   │   └── dto/
│   │   │   ├── contacts/          # Contacts sub-module
│   │   │   ├── activities/        # Activities sub-module
│   │   │   └── pipelines/         # Sales pipelines
│   │   │
│   │   ├── campaigns/             # Email campaigns
│   │   ├── forms/                 # Form builder
│   │   ├── billing/               # Billing & subscriptions
│   │   └── notifications/         # Notifications
│   │
│   ├── prisma/                    # Prisma schema and migrations
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   │
│   └── config/                    # Configuration
│       ├── database.config.ts
│       ├── jwt.config.ts
│       └── app.config.ts
│
├── test/                          # E2E tests
├── .env.example                   # Environment variables template
└── package.json
```

#### **Frontend Structure (Next.js)**
```
frontend/
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # Auth group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/           # Dashboard group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── leads/
│   │   │   │   ├── page.tsx       # List leads
│   │   │   │   ├── [id]/          # View lead
│   │   │   │   ├── create/        # Create lead
│   │   │   │   └── [id]/edit/     # Edit lead
│   │   │   ├── campaigns/
│   │   │   ├── billing/
│   │   │   └── layout.tsx         # Shared layout
│   │   │
│   │   ├── api/                   # API routes (optional, mostly backend)
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   │
│   ├── components/                # React components
│   │   ├── ui/                    # Base UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Table.tsx
│   │   │
│   │   ├── forms/                 # Form components
│   │   │   ├── LeadForm.tsx
│   │   │   ├── CampaignForm.tsx
│   │   │   └── FormBuilder.tsx
│   │   │
│   │   ├── layouts/               # Layout components
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   └── modules/               # Module-specific components
│   │       ├── leads/
│   │       ├── campaigns/
│   │       └── billing/
│   │
│   ├── lib/                       # Utilities and helpers
│   │   ├── api/                   # API client
│   │   │   ├── client.ts          # Axios instance
│   │   │   ├── leads.ts           # Lead API calls
│   │   │   └── auth.ts            # Auth API calls
│   │   │
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useLeads.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── utils/                 # Helper functions
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── store/                 # Redux store
│   │       ├── store.ts
│   │       ├── slices/
│   │       │   ├── authSlice.ts
│   │       │   ├── leadsSlice.ts
│   │       │   └── uiSlice.ts
│   │       └── api/               # RTK Query APIs
│   │
│   ├── types/                     # TypeScript types
│   │   ├── api.types.ts
│   │   ├── models.types.ts
│   │   └── common.types.ts
│   │
│   └── styles/                    # Global styles
│       ├── globals.css
│       └── variables.css
│
├── public/                        # Static assets
├── .env.local                     # Environment variables
└── package.json
```

---

## 2. Database Architecture

### 2.1 Multi-Tenancy Strategy

**Approach:** Row-Level Security (RLS) with company_id

**Rationale:**
- ✅ Simple implementation
- ✅ Cost-effective (single database)
- ✅ Easy backup and restore
- ✅ Scalable for initial growth (up to 10,000 companies)
- ✅ Can migrate to schema-per-tenant later if needed

**Alternative Considered:** Schema-per-tenant
- More isolation but complex management
- Reserved for enterprise customers if needed

### 2.2 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// CORE ENTITIES
// ============================================

model Company {
  id                String   @id @default(uuid())
  name              String
  domain            String?  @unique
  subdomain         String?  @unique
  logo              String?
  status            CompanyStatus @default(ACTIVE)
  
  // Subscription
  subscriptionTier  SubscriptionTier @default(STARTER)
  subscriptionStatus SubscriptionStatus @default(TRIAL)
  trialEndsAt       DateTime?
  subscriptionEndsAt DateTime?
  
  // Settings
  settings          Json?    // Company-specific settings
  timezone          String   @default("UTC")
  currency          String   @default("USD")
  
  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  users             User[]
  leads             Lead[]
  contacts          Contact[]
  campaigns         Campaign[]
  forms             Form[]
  subscriptions     Subscription[]
  invoices          Invoice[]
  
  @@index([status])
  @@index([subscriptionStatus])
}

enum CompanyStatus {
  ACTIVE
  SUSPENDED
  DELETED
}

enum SubscriptionTier {
  STARTER
  PROFESSIONAL
  BUSINESS
  ENTERPRISE
}

enum SubscriptionStatus {
  TRIAL
  ACTIVE
  PAST_DUE
  CANCELED
  EXPIRED
}

model User {
  id                String   @id @default(uuid())
  companyId         String
  
  // Profile
  email             String   @unique
  passwordHash      String
  firstName         String
  lastName          String
  phone             String?
  avatar            String?
  
  // Authentication
  emailVerified     Boolean  @default(false)
  emailVerifiedAt   DateTime?
  lastLoginAt       DateTime?
  refreshToken      String?  // Current refresh token
  
  // Authorization
  role              UserRole @default(EMPLOYEE)
  permissions       Json?    // Custom permissions
  
  // Status
  status            UserStatus @default(ACTIVE)
  isOnline          Boolean  @default(false)
  
  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  company           Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  assignedLeads     Lead[]   @relation("AssignedLeads")
  createdLeads      Lead[]   @relation("CreatedLeads")
  activities        Activity[]
  notifications     Notification[]
  
  @@index([companyId])
  @@index([email])
  @@index([status])
}

enum UserRole {
  SUPER_ADMIN    // Platform admin
  COMPANY_ADMIN  // Company owner
  MANAGER        // Team manager
  EMPLOYEE       // Regular user
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

// ============================================
// CRM MODULE
// ============================================

model Lead {
  id                String   @id @default(uuid())
  companyId         String
  
  // Basic Info
  firstName         String
  lastName          String
  email             String?
  phone             String?
  company           String?
  jobTitle          String?
  
  // Lead Details
  source            LeadSource?
  status            LeadStatus @default(NEW)
  priority          Priority @default(MEDIUM)
  value             Decimal?  @db.Decimal(10, 2)
  
  // Assignment
  assignedToId      String?
  assignedAt        DateTime?
  
  // Additional Data
  notes             String?   @db.Text
  tags              String[]
  customFields      Json?     // Flexible custom fields
  
  // Tracking
  lastContactedAt   DateTime?
  nextFollowUpAt    DateTime?
  convertedAt       DateTime?
  
  // Metadata
  createdById       String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  companyRelation   Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  assignedTo        User?    @relation("AssignedLeads", fields: [assignedToId], references: [id])
  createdBy         User     @relation("CreatedLeads", fields: [createdById], references: [id])
  activities        Activity[]
  
  @@index([companyId])
  @@index([assignedToId])
  @@index([status])
  @@index([createdAt])
  @@index([email])
}

enum LeadSource {
  WEBSITE
  REFERRAL
  SOCIAL_MEDIA
  EMAIL_CAMPAIGN
  COLD_CALL
  TRADE_SHOW
  ADVERTISEMENT
  OTHER
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  PROPOSAL
  NEGOTIATION
  WON
  LOST
  UNQUALIFIED
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

model Contact {
  id                String   @id @default(uuid())
  companyId         String
  
  // Basic Info
  firstName         String
  lastName          String
  email             String?
  phone             String?
  organization      String?
  position          String?
  
  // Additional
  notes             String?   @db.Text
  tags              String[]
  customFields      Json?
  
  // Timestamps
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  company           Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  
  @@index([companyId])
  @@index([email])
}

model Activity {
  id                String   @id @default(uuid())
  companyId         String
  leadId            String?
  userId            String
  
  // Activity Details
  type              ActivityType
  subject           String
  description       String?  @db.Text
  outcome           String?
  
  // Scheduling
  scheduledAt       DateTime?
  completedAt       DateTime?
  duration          Int?     // In minutes
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  lead              Lead?    @relation(fields: [leadId], references: [id], onDelete: Cascade)
  user              User     @relation(fields: [userId], references: [id])
  
  @@index([leadId])
  @@index([userId])
  @@index([scheduledAt])
}

enum ActivityType {
  CALL
  EMAIL
  MEETING
  NOTE
  TASK
  FOLLOW_UP
}

// ============================================
// CAMPAIGNS MODULE
// ============================================

model Campaign {
  id                String   @id @default(uuid())
  companyId         String
  
  // Campaign Info
  name              String
  type              CampaignType
  status            CampaignStatus @default(DRAFT)
  
  // Email Campaign Specific
  subject           String?
  fromName          String?
  fromEmail         String?
  replyTo           String?
  templateId        String?
  
  // Content
  htmlContent       String?  @db.Text
  textContent       String?  @db.Text
  
  // Scheduling
  scheduledAt       DateTime?
  sentAt            DateTime?
  completedAt       DateTime?
  
  // Tracking
  totalRecipients   Int      @default(0)
  totalSent         Int      @default(0)
  totalDelivered    Int      @default(0)
  totalOpened       Int      @default(0)
  totalClicked      Int      @default(0)
  totalBounced      Int      @default(0)
  totalUnsubscribed Int      @default(0)
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  company           Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  
  @@index([companyId])
  @@index([status])
}

enum CampaignType {
  EMAIL
  SMS
  WHATSAPP
}

enum CampaignStatus {
  DRAFT
  SCHEDULED
  SENDING
  SENT
  PAUSED
  CANCELED
}

// ============================================
// FORMS MODULE
// ============================================

model Form {
  id                String   @id @default(uuid())
  companyId         String
  
  // Form Info
  name              String
  description       String?
  status            FormStatus @default(DRAFT)
  
  // Configuration
  fields            Json     // Array of form fields
  settings          Json?    // Form settings (notifications, etc.)
  
  // Tracking
  totalSubmissions  Int      @default(0)
  
  // Metadata
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  publishedAt       DateTime?
  
  // Relations
  company           Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  submissions       FormSubmission[]
  
  @@index([companyId])
  @@index([status])
}

enum FormStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model FormSubmission {
  id                String   @id @default(uuid())
  formId            String
  
  // Submission Data
  data              Json     // Submitted form data
  
  // Source
  ipAddress         String?
  userAgent         String?
  referrer          String?
  
  // Lead Creation
  leadCreated       Boolean  @default(false)
  leadId            String?
  
  // Timestamps
  submittedAt       DateTime @default(now())
  
  // Relations
  form              Form     @relation(fields: [formId], references: [id], onDelete: Cascade)
  
  @@index([formId])
  @@index([submittedAt])
}

// ============================================
// BILLING MODULE
// ============================================

model Subscription {
  id                String   @id @default(uuid())
  companyId         String
  
  // Subscription Details
  tier              SubscriptionTier
  status            SubscriptionStatus
  
  // Billing Period
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAt          DateTime?
  canceledAt        DateTime?
  
  // Payment
  paymentMethod     String?  // Stripe, Razorpay, etc.
  paymentMethodId   String?  // External payment method ID
  
  // Metadata
  metadata          Json?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  company           Company  @relation(fields: [companyId], references: [id], onDelete: Cascade)
  invoices          Invoice[]
  
  @@index([companyId])
  @@index([status])
}

model Invoice {
  id                String   @id @default(uuid())
  companyId         String
  subscriptionId    String?
  
  // Invoice Info
  invoiceNumber     String   @unique
  status            InvoiceStatus @default(DRAFT)
  
  // Amounts
  subtotal          Decimal  @db.Decimal(10, 2)
  tax               Decimal  @db.Decimal(10, 2) @default(0)
  total             Decimal  @db.Decimal(10, 2)
  amountPaid        Decimal  @db.Decimal(10, 2) @default(0)
  amountDue         Decimal  @db.Decimal(10, 2)
  
  // Dates
  invoiceDate       DateTime
  dueDate           DateTime
  paidAt            DateTime?
  
  // Payment
  paymentMethod     String?
  transactionId     String?
  
  // Metadata
  notes             String?  @db.Text
  metadata          Json?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  // Relations
  company           Company      @relation(fields: [companyId], references: [id], onDelete: Cascade)
  subscription      Subscription? @relation(fields: [subscriptionId], references: [id])
  
  @@index([companyId])
  @@index([status])
  @@index([invoiceNumber])
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
  CANCELED
  REFUNDED
}

// ============================================
// NOTIFICATIONS MODULE
// ============================================

model Notification {
  id                String   @id @default(uuid())
  userId            String
  
  // Notification Info
  type              NotificationType
  title             String
  message           String
  actionUrl         String?
  
  // Status
  read              Boolean  @default(false)
  readAt            DateTime?
  
  // Metadata
  metadata          Json?
  createdAt         DateTime @default(now())
  
  // Relations
  user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([read])
  @@index([createdAt])
}

enum NotificationType {
  LEAD_ASSIGNED
  LEAD_STATUS_CHANGED
  CAMPAIGN_COMPLETED
  FORM_SUBMISSION
  PAYMENT_RECEIVED
  SUBSCRIPTION_EXPIRING
  SYSTEM_ALERT
}

// ============================================
// AUDIT LOG
// ============================================

model AuditLog {
  id                String   @id @default(uuid())
  companyId         String?
  userId            String?
  
  // Action Details
  action            String   // CREATE, UPDATE, DELETE, etc.
  entity            String   // Lead, User, Company, etc.
  entityId          String
  
  // Changes
  oldValues         Json?
  newValues         Json?
  
  // Context
  ipAddress         String?
  userAgent         String?
  
  // Timestamp
  createdAt         DateTime @default(now())
  
  @@index([companyId])
  @@index([userId])
  @@index([entity, entityId])
  @@index([createdAt])
}
```

### 2.3 Database Indexing Strategy

**Purpose:** Optimize query performance

**Index Guidelines:**
1. **Foreign Keys:** Always indexed (companyId, userId, leadId, etc.)
2. **Lookup Fields:** Fields used in WHERE clauses (status, email, etc.)
3. **Sorting Fields:** Fields used in ORDER BY (createdAt, etc.)
4. **Composite Indexes:** For common multi-field queries

**Example Composite Indexes:**
```sql
-- Leads filtered by company and status, sorted by creation date
CREATE INDEX idx_leads_company_status_created 
ON leads(company_id, status, created_at DESC);

-- Users filtered by company and role
CREATE INDEX idx_users_company_role 
ON users(company_id, role);
```

### 2.4 Data Migration Scripts

**From PHP PostgreSQL to New Schema:**

```typescript
// scripts/migrate-data.ts
import { PrismaClient } from '@prisma/client';
import { OldPrismaClient } from './old-prisma-client'; // Old schema

const prisma = new PrismaClient();
const oldPrisma = new OldPrismaClient();

async function migrateCompanies() {
  const oldCompanies = await oldPrisma.companies.findMany();
  
  for (const oldCompany of oldCompanies) {
    await prisma.company.create({
      data: {
        id: oldCompany.id,
        name: oldCompany.name,
        domain: oldCompany.domain,
        status: mapCompanyStatus(oldCompany.status),
        // Map other fields
        createdAt: oldCompany.created_at,
        updatedAt: oldCompany.updated_at,
      }
    });
  }
}

async function migrateLeads() {
  const oldLeads = await oldPrisma.leads.findMany();
  
  for (const oldLead of oldLeads) {
    await prisma.lead.create({
      data: {
        id: oldLead.id,
        companyId: oldLead.company_id,
        firstName: oldLead.first_name,
        lastName: oldLead.last_name,
        email: oldLead.email,
        phone: oldLead.phone,
        status: mapLeadStatus(oldLead.status),
        // Map other fields
        createdById: oldLead.created_by,
        createdAt: oldLead.created_at,
        updatedAt: oldLead.updated_at,
      }
    });
  }
}

// Run migrations
async function main() {
  console.log('Starting data migration...');
  
  await migrateCompanies();
  console.log('✅ Companies migrated');
  
  await migrateLeads();
  console.log('✅ Leads migrated');
  
  // Continue with other entities...
}

main();
```

---

## 3. API Specifications

### 3.1 API Design Principles

**RESTful Conventions:**
- Use HTTP methods correctly (GET, POST, PUT, PATCH, DELETE)
- Resource-based URLs (/api/leads, not /api/getLeads)
- Proper HTTP status codes
- Versioned APIs (/api/v1/)
- Consistent response format

**Response Format:**
```typescript
// Success Response
{
  "success": true,
  "data": { /* resource data */ },
  "message": "Operation successful",
  "timestamp": "2025-10-10T10:30:00Z"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  },
  "timestamp": "2025-10-10T10:30:00Z"
}

// Paginated Response
{
  "success": true,
  "data": [ /* array of resources */ ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalItems": 95
  },
  "timestamp": "2025-10-10T10:30:00Z"
}
```

### 3.2 Authentication APIs

#### **POST /api/auth/register**
Register a new user and company

**Request:**
```typescript
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Inc"
}
```

**Response (201):**
```typescript
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "COMPANY_ADMIN"
    },
    "company": {
      "id": "company-uuid",
      "name": "Acme Inc",
      "subscriptionTier": "STARTER",
      "subscriptionStatus": "TRIAL"
    }
  },
  "message": "Registration successful. Please verify your email."
}
```

#### **POST /api/auth/login**
Authenticate user

**Request:**
```typescript
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "COMPANY_ADMIN",
      "companyId": "company-uuid"
    }
  }
}
```

#### **POST /api/auth/refresh**
Refresh access token

**Request:**
```typescript
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."  // New refresh token
  }
}
```

#### **POST /api/auth/logout**
Logout user (invalidate refresh token)

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 3.3 Leads APIs

#### **GET /api/leads**
Get list of leads with filtering and pagination

**Query Parameters:**
- `page` (default: 1)
- `pageSize` (default: 20, max: 100)
- `status` (filter by status: NEW, CONTACTED, etc.)
- `assignedToId` (filter by assigned user)
- `source` (filter by lead source)
- `priority` (filter by priority)
- `search` (search in name, email, company)
- `sortBy` (field to sort by: createdAt, updatedAt, etc.)
- `sortOrder` (asc or desc)

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "data": [
    {
      "id": "lead-uuid",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "company": "Tech Corp",
      "status": "NEW",
      "priority": "HIGH",
      "source": "WEBSITE",
      "value": 5000,
      "assignedTo": {
        "id": "user-uuid",
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "2025-10-10T08:00:00Z",
      "updatedAt": "2025-10-10T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 3,
    "totalItems": 54
  }
}
```

#### **POST /api/leads**
Create a new lead

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```typescript
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "jobTitle": "CEO",
  "source": "WEBSITE",
  "priority": "HIGH",
  "value": 5000,
  "notes": "Interested in Enterprise plan",
  "tags": ["hot-lead", "enterprise"],
  "customFields": {
    "industry": "Technology",
    "employees": "50-100"
  }
}
```

**Response (201):**
```typescript
{
  "success": true,
  "data": {
    "id": "lead-uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    // ... all lead fields
    "createdAt": "2025-10-10T10:30:00Z",
    "updatedAt": "2025-10-10T10:30:00Z"
  },
  "message": "Lead created successfully"
}
```

#### **GET /api/leads/:id**
Get single lead details

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "id": "lead-uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    // ... all lead fields
    "assignedTo": {
      "id": "user-uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com"
    },
    "createdBy": {
      "id": "user-uuid",
      "firstName": "Admin",
      "lastName": "User"
    },
    "activities": [
      {
        "id": "activity-uuid",
        "type": "CALL",
        "subject": "Initial contact call",
        "completedAt": "2025-10-10T09:00:00Z",
        "user": {
          "id": "user-uuid",
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    ]
  }
}
```

#### **PUT /api/leads/:id**
Update lead (full update)

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```typescript
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "phone": "+1234567890",
  "status": "CONTACTED",
  "priority": "HIGH",
  "notes": "Called on Oct 10, interested in demo"
}
```

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "id": "lead-uuid",
    // ... updated lead data
  },
  "message": "Lead updated successfully"
}
```

#### **PATCH /api/leads/:id**
Partial update (specific fields)

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```typescript
{
  "status": "QUALIFIED",
  "nextFollowUpAt": "2025-10-15T14:00:00Z"
}
```

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "id": "lead-uuid",
    // ... updated lead data
  },
  "message": "Lead updated successfully"
}
```

#### **DELETE /api/leads/:id**
Delete a lead

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

#### **POST /api/leads/:id/assign**
Assign lead to user

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```typescript
{
  "userId": "user-uuid"
}
```

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "id": "lead-uuid",
    "assignedTo": {
      "id": "user-uuid",
      "firstName": "John",
      "lastName": "Doe"
    },
    "assignedAt": "2025-10-10T10:30:00Z"
  },
  "message": "Lead assigned successfully"
}
```

### 3.4 Campaign APIs

#### **GET /api/campaigns**
Get list of campaigns

**Query Parameters:**
- `page`, `pageSize`
- `status` (DRAFT, SCHEDULED, SENT, etc.)
- `type` (EMAIL, SMS, WHATSAPP)

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "data": [
    {
      "id": "campaign-uuid",
      "name": "Q4 Product Launch",
      "type": "EMAIL",
      "status": "SENT",
      "totalRecipients": 1000,
      "totalSent": 1000,
      "totalOpened": 350,
      "totalClicked": 120,
      "openRate": 35.0,
      "clickRate": 12.0,
      "sentAt": "2025-10-01T08:00:00Z"
    }
  ],
  "pagination": { /* ... */ }
}
```

#### **POST /api/campaigns**
Create campaign

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```typescript
{
  "name": "Product Launch Email",
  "type": "EMAIL",
  "subject": "Exciting New Product Launch!",
  "fromName": "Acme Inc",
  "fromEmail": "hello@acme.com",
  "replyTo": "support@acme.com",
  "htmlContent": "<html>...</html>",
  "textContent": "Plain text version...",
  "scheduledAt": "2025-10-15T09:00:00Z"
}
```

**Response (201):**
```typescript
{
  "success": true,
  "data": {
    "id": "campaign-uuid",
    "name": "Product Launch Email",
    "status": "SCHEDULED",
    // ... campaign details
  },
  "message": "Campaign created successfully"
}
```

### 3.5 Forms APIs

#### **GET /api/forms**
Get list of forms

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "data": [
    {
      "id": "form-uuid",
      "name": "Contact Us Form",
      "status": "PUBLISHED",
      "totalSubmissions": 45,
      "createdAt": "2025-09-01T10:00:00Z"
    }
  ]
}
```

#### **POST /api/forms**
Create form

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```typescript
{
  "name": "Contact Us Form",
  "description": "General inquiry form",
  "fields": [
    {
      "id": "field-1",
      "type": "text",
      "label": "Full Name",
      "placeholder": "Enter your name",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 100
      }
    },
    {
      "id": "field-2",
      "type": "email",
      "label": "Email Address",
      "required": true
    },
    {
      "id": "field-3",
      "type": "textarea",
      "label": "Message",
      "required": true,
      "rows": 5
    }
  ],
  "settings": {
    "redirectUrl": "/thank-you",
    "notifyEmail": "admin@example.com",
    "autoCreateLead": true
  }
}
```

**Response (201):**
```typescript
{
  "success": true,
  "data": {
    "id": "form-uuid",
    "name": "Contact Us Form",
    "status": "DRAFT",
    // ... form details
  }
}
```

#### **POST /api/public/forms/:id/submit**
Submit form (public endpoint, no auth required)

**Request:**
```typescript
{
  "data": {
    "field-1": "John Doe",
    "field-2": "john@example.com",
    "field-3": "I'm interested in your product"
  },
  "metadata": {
    "referrer": "https://example.com/contact",
    "userAgent": "Mozilla/5.0..."
  }
}
```

**Response (200):**
```typescript
{
  "success": true,
  "message": "Form submitted successfully",
  "redirectUrl": "/thank-you"
}
```

### 3.6 Billing APIs

#### **GET /api/subscriptions/current**
Get current subscription

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "id": "subscription-uuid",
    "tier": "PROFESSIONAL",
    "status": "ACTIVE",
    "currentPeriodStart": "2025-10-01T00:00:00Z",
    "currentPeriodEnd": "2025-11-01T00:00:00Z",
    "cancelAt": null,
    "usage": {
      "users": 5,
      "maxUsers": 50,
      "leads": 1200,
      "maxLeads": 250000
    }
  }
}
```

#### **POST /api/subscriptions/upgrade**
Upgrade subscription

**Headers:** `Authorization: Bearer {accessToken}`

**Request:**
```typescript
{
  "tier": "BUSINESS"
}
```

**Response (200):**
```typescript
{
  "success": true,
  "data": {
    "subscription": { /* updated subscription */ },
    "prorationAmount": 150.00,
    "nextBillingDate": "2025-11-01"
  },
  "message": "Subscription upgraded successfully"
}
```

#### **GET /api/invoices**
Get invoices

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```typescript
{
  "success": true,
  "data": [
    {
      "id": "invoice-uuid",
      "invoiceNumber": "INV-2025-001",
      "status": "PAID",
      "total": 199.00,
      "amountPaid": 199.00,
      "invoiceDate": "2025-10-01",
      "paidAt": "2025-10-01T10:00:00Z",
      "downloadUrl": "/api/invoices/invoice-uuid/download"
    }
  ]
}
```

### 3.7 Error Codes

**Standard HTTP Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success with no response body
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (duplicate email, etc.)
- `422 Unprocessable Entity` - Validation error
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

**Custom Error Codes:**
```typescript
enum ErrorCode {
  // Authentication
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  
  // Authorization
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  SUBSCRIPTION_REQUIRED = 'SUBSCRIPTION_REQUIRED',
  USAGE_LIMIT_EXCEEDED = 'USAGE_LIMIT_EXCEEDED',
  
  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
  INVALID_INPUT = 'INVALID_INPUT',
  
  // Business Logic
  LEAD_NOT_FOUND = 'LEAD_NOT_FOUND',
  CAMPAIGN_ALREADY_SENT = 'CAMPAIGN_ALREADY_SENT',
  FORM_NOT_PUBLISHED = 'FORM_NOT_PUBLISHED',
  
  // System
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED'
}
```

---

## 4. Authentication & Authorization

### 4.1 Authentication Flow

```
┌──────────┐                           ┌──────────┐
│          │  1. POST /auth/login      │          │
│  Client  │ ────────────────────────> │  Server  │
│          │    email + password       │          │
└──────────┘                           └──────────┘
                                             │
                                             │ 2. Verify credentials
                                             │    (bcrypt compare)
                                             ▼
                                       ┌──────────┐
                                       │ Database │
                                       └──────────┘
                                             │
                                             │ 3. Generate tokens
                                             │    - Access Token (15 min)
                                             │    - Refresh Token (30 days)
                                             ▼
┌──────────┐                           ┌──────────┐
│          │  4. Return tokens         │          │
│  Client  │ <──────────────────────── │  Server  │
│          │    + user data            │          │
└──────────┘                           └──────────┘
     │
     │ 5. Store tokens
     │    - Access token in memory
     │    - Refresh token in httpOnly cookie
     ▼
┌──────────┐
│ Storage  │
└──────────┘
```

**Subsequent API Requests:**
```
┌──────────┐                           ┌──────────┐
│          │  GET /api/leads           │          │
│  Client  │ ────────────────────────> │  Server  │
│          │  Authorization: Bearer    │          │
│          │  {access_token}           │          │
└──────────┘                           └──────────┘
                                             │
                                             │ Verify JWT
                                             │ Extract user info
                                             │ Check permissions
                                             ▼
                                       Process request
```

**Token Refresh Flow:**
```
Access Token Expired
     │
     ▼
┌──────────┐                           ┌──────────┐
│          │  POST /auth/refresh       │          │
│  Client  │ ────────────────────────> │  Server  │
│          │  {refresh_token}          │          │
└──────────┘                           └──────────┘
                                             │
                                             │ Verify refresh token
                                             │ Check if revoked
                                             ▼
                                       Generate new tokens
                                             │
┌──────────┐                                │
│          │  New tokens                    │
│  Client  │ <────────────────────────────┘
│          │
└──────────┘
```

### 4.2 JWT Token Structure

**Access Token Payload:**
```typescript
{
  "sub": "user-uuid",           // Subject (user ID)
  "email": "user@example.com",
  "companyId": "company-uuid",
  "role": "COMPANY_ADMIN",
  "permissions": ["leads:read", "leads:write"],
  "iat": 1696938000,            // Issued at
  "exp": 1696938900             // Expires at (15 min later)
}
```

**Refresh Token Payload:**
```typescript
{
  "sub": "user-uuid",
  "tokenId": "refresh-token-uuid",  // Unique token ID
  "iat": 1696938000,
  "exp": 1699530000              // Expires at (30 days later)
}
```

### 4.3 Authorization (RBAC)

**Role Hierarchy:**
```
SUPER_ADMIN (Platform)
    └── COMPANY_ADMIN (Company)
            └── MANAGER (Team)
                    └── EMPLOYEE (Individual)
```

**Permission Structure:**
```typescript
// Permission format: resource:action
type Permission = 
  | 'leads:read'
  | 'leads:write'
  | 'leads:delete'
  | 'campaigns:read'
  | 'campaigns:write'
  | 'billing:read'
  | 'billing:write'
  | 'users:read'
  | 'users:write'
  | 'settings:read'
  | 'settings:write';

// Role-Permission Mapping
const rolePermissions = {
  SUPER_ADMIN: ['*:*'],  // All permissions
  
  COMPANY_ADMIN: [
    'leads:*',
    'campaigns:*',
    'forms:*',
    'billing:*',
    'users:*',
    'settings:*'
  ],
  
  MANAGER: [
    'leads:read',
    'leads:write',
    'campaigns:read',
    'campaigns:write',
    'forms:read',
    'users:read'
  ],
  
  EMPLOYEE: [
    'leads:read',
    'leads:write',  // Own leads only
    'campaigns:read',
    'forms:read'
  ]
};
```

**NestJS Guard Implementation:**
```typescript
// guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
### 8.2 Payment Gateway Integration (Razorpay)

**Integration Pattern:**
- Razorpay SDK for payment processing
- Webhook handling for payment status updates
- Secure payment intent creation
- Invoice generation post-payment
- Automatic subscription renewal handling

**Key Flows:**
1. User initiates payment → Create Razorpay order
2. User completes payment → Razorpay webhook notification
3. Verify webhook signature → Update subscription status
4. Generate invoice → Send confirmation email

### 8.3 WhatsApp Business API Integration

**Integration Approach:**
- WhatsApp Business API for sending messages
- Webhook for receiving message responses
- Template message management
- Queue-based message sending
- Response tracking and analytics

**Key Features:**
- Send template messages (marketing, transactional)
- Two-way conversation handling
- Message status tracking (sent, delivered, read)
- Media attachment support
- Contact opt-in/opt-out management

### 8.4 Third-Party Integration Framework

**Standard Integration Pattern:**
1. **Configuration Storage:** Store API keys, credentials securely
2. **Service Layer:** Abstract integration logic in dedicated services
3. **Error Handling:** Retry logic with exponential backoff
4. **Webhook Management:** Secure webhook endpoints with signature verification
5. **Rate Limiting:** Respect third-party API rate limits
6. **Logging:** Comprehensive logging for debugging

**Future Integrations Planned:**
- Google Calendar (meeting scheduling)
- Zoom (video meetings)
- QuickBooks (accounting)
- Zapier (automation)
- Slack (notifications)

---

## 9. Data Flow Diagrams

### 9.1 User Registration Flow

```
User → Register Form → Validation → Create Company → Create User → Send Verification Email
                                           ↓
                                    Assign Trial Subscription
                                           ↓
                                    Create Default Settings
                                           ↓
                                    Return Success + Tokens
```

### 9.2 Lead Creation & Assignment Flow

```
User → Create Lead Form → Validation
                              ↓
                         Save to Database
                              ↓
                    Auto-assign based on rules
                              ↓
                         Notify Assigned User
                              ↓
                         Create Activity Log
                              ↓
                         Return Lead Details
```

### 9.3 Email Campaign Flow

```
Admin → Create Campaign → Select Recipients → Design Email → Schedule
                                                                  ↓
                                                            Queue Messages
                                                                  ↓
                                                       Worker Processes Queue
                                                                  ↓
                                                         Send via Email Service
                                                                  ↓
                                                    Track Opens/Clicks/Bounces
                                                                  ↓
                                                         Update Analytics
```

### 9.4 Form Submission to Lead Flow

```
Visitor → Fill Form → Submit
                        ↓
                   Validate Fields
                        ↓
                   Save Submission
                        ↓
              Auto-create Lead (if enabled)
                        ↓
              Notify Assigned User/Admin
                        ↓
              Show Success Message
```

### 9.5 Subscription Payment Flow

```
User → Upgrade Plan → Create Razorpay Order
                              ↓
                        User Pays via Razorpay
                              ↓
                      Razorpay Webhook Notification
                              ↓
                      Verify Webhook Signature
                              ↓
                      Update Subscription Status
                              ↓
                      Generate Invoice
                              ↓
                      Send Confirmation Email
```

---

## 10. Implementation Guidelines

### 10.1 Development Phases

**Phase 1: Foundation (Weeks 1-4)**
- Project setup (Next.js + NestJS boilerplate)
- Database schema implementation (Prisma)
- Authentication system (JWT + Refresh tokens)
- User management (CRUD operations)
- Company/tenant management
- Basic dashboard layout

**Phase 2: Core CRM (Weeks 5-8)**
- Lead management (CRUD + filters + search)
- Lead assignment system
- Activity tracking
- Contact management
- Basic reporting
- Mobile responsive UI

**Phase 3: Advanced CRM (Weeks 9-10)**
- Email campaigns (basic version)
- Form builder
- WhatsApp integration (basic)
- Task management
- Advanced filters and search

**Phase 4: Billing & Polish (Weeks 11-12)**
- Razorpay integration
- Subscription management
- Invoice generation
- Usage tracking
- Performance optimization
- Bug fixes and testing

### 10.2 Code Quality Standards

**TypeScript Requirements:**
- Strict mode enabled
- No implicit any types
- Proper interface definitions for all data structures
- Type guards for runtime validation

**Testing Requirements:**
- Unit test coverage >80%
- Integration tests for all API endpoints
- E2E tests for critical user flows
- Performance tests for high-load scenarios

**Documentation Requirements:**
- JSDoc comments for all public functions
- README for each module
- API documentation (Swagger)
- Architecture decision records (ADRs)

**Code Review Process:**
- All code must be reviewed by at least one other developer
- Automated checks must pass (linting, tests, build)
- No direct commits to main/staging branches
- Use feature branches with descriptive names

### 10.3 Security Implementation Checklist

**Authentication & Authorization:**
- [ ] JWT tokens with short expiry (15 min)
- [ ] Refresh token rotation
- [ ] Password hashing with bcrypt (10+ rounds)
- [ ] Email verification for new accounts
- [ ] Two-factor authentication (future)
- [ ] Rate limiting on auth endpoints

**Data Protection:**
- [ ] All sensitive data encrypted at rest
- [ ] HTTPS enforced everywhere
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS prevention (React auto-escaping)
- [ ] CSRF tokens for state-changing operations
- [ ] Input validation on all endpoints

**Infrastructure Security:**
- [ ] VPC isolation for databases
- [ ] Security groups properly configured
- [ ] Secrets stored in AWS Secrets Manager
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning
- [ ] DDoS protection (CloudFlare)

### 10.4 Performance Optimization Checklist

**Frontend Optimization:**
- [ ] Code splitting by route
- [ ] Lazy loading for below-fold content
- [ ] Image optimization (Next.js Image)
- [ ] Bundle size monitoring (<500KB initial)
- [ ] React.memo for expensive components
- [ ] useMemo/useCallback where appropriate

**Backend Optimization:**
- [ ] Database query optimization (proper indexes)
- [ ] N+1 query prevention
- [ ] Response caching (Redis)
- [ ] Connection pooling
- [ ] Pagination for large datasets
- [ ] Background jobs for heavy operations

**Infrastructure Optimization:**
- [ ] CDN for static assets
- [ ] Database read replicas
- [ ] Horizontal scaling with Kubernetes
- [ ] Auto-scaling based on load
- [ ] Response compression (Gzip)
- [ ] API rate limiting

### 10.5 Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Backup procedures in place
- [ ] Monitoring and alerts configured

**Deployment Steps:**
1. Code freeze and final testing
2. Database backup
3. Run database migrations
4. Deploy backend (blue-green deployment)
5. Deploy frontend
6. Smoke tests on production
7. Monitor for errors (30 minutes)
8. Rollback if critical issues found

**Post-Deployment:**
- [ ] Verify all critical features working
- [ ] Check monitoring dashboards
- [ ] Review error logs
- [ ] Performance metrics within acceptable range
- [ ] User communication (if needed)

### 10.6 Monitoring & Maintenance

**Daily Monitoring:**
- Application error rates
- API response times
- Database performance
- Server resources (CPU, memory)
- User activity metrics

**Weekly Reviews:**
- Performance trends
- Error patterns
- Security alerts
- User feedback
- Feature usage statistics

**Monthly Maintenance:**
- Dependency updates
- Security patches
- Database optimization
- Log cleanup
- Backup verification

---

## 11. Scalability Roadmap

### 11.1 Current Architecture (0-1,000 users)
- **Database:** Single PostgreSQL instance
- **Application:** 3-5 pods in Kubernetes
- **Caching:** Single Redis instance
- **Costs:** ~$1,500/month

### 11.2 Phase 2 Scaling (1,000-10,000 users)
- **Database:** Primary + read replicas
- **Application:** 10-20 pods with auto-scaling
- **Caching:** Redis cluster
- **CDN:** CloudFront for global distribution
- **Costs:** ~$5,000/month

### 11.3 Phase 3 Scaling (10,000-100,000 users)
- **Database:** Sharding by company_id
- **Application:** 50+ pods across multiple regions
- **Microservices:** Break apart monolith into services
- **Message Queue:** RabbitMQ/SQS for async processing
- **Costs:** ~$20,000/month

### 11.4 Enterprise Scale (100,000+ users)
- **Database:** Multi-region clusters
- **Application:** Kubernetes across multiple clouds
- **Search:** Elasticsearch cluster
- **Analytics:** Separate analytics pipeline
- **Costs:** ~$50,000+/month

---

## 12. Risk Mitigation Strategies

### 12.1 Technical Risks

**Risk: Database Performance Degradation**
- **Mitigation:** Implement read replicas, query optimization, regular index maintenance
- **Monitoring:** Track slow query logs, connection pool utilization

**Risk: Third-Party Service Outage**
- **Mitigation:** Implement circuit breakers, fallback mechanisms, queue critical operations
- **Example:** If email service down, queue emails for later sending

**Risk: Security Breach**
- **Mitigation:** Regular security audits, penetration testing, compliance certifications
- **Response Plan:** Incident response procedures documented and tested

**Risk: Data Loss**
- **Mitigation:** Automated backups, point-in-time recovery, geo-redundant storage
- **Testing:** Regular restore drills

### 12.2 Operational Risks

**Risk: Key Developer Departure**
- **Mitigation:** Code documentation, knowledge sharing sessions, pair programming
- **Documentation:** Keep architecture docs and ADRs up-to-date

**Risk: Rapid User Growth**
- **Mitigation:** Auto-scaling configured, load testing performed, capacity planning
- **Monitoring:** Alert on unusual traffic spikes

**Risk: Migration Failures**
- **Mitigation:** Comprehensive migration testing, rollback procedures, phased migration
- **Validation:** Data integrity checks post-migration

---

## 13. Success Metrics & KPIs

### 13.1 Technical Metrics

**Performance:**
- API response time (p95): <500ms
- Page load time: <2 seconds
- Database query time: <100ms
- Uptime: 99.9%

**Code Quality:**
- Test coverage: >80%
- Code review completion: 100%
- Critical security vulnerabilities: 0
- Technical debt ratio: <5%

### 13.2 Business Metrics

**Adoption:**
- Daily active users (DAU): 70% of total users
- Feature adoption rate: >40% for new features
- Time to first value: <7 days

**Growth:**
- New user registrations per week
- Customer retention rate: >90%
- Net Revenue Retention: >110%
- Churn rate: <5% monthly

### 13.3 User Experience Metrics

**Engagement:**
- Average session duration
- Actions per session
- Feature usage frequency
- Return user rate

**Satisfaction:**
- Customer satisfaction (CSAT): >4.5/5
- Net Promoter Score (NPS): >50
- Support ticket volume (target: decreasing)
- Feature request volume (healthy sign of engagement)

---

## 14. Conclusion & Next Steps

### 14.1 Architecture Summary

This System Design Document provides a comprehensive blueprint for building a scalable, secure, and maintainable ERP platform. The architecture prioritizes:

✅ **Modular Design** - Easy to add new modules (HR, Inventory, etc.)
✅ **Multi-Tenancy** - Efficient resource utilization with data isolation
✅ **Security First** - Multiple security layers from network to application
✅ **Performance** - Optimized for fast response times and high concurrency
✅ **Scalability** - Horizontal scaling with Kubernetes
✅ **Developer Experience** - TypeScript, clear patterns, comprehensive testing

### 14.2 Ready for Implementation

With this document, the development team has:
- ✅ Clear database schema (Prisma models)
- ✅ API specifications (endpoints, request/response formats)
- ✅ Component architecture (frontend and backend)
- ✅ Security guidelines
- ✅ Integration patterns
- ✅ Performance targets
- ✅ Deployment strategy

### 14.3 Immediate Next Steps

1. **Set up development environment**
   - Create GitHub repositories
   - Configure AWS infrastructure
   - Set up CI/CD pipelines

2. **Initialize project structure**
   - Create Next.js frontend boilerplate
   - Create NestJS backend boilerplate
   - Implement Prisma schema

3. **Build authentication module** (Week 1-2)
   - JWT authentication
   - User registration/login
   - Company creation
   - Basic authorization

4. **Build lead management module** (Week 3-4)
   - Lead CRUD operations
   - Lead assignment
   - Activity tracking
   - Basic dashboard

5. **Iterate and expand** (Week 5+)
   - Follow the phased roadmap
   - Add features incrementally
   - Continuous testing and deployment

---

## Appendix

### A. Technology Stack Summary

**Frontend:**
- Framework: Next.js 14+ (React 18+)
- Language: TypeScript 5+
- UI: Bootstrap 5.3+
- State: Redux Toolkit + RTK Query
- Forms: React Hook Form
- Data Fetching: TanStack Query

**Backend:**
- Framework: NestJS 10+
- Language: TypeScript 5+
- ORM: Prisma 5+
- Authentication: JWT + Passport
- Queue: Bull (Redis-based)
- WebSocket: Socket.io

**Database:**
- Primary: PostgreSQL 15+
- Cache: Redis 7+
- Search: PostgreSQL Full-Text (initial)

**Infrastructure:**
- Cloud: AWS
- Containers: Docker
- Orchestration: Kubernetes (EKS)
- CI/CD: GitHub Actions
- Monitoring: Sentry + Prometheus + Grafana

**Third-Party Services:**
- Payment: Razorpay
- Email: SendGrid / AWS SES
- SMS/WhatsApp: Twilio / WhatsApp Business API
- Storage: AWS S3
- CDN: CloudFront

### B. Glossary

**CRM:** Customer Relationship Management
**ERP:** Enterprise Resource Planning
**JWT:** JSON Web Token
**ORM:** Object-Relational Mapping
**SaaS:** Software as a Service
**RBAC:** Role-Based Access Control
**Multi-Tenancy:** Single application serving multiple customers
**Microservices:** Architectural pattern of independent services
**Horizontal Scaling:** Adding more servers to handle load
**Vertical Scaling:** Upgrading existing servers

### C. Reference Documents

**Related Documentation:**
1. Product Vision & Strategy Document
2. Technical Architecture Document
3. Development Standards Document (to be created)
4. Security & Compliance Document (to be created)
5. API Documentation (Swagger - auto-generated)
6. User Documentation (to be created)

### D. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-10 | Tech Team | Initial system design document |

---

**Document Status:** ✅ Ready for Development  
**Next Review:** End of Phase 1 implementation  
**Approval Required From:** CTO, Lead Architect, Senior Developers

---

**This System Design Document is the technical blueprint for building the Enterprise ERP Platform. All implementation should follow the patterns, standards, and guidelines defined in this document.** true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}

// Usage in controller
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.COMPANY_ADMIN, UserRole.MANAGER)
@Get('leads')
async getLeads(@User() user: User) {
  // Only COMPANY_ADMIN and MANAGER can access
}
```

**Row-Level Security:**
```typescript
// Ensure users only see their company's data
async getLeads(userId: string) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId }
  });

  return this.prisma.lead.findMany({
    where: {
      companyId: user.companyId,  // Filter by company
      // Additional filters based on role
      ...(user.role === UserRole.EMPLOYEE && {
        assignedToId: userId  // Employees see only assigned leads
      })
    }
  });
}
```

---

## 5. Module Designs

### 5.1 CRM Module - Lead Management

**Component Structure:**
```
src/modules/crm/
├── crm.module.ts
├── leads/
│   ├── leads.controller.ts
│   ├── leads.service.ts
│   ├── leads.repository.ts
│   ├── dto/
│   │   ├── create-lead.dto.ts
│   │   ├── update-lead.dto.ts
│   │   └── filter-lead.dto.ts
│   └── entities/
│       └── lead.entity.ts
├── activities/
│   ├── activities.controller.ts
│   ├── activities.service.ts
│   └── dto/
└── contacts/
    ├── contacts.controller.ts
    ├── contacts.service.ts
    └── dto/
```

**Lead Service Implementation:**
```typescript
// leads.service.ts
@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
    private notificationService: NotificationService
  ) {}

  async create(createLeadDto: CreateLeadDto, userId: string) {
    try {
      this.logger.info('Creating lead', { userId, data: createLeadDto });

      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      const lead = await this.prisma.lead.create({
        data: {
          ...createLeadDto,
          companyId: user.companyId,
          createdById: userId
        },
        include: {
          assignedTo: true,
          createdBy: true
        }
      });

      // Notify assigned user
      if (lead.assignedToId) {
        await this.notificationService.create({
          userId: lead.assignedToId,
          type: 'LEAD_ASSIGNED',
          title: 'New Lead Assigned',
          message: `Lead ${lead.firstName} ${lead.lastName} assigned to you`,
          actionUrl: `/leads/${lead.id}`
        });
      }

      this.logger.info('Lead created successfully', { leadId: lead.id });
      
      return lead;
    } catch (error) {
      this.logger.error('Lead creation failed', { error, userId });
      throw error;
    }
  }

  async findAll(filters: FilterLeadDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    const where = {
      companyId: user.companyId,
      ...(filters.status && { status: filters.status }),
      ...(filters.assignedToId && { assignedToId: filters.assignedToId }),
      ...(filters.source && { source: filters.source }),
      ...(filters.search && {
        OR: [
          { firstName: { contains: filters.search, mode: 'insensitive' } },
          { lastName: { contains: filters.search, mode: 'insensitive' } },
          { email: { contains: filters.search, mode: 'insensitive' } },
          { company: { contains: filters.search, mode: 'insensitive' } }
        ]
      }),
      // Employee role: only see assigned leads
      ...(user.role === UserRole.EMPLOYEE && {
        assignedToId: userId
      })
    };

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: {
          assignedTo: {
            select: { id: true, firstName: true, lastName: true, email: true }
          }
        },
        skip: (filters.page - 1) * filters.pageSize,
        take: filters.pageSize,
        orderBy: {
          [filters.sortBy || 'createdAt']: filters.sortOrder || 'desc'
        }
      }),
      this.prisma.lead.count({ where })
    ]);

    return {
      data: leads,
      pagination: {
        page: filters.page,
        pageSize: filters.pageSize,
        totalPages: Math.ceil(total / filters.pageSize),
        totalItems: total
      }
    };
  }

  async update(id: string, updateLeadDto: UpdateLeadDto, userId: string) {
    // Verify user has access to this lead
    await this.verifyLeadAccess(id, userId);

    const oldLead = await this.prisma.lead.findUnique({
      where: { id }
    });

    const lead = await this.prisma.lead.update({
      where: { id },
      data: updateLeadDto,
      include: {
        assignedTo: true
      }
    });

    // Track status change
    if (oldLead.status !== lead.status) {
      await this.prisma.activity.create({
        data: {
          leadId: id,
          userId,
          type: 'NOTE',
          subject: 'Status Changed',
          description: `Status changed from ${oldLead.status} to ${lead.status}`,
          completedAt: new Date()
        }
      });

      // Notify assigned user
      if (lead.assignedToId && lead.assignedToId !== userId) {
        await this.notificationService.create({
          userId: lead.assignedToId,
          type: 'LEAD_STATUS_CHANGED',
          title: 'Lead Status Updated',
          message: `Lead ${lead.firstName} ${lead.lastName} status: ${lead.status}`,
          actionUrl: `/leads/${lead.id}`
        });
      }
    }

    return lead;
  }

  private async verifyLeadAccess(leadId: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    const lead = await this.prisma.lead.findFirst({
      where: {
        id: leadId,
        companyId: user.companyId,
        // Employees can only access assigned leads
        ...(user.role === UserRole.EMPLOYEE && {
          assignedToId: userId
        })
      }
    });

    if (!lead) {
      throw new NotFoundException('Lead not found or access denied');
    }

    return lead;
  }
}
```

### 5.2 Campaign Module

**Email Campaign Flow:**
```
Create Campaign
    ↓
Select Recipients
    ↓
Design Email (Template)
    ↓
Schedule/Send
    ↓
Queue Processing
    ↓
Send via Email Service (SendGrid/SES)
    ↓
Track Opens/Clicks
    ↓
Analytics Dashboard
```

**Campaign Service:**
```typescript
@Injectable()
export class CampaignService {
  constructor(
    private prisma: PrismaService,
    private queueService: QueueService,
    private emailService: EmailService
  ) {}

  async sendCampaign(campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { company: true }
    });

    if (campaign.status !== 'SCHEDULED') {
      throw new BadRequestException('Campaign must be scheduled');
    }

    // Get recipients (based on filters)
    const recipients = await this.getRecipients(campaign);

    // Update campaign status
    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: {
        status: 'SENDING',
        totalRecipients: recipients.length
      }
    });

    // Queue emails for sending
    for (const recipient of recipients) {
      await this.queueService.add('email-campaign', {
        campaignId,
        recipient: {
          email: recipient.email,
          firstName: recipient.firstName,
          lastName: recipient.lastName
        },
        emailData: {
          subject: this.personalizeContent(campaign.subject, recipient),
          html: this.personalizeContent(campaign.htmlContent, recipient),
          from: `${campaign.fromName} <${campaign.fromEmail}>`,
          replyTo: campaign.replyTo
        }
      });
    }

    return { message: 'Campaign queued for sending', totalRecipients: recipients.length };
  }

  private personalizeContent(content: string, recipient: any): string {
    return content
      .replace(/{{firstName}}/g, recipient.firstName)
      .replace(/{{lastName}}/g, recipient.lastName)
      .replace(/{{email}}/g, recipient.email)
      .replace(/{{company}}/g, recipient.company || '');
  }
}
```

### 5.3 Forms Module

**Form Builder Structure:**
```typescript
// Form Field Types
type FieldType = 
  | 'text'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'file';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  options?: Array<{
    label: string;
    value: string;
  }>;
}

interface FormSettings {
  redirectUrl?: string;
  successMessage?: string;
  notifyEmail?: string;
  autoCreateLead: boolean;
  leadSource?: string;
}
```

**Form Submission Handling:**
```typescript
@Injectable()
export class FormSubmissionService {
  constructor(
    private prisma: PrismaService,
    private leadsService: LeadsService,
    private emailService: EmailService
  ) {}

  async submitForm(formId: string, submissionData: any, metadata: any) {
    const form = await this.prisma.form.findUnique({
      where: { id: formId },
      include: { company: true }
    });

    if (form.status !== 'PUBLISHED') {
      throw new BadRequestException('Form is not published');
    }

    // Validate submission against form fields
    this.validateSubmission(form.fields, submissionData);

    // Save submission
    const submission = await this.prisma.formSubmission.create({
      data: {
        formId,
        data: submissionData,
        ipAddress: metadata.ipAddress,
        userAgent: metadata.userAgent,
        referrer: metadata.referrer,
        submittedAt: new Date()
      }
    });

    // Auto-create lead if enabled
    if (form.settings.autoCreateLead) {
      const lead = await this.leadsService.create({
        firstName: submissionData['firstName'] || submissionData['name']?.split(' ')[0],
        lastName: submissionData['lastName'] || submissionData['name']?.split(' ')[1] || '',
        email: submissionData['email'],
        phone: submissionData['phone'],
        company: submissionData['company'],
        source: form.settings.leadSource || 'WEBSITE',
        notes: `Created from form: ${form.name}`,
        customFields: submissionData
      }, form.company.id);

      await this.prisma.formSubmission.update({
        where: { id: submission.id },
        data: { leadCreated: true, leadId: lead.id }
      });
    }

    // Send notification email
    if (form.settings.notifyEmail) {
      await this.emailService.send({
        to: form.settings.notifyEmail,
        subject: `New form submission: ${form.name}`,
        html: this.formatSubmissionEmail(form, submissionData)
      });
    }

    // Update form statistics
    await this.prisma.form.update({
      where: { id: formId },
      data: { totalSubmissions: { increment: 1 } }
    });

    return {
      submissionId: submission.id,
      redirectUrl: form.settings.redirectUrl,
      successMessage: form.settings.successMessage || 'Thank you for your submission!'
    };
  }

  private validateSubmission(fields: any[], data: any) {
    for (const field of fields) {
      if (field.required && !data[field.id]) {
        throw new BadRequestException(`Field ${field.label} is required`);
      }

      if (data[field.id] && field.validation) {
        // Validate based on field type and rules
        if (field.type === 'email' && !this.isValidEmail(data[field.id])) {
          throw new BadRequestException(`Invalid email format for ${field.label}`);
        }
        
        if (field.validation.minLength && data[field.id].length < field.validation.minLength) {
          throw new BadRequestException(`${field.label} must be at least ${field.validation.minLength} characters`);
        }
      }
    }
  }
}
```

---

## 6. Frontend Architecture

### 6.1 Next.js Page Structure

**Authentication Pages:**
```typescript
// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-3xl font-bold text-center">Sign in to your account</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <Input
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Button type="submit" fullWidth loading={loading}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
```

**Dashboard Layout:**
```typescript
// app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layouts/Sidebar';
import { Header } from '@/components/layouts/Header';
import { getCurrentUser } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

**Leads List Page:**
```typescript
// app/(dashboard)/leads/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LeadCard } from '@/components/modules/leads/LeadCard';
import { LeadFilters } from '@/components/modules/leads/LeadFilters';
import { Button } from '@/components/ui/Button';
import { leadsApi } from '@/lib/api/leads';
import Link from 'next/link';

export default function LeadsPage() {
  const [filters, setFilters] = useState({
    page: 1,
    pageSize: 20,
    status: '',
    search: ''
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['leads', filters],
    queryFn: () => leadsApi.getAll(filters)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading leads</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Link href="/leads/create">
          <Button>Create Lead</Button>
        </Link>
      </div>

      <LeadFilters filters={filters} onChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.data.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>

      {/* Pagination component */}
    </div>
  );
}
```

### 6.2 Component Library

**Button Component:**
```typescript
// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    disabled,
    className,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          'inline-flex items-center justify-center font-medium rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            // Variants
            'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500': variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
            'bg-transparent hover:bg-gray-100 text-gray-700': variant === 'ghost',
            
            // Sizes
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
            
            // States
            'w-full': fullWidth,
            'opacity-50 cursor-not-allowed': disabled || loading,
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

**Input Component:**
```typescript
// components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          className={clsx(
            'block w-full px-3 py-2 border rounded-md shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            {
              'border-gray-300': !error,
              'border-red-300 focus:ring-red-500 focus:border-red-500': error,
            },
            className
          )}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

**Modal Component:**
```typescript
// components/ui/Modal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Modal panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl`}>
              {title && (
                <Dialog.Title className="text-lg font-semibold p-6 border-b">
                  {title}
                </Dialog.Title>
              )}
              
              <div className="p-6">
                {children}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
```

### 6.3 State Management (Redux Toolkit)

**Auth Slice:**
```typescript
// lib/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await authApi.login(email, password);
    return response.data;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
```

**API Client Setup:**
```typescript
// lib/api/client.ts
import axios from 'axios';
import { store } from '@/lib/store/store';
import { setCredentials, clearCredentials } from '@/lib/store/slices/authSlice';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying, attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true } // Send refresh token cookie
        );

        store.dispatch(setCredentials({
          user: data.user,
          accessToken: data.accessToken
        }));

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        store.dispatch(clearCredentials());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 7. Backend Architecture

### 7.1 NestJS Module Structure

**Main Application Module:**
```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CrmModule } from './modules/crm/crm.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { FormsModule } from './modules/forms/forms.module';
import { BillingModule } from './modules/billing/billing.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    CrmModule,
    CampaignsModule,
    FormsModule,
    BillingModule,
    NotificationsModule,
  ],
})
export class AppModule {}
```

**Prisma Module:**
```typescript
// src/prisma/prisma.module.ts
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

**Exception Filter:**
```typescript
// src/core/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from '@/common/logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Internal server error';

    const errorResponse = {
      success: false,
      error: {
        code: this.getErrorCode(exception),
        message: typeof message === 'string' ? message : (message as any).message,
        details: typeof message === 'object' ? (message as any).message : undefined,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log error
    this.logger.error('Request failed', {
      status,
      error: exception,
      path: request.url,
      method: request.method,
      userId: request.user?.id,
    });

    response.status(status).json(errorResponse);
  }

  private getErrorCode(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'object' && 'code' in response) {
        return (response as any).code;
      }
    }
    return 'INTERNAL_ERROR';
  }
}
```

**Logging Interceptor:**
```typescript
// src/core/interceptors/logging.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@/common/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, user } = request;
    const startTime = Date.now();

    this.logger.info('Incoming request', {
      method,
      url,
      userId: user?.id,
      body: this.sanitizeBody(body),
    });

    return next.handle().pipe(
      tap({
        next: (data) => {
          const duration = Date.now() - startTime;
          this.logger.info('Request completed', {
            method,
            url,
            duration,
            userId: user?.id,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error('Request failed', {
            method,
            url,
            duration,
            error: error.message,
            stack: error.stack,
            userId: user?.id,
          });
        },
      })
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;
    
    const sanitized = { ...body };
    // Remove sensitive fields
    const sensitiveFields = ['password', 'token', 'secret', 'apiKey'];
    
    for (const field of sensitiveFields) {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    }
    
    return sanitized;
  }
}
```

### 7.2 Background Jobs (Bull Queue)

**Queue Setup:**
```typescript
// src/queues/queues.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { EmailQueueProcessor } from './processors/email-queue.processor';
import { CampaignQueueProcessor } from './processors/campaign-queue.processor';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
        },
      }),
    }),
    BullModule.registerQueue(
      { name: 'email' },
      { name: 'campaign' },
      { name: 'notifications' }
    ),
  ],
  providers: [EmailQueueProcessor, CampaignQueueProcessor],
  exports: [BullModule],
})
export class QueuesModule {}
```

**Email Queue Processor:**
```typescript
// src/queues/processors/email-queue.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '@/modules/email/email.service';
import { LoggerService } from '@/common/logger/logger.service';

@Processor('email')
export class EmailQueueProcessor {
  constructor(
    private emailService: EmailService,
    private logger: LoggerService
  ) {}

  @Process('campaign-email')
  async handleCampaignEmail(job: Job) {
    const { campaignId, recipient, emailData } = job.data;

    try {
      await this.emailService.send({
        to: recipient.email,
        ...emailData,
        // Add tracking pixel
        html: this.addTrackingPixel(emailData.html, campaignId, recipient.id),
      });

      // Update campaign statistics
      await this.updateCampaignStats(campaignId, 'sent');

      this.logger.info('Campaign email sent', {
        campaignId,
        recipient: recipient.email,
      });
    } catch (error) {
      this.logger.error('Campaign email failed', {
        campaignId,
        recipient: recipient.email,
        error: error.message,
      });

      // Update campaign statistics
      await this.updateCampaignStats(campaignId, 'failed');

      throw error; // Will trigger retry
    }
  }

  private addTrackingPixel(html: string, campaignId: string, recipientId: string): string {
    const trackingUrl = `${process.env.APP_URL}/api/campaigns/${campaignId}/track/open/${recipientId}`;
    const trackingPixel = `<img src="${trackingUrl}" width="1" height="1" alt="" />`;
    return html.replace('</body>', `${trackingPixel}</body>`);
  }

  private async updateCampaignStats(campaignId: string, type: 'sent' | 'failed') {
    // Implementation to update campaign statistics
  }
}
```

---

## 8. Integration Patterns

### 8.1 Email Service Integration

**Email Service (SendGrid/AWS SES):**
```typescript
// src/modules/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  constructor(private config: ConfigService) {
    sgMail.setApiKey(this.config.get('SENDGRID_API_KEY'));
  }

  async send(options: {
    to: string | string[];
    from?: string;
    subject: string;
    html: string;
    text?: string;
    attachments?: any[];
  }) {
    const msg = {
      to: options.to,
      from: options.from || this.config.get('DEFAULT_FROM_EMAIL'),
      subject: options.subject,
      html: options.html,
      text: options.text || this.stripHtml(options.html),
      attachments: options.attachments,
    };

    try {
      const result = await sgMail.send(msg);
      return result;
    } catch (error) {
      console.error('Email send error:', error);
      throw error;
    }
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }
}
```

### 8.2 Payment Gateway Integration (Stripe)

```typescript
// src/modules/billing/stripe.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private config: ConfigService) {
    this.stripe = new Stripe(this.config.get('STRIPE_SECRET_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(email: string, name: string) {
    return this.stripe.customers.create({
      email,
      name,
    });
  }

  async createSubscription(customerId: string, priceId: string) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async createPaymentIntent(amount: number, currency: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      customer: customerId,
    });
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.config.get('STRIPE_WEBHOOK_SECRET');
    
    try {
      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object);
          break;
        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdate(event.data.object);
          break;
        // Handle other events
      }

      return