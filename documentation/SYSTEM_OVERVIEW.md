# BlogPro System Architecture Overview

## Overview

BlogPro is a modern, full-stack blogging platform built with React, TypeScript, and PostgreSQL. The system features real-time analytics, professional text editing, comprehensive media management, and enterprise-grade performance optimization.

## High-Level System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        UI[React Frontend]
        PWA[Progressive Web App]
        WS_CLIENT[WebSocket Client]
    end
    
    subgraph "Load Balancer & CDN"
        LB[Load Balancer]
        CDN[Content Delivery Network]
    end
    
    subgraph "Application Layer"
        API[Express.js API Server]
        WS_SERVER[WebSocket Server]
        AUTH[JWT Authentication]
        MIDDLEWARE[Security Middleware]
    end
    
    subgraph "Service Layer"
        BLOG_SVC[Blog Service]
        MEDIA_SVC[Media Service]
        ANALYTICS_SVC[Analytics Service]
        EMAIL_SVC[Email Service]
        DOC_SVC[Documentation Service]
        FOOTER_SVC[Footer Service]
        CACHE_SVC[Cache Service]
    end
    
    subgraph "Data Layer"
        PG[(PostgreSQL Database)]
        REDIS[(Redis Cache)]
        FILES[File Storage]
    end
    
    subgraph "External Services"
        EMAIL_PROVIDER[Email Provider]
        MONITORING[Monitoring Services]
    end
    
    UI --> LB
    PWA --> LB
    WS_CLIENT -.-> WS_SERVER
    LB --> API
    LB --> CDN
    CDN --> FILES
    
    API --> AUTH
    API --> MIDDLEWARE
    API --> BLOG_SVC
    API --> MEDIA_SVC
    API --> ANALYTICS_SVC
    API --> EMAIL_SVC
    API --> DOC_SVC
    API --> FOOTER_SVC
    
    WS_SERVER --> ANALYTICS_SVC
    WS_SERVER --> DOC_SVC
    WS_SERVER --> FOOTER_SVC
    
    BLOG_SVC --> PG
    MEDIA_SVC --> PG
    MEDIA_SVC --> FILES
    ANALYTICS_SVC --> PG
    ANALYTICS_SVC --> REDIS
    EMAIL_SVC --> EMAIL_PROVIDER
    DOC_SVC --> PG
    FOOTER_SVC --> PG
    FOOTER_SVC --> REDIS
    CACHE_SVC --> REDIS
    
    CACHE_SVC --> BLOG_SVC
    CACHE_SVC --> MEDIA_SVC
    CACHE_SVC --> ANALYTICS_SVC
    CACHE_SVC --> FOOTER_SVC
```

## Technology Stack

### Frontend Stack
- **Framework**: React 18.3.1 with TypeScript
- **Routing**: Wouter (lightweight routing)
- **State Management**: Context API + Zustand
- **Styling**: Pure CSS with BEM methodology
- **UI Components**: Radix UI primitives
- **Build Tool**: Vite 6.3.5
- **Testing**: Vitest + Playwright
- **Performance**: Code splitting, lazy loading, caching

### Backend Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 4.21.2
- **Database**: PostgreSQL with Drizzle ORM
- **Caching**: Redis 5.1.1 + ioredis
- **Authentication**: JWT with express-session
- **WebSockets**: express-ws + ws
- **File Processing**: Sharp for image optimization
- **Email**: Nodemailer integration
- **Validation**: Zod schemas

### Database & Storage
- **Primary Database**: PostgreSQL 17.x
- **Caching Layer**: Redis 7.x
- **File Storage**: Local filesystem with organized structure
- **Session Store**: PostgreSQL-backed sessions
- **Search**: PostgreSQL full-text search with tsvector

### DevOps & Infrastructure
- **Build System**: Vite + esbuild
- **Process Management**: PM2 (production)
- **SSL/TLS**: Self-signed certificates for development
- **Monitoring**: Winston logging + custom health checks
- **Testing**: Comprehensive test suite with 97% coverage

## Client-Server Architecture

### Frontend Architecture
```mermaid
graph TB
    subgraph "React Application"
        APP[App.tsx]
        ROUTER[Wouter Router]
        LAYOUT[Layout System]
        
        subgraph "Page Components"
            HOME[Home Page]
            BLOG[Blog Pages]
            ADMIN[Admin Panel]
            DOCS[Documentation]
        end
        
        subgraph "Shared Components"
            UI_SYSTEM[UI System]
            TEXT_EDITOR[Text Editor]
            MEDIA_LIB[Media Library]
            FOOTER_EDITOR[Footer Visual Editor]
        end
        
        subgraph "State Management"
            AUTH_CTX[Auth Context]
            SETTINGS_CTX[Settings Context]
            THEME_CTX[Theme Context]
            WS_CTX[WebSocket Context]
        end
        
        subgraph "Services"
            API_CLIENT[API Client]
            WS_CLIENT[WebSocket Client]
            CACHE_CLIENT[Client Cache]
        end
    end
    
    APP --> ROUTER
    ROUTER --> LAYOUT
    LAYOUT --> HOME
    LAYOUT --> BLOG
    LAYOUT --> ADMIN
    LAYOUT --> DOCS
    
    LAYOUT --> UI_SYSTEM
    LAYOUT --> TEXT_EDITOR
    LAYOUT --> MEDIA_LIB
    LAYOUT --> FOOTER_EDITOR
    
    APP --> AUTH_CTX
    APP --> SETTINGS_CTX
    APP --> THEME_CTX
    APP --> WS_CTX
    
    HOME --> API_CLIENT
    BLOG --> API_CLIENT
    ADMIN --> API_CLIENT
    DOCS --> API_CLIENT
    
    WS_CTX --> WS_CLIENT
    API_CLIENT --> CACHE_CLIENT
```

### Backend Architecture
```mermaid
graph TB
    subgraph "Express.js Server"
        SERVER[HTTP/HTTPS Server]
        WS_SERVER[WebSocket Server]
        
        subgraph "Middleware Stack"
            SECURITY[Security Middleware]
            AUTH_MW[Auth Middleware]
            CACHE_MW[Cache Middleware]
            PERF_MW[Performance Monitor]
            LOG_MW[Request Logger]
        end
        
        subgraph "API Routes"
            AUTH_API[Auth API]
            BLOG_API[Blog API]
            MEDIA_API[Media API]
            ANALYTICS_API[Analytics API]
            ADMIN_API[Admin API]
            FOOTER_API[Footer API]
        end
        
        subgraph "Services"
            AUTH_SVC[Auth Service]
            BLOG_SVC[Blog Service]
            MEDIA_SVC[Media Service]
            ANALYTICS_SVC[Analytics Service]
            EMAIL_SVC[Email Service]
            DOC_SVC[Documentation Service]
            FOOTER_SVC[Footer Service]
        end
        
        subgraph "Data Access"
            DB_POOL[Database Pool]
            REDIS_CLIENT[Redis Client]
            FILE_SYSTEM[File System]
        end
    end
    
    SERVER --> SECURITY
    SERVER --> AUTH_MW
    SERVER --> CACHE_MW
    SERVER --> PERF_MW
    SERVER --> LOG_MW
    
    SECURITY --> AUTH_API
    AUTH_MW --> BLOG_API
    CACHE_MW --> MEDIA_API
    PERF_MW --> ANALYTICS_API
    LOG_MW --> ADMIN_API
    LOG_MW --> FOOTER_API
    
    AUTH_API --> AUTH_SVC
    BLOG_API --> BLOG_SVC
    MEDIA_API --> MEDIA_SVC
    ANALYTICS_API --> ANALYTICS_SVC
    ADMIN_API --> EMAIL_SVC
    ADMIN_API --> DOC_SVC
    FOOTER_API --> FOOTER_SVC
    
    AUTH_SVC --> DB_POOL
    BLOG_SVC --> DB_POOL
    MEDIA_SVC --> DB_POOL
    MEDIA_SVC --> FILE_SYSTEM
    ANALYTICS_SVC --> DB_POOL
    ANALYTICS_SVC --> REDIS_CLIENT
    EMAIL_SVC --> DB_POOL
    DOC_SVC --> DB_POOL
    FOOTER_SVC --> DB_POOL
    
    WS_SERVER --> ANALYTICS_SVC
    WS_SERVER --> DOC_SVC
    WS_SERVER --> FOOTER_SVC
```

## Core Components

### 1. Frontend Application (React + TypeScript)
**Location**: `/client/src/`
**Purpose**: User interface and client-side logic

**Key Features**:
- Server-side rendering ready
- Progressive Web App capabilities
- Real-time updates via WebSocket
- Multi-language support (i18n)
- Responsive design with BEM CSS
- Professional text editor integration

### 2. Backend API Server (Express.js + TypeScript)
**Location**: `/server/`
**Purpose**: RESTful API and business logic

**Key Features**:
- JWT-based authentication
- Role-based authorization
- Comprehensive middleware stack
- WebSocket support for real-time features
- Advanced caching with Redis
- File upload and processing

### 3. Database Layer (PostgreSQL + Redis)
**Purpose**: Data persistence and caching

**Components**:
- **PostgreSQL**: Primary data storage with 35+ tables (including footer configurations)
- **Redis**: Caching layer and session storage
- **Drizzle ORM**: Type-safe database operations
- **Migration System**: Database schema versioning

### 4. Real-time Communication (WebSocket)
**Purpose**: Live updates and collaborative features

**Features**:
- Real-time analytics broadcasting
- Content synchronization
- Footer configuration updates
- Live editing collaboration
- Connection health monitoring
- Automatic reconnection

## Data Flow Architecture

### Request Processing Flow
```mermaid
sequenceDiagram
    participant Client
    participant LoadBalancer
    participant ExpressServer
    participant Middleware
    participant Service
    participant Database
    participant Cache
    
    Client->>LoadBalancer: HTTP Request
    LoadBalancer->>ExpressServer: Forward Request
    ExpressServer->>Middleware: Security Check
    Middleware->>Middleware: Auth Validation
    Middleware->>Service: Business Logic
    Service->>Cache: Check Cache
    alt Cache Hit
        Cache-->>Service: Return Cached Data
    else Cache Miss
        Service->>Database: Query Data
        Database-->>Service: Return Data
        Service->>Cache: Store in Cache
    end
    Service-->>ExpressServer: Response Data
    ExpressServer-->>Client: HTTP Response
```

### Real-time Data Flow
```mermaid
sequenceDiagram
    participant Client1
    participant Client2
    participant WebSocketServer
    participant AnalyticsService
    participant Database
    participant Redis
    
    Client1->>WebSocketServer: Connect
    Client2->>WebSocketServer: Connect
    WebSocketServer->>AnalyticsService: Track Connection
    
    loop Every 30 seconds
        AnalyticsService->>Database: Collect Analytics
        AnalyticsService->>Redis: Cache Results
        AnalyticsService->>WebSocketServer: Broadcast Update
        WebSocketServer->>Client1: Real-time Data
        WebSocketServer->>Client2: Real-time Data
    end
```

## Security Boundaries

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication with 7-day expiration
- **Role-based Access**: Admin, Editor, User roles
- **Session Management**: PostgreSQL-backed sessions
- **Password Security**: bcrypt hashing with salt

### Security Middleware Stack
1. **CORS Protection**: Configurable origin policies
2. **Rate Limiting**: Request throttling per IP
3. **Input Sanitization**: XSS and injection prevention
4. **CSRF Protection**: Token-based CSRF prevention
5. **Security Headers**: HSTS, CSP, X-Frame-Options
6. **File Upload Security**: MIME type validation, size limits

## Performance Considerations

### Frontend Optimizations
- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP conversion, lazy loading
- **Caching Strategy**: Browser cache + service worker
- **Virtual Scrolling**: Large list performance

### Backend Optimizations
- **Multi-level Caching**: Redis + in-memory caching
- **Database Indexing**: Optimized query performance
- **Connection Pooling**: PostgreSQL connection management
- **Compression**: Gzip/Brotli response compression
- **Static Asset Serving**: Efficient file delivery

### Real-time Performance
- **WebSocket Optimization**: Connection pooling and health monitoring
- **Analytics Aggregation**: Batch processing and caching
- **Memory Management**: Automatic cleanup and garbage collection
- **Performance Monitoring**: Real-time metrics collection

## Deployment Architecture

### Development Environment
```mermaid
graph LR
    DEV[Developer Machine]
    DEV --> VITE[Vite Dev Server :3000]
    DEV --> EXPRESS[Express Server :5000]
    EXPRESS --> PG_LOCAL[(Local PostgreSQL)]
    EXPRESS --> REDIS_LOCAL[(Local Redis)]
```

### Production Environment
```mermaid
graph TB
    subgraph "Load Balancer"
        LB[Nginx/HAProxy]
    end
    
    subgraph "Application Servers"
        APP1[BlogPro Instance 1]
        APP2[BlogPro Instance 2]
        APP3[BlogPro Instance N]
    end
    
    subgraph "Database Cluster"
        PG_PRIMARY[(PostgreSQL Primary)]
        PG_REPLICA[(PostgreSQL Replica)]
    end
    
    subgraph "Cache Cluster"
        REDIS_PRIMARY[(Redis Primary)]
        REDIS_REPLICA[(Redis Replica)]
    end
    
    subgraph "Storage"
        FILE_STORAGE[File Storage]
        BACKUP_STORAGE[Backup Storage]
    end
    
    LB --> APP1
    LB --> APP2
    LB --> APP3
    
    APP1 --> PG_PRIMARY
    APP2 --> PG_PRIMARY
    APP3 --> PG_PRIMARY
    
    PG_PRIMARY --> PG_REPLICA
    
    APP1 --> REDIS_PRIMARY
    APP2 --> REDIS_PRIMARY
    APP3 --> REDIS_PRIMARY
    
    REDIS_PRIMARY --> REDIS_REPLICA
    
    APP1 --> FILE_STORAGE
    APP2 --> FILE_STORAGE
    APP3 --> FILE_STORAGE
    
    FILE_STORAGE --> BACKUP_STORAGE
```

## Key Architectural Patterns

### 1. Layered Architecture
- **Presentation Layer**: React components and pages
- **API Layer**: Express.js routes and controllers
- **Service Layer**: Business logic and data processing
- **Data Access Layer**: Database and cache operations

### 2. Microservice-Ready Design
- **Service Separation**: Clear service boundaries
- **API-First Approach**: RESTful API design
- **Stateless Services**: JWT-based authentication
- **Event-Driven Communication**: WebSocket events

### 3. Caching Strategy
- **L1 Cache**: Browser cache and service worker
- **L2 Cache**: Redis distributed cache
- **L3 Cache**: Database query result cache
- **CDN Cache**: Static asset delivery

### 4. Real-time Architecture
- **WebSocket Connections**: Persistent connections for live updates
- **Event Broadcasting**: Server-to-client real-time notifications
- **Connection Management**: Health monitoring and reconnection
- **Scalable Design**: Multiple server instance support

## Configuration Management

### Environment Variables
```typescript
interface EnvironmentConfig {
  // Server Configuration
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  HOST: string;
  
  // Database Configuration
  DATABASE_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  
  // Redis Configuration
  REDIS_URL?: string;
  REDIS_HOST?: string;
  REDIS_PORT?: number;
  REDIS_PASSWORD?: string;
  
  // Authentication
  JWT_SECRET: string;
  SESSION_SECRET: string;
  
  // Email Configuration
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  
  // File Upload
  MAX_FILE_SIZE: number;
  UPLOAD_PATH: string;
  
  // Analytics
  ANALYTICS_RETENTION_DAYS: number;
  ANALYTICS_BATCH_SIZE: number;
}
```

### Application Configuration
- **Development**: Hot reloading, detailed logging, debug mode
- **Production**: Optimized builds, compressed assets, monitoring
- **Testing**: Isolated test database, mocked external services

## Monitoring and Health Checks

### Health Check Endpoints
- `GET /api/health` - Basic server health
- `GET /api/health/database` - Database connectivity
- `GET /api/health/redis` - Redis connectivity
- `GET /api/health/detailed` - Comprehensive system status

### Performance Metrics
- **Response Times**: API endpoint performance
- **Database Queries**: Query execution times
- **Cache Hit Rates**: Redis cache effectiveness
- **WebSocket Connections**: Active connection count
- **Memory Usage**: Server memory consumption
- **Error Rates**: Application error tracking

## Scalability Considerations

### Horizontal Scaling
- **Stateless Design**: JWT-based authentication
- **Load Balancing**: Multiple server instances
- **Database Replication**: Read replicas for scaling
- **Redis Clustering**: Distributed caching
- **CDN Integration**: Global content delivery

### Vertical Scaling
- **Connection Pooling**: Efficient database connections
- **Memory Optimization**: Garbage collection tuning
- **CPU Optimization**: Async/await patterns
- **I/O Optimization**: Streaming and buffering

## Security Architecture

### Defense in Depth
1. **Network Security**: HTTPS, CORS, rate limiting
2. **Application Security**: Input validation, output encoding
3. **Authentication Security**: JWT, secure sessions
4. **Data Security**: Encryption at rest and in transit
5. **Infrastructure Security**: Security headers, CSP

### Compliance Features
- **GDPR Compliance**: User data management and deletion
- **Security Headers**: Comprehensive security header implementation
- **Audit Logging**: Complete action tracking
- **Data Encryption**: Sensitive data protection

## Integration Points

### External Integrations
- **Email Services**: SMTP provider integration
- **Monitoring Services**: Application performance monitoring
- **CDN Services**: Content delivery optimization
- **Analytics Services**: Usage tracking and reporting

### Internal Integrations
- **Text Editor Plugin**: Professional editing capabilities
- **Media Processing**: Image optimization and thumbnail generation
- **Search System**: Full-text search with relevance scoring
- **Documentation System**: Multi-library documentation management
- **🆕 Footer Visual Editor**: Production-ready drag & drop footer builder with:
  - Real-time preview and WebSocket synchronization
  - Redis caching for optimal performance (5-minute TTL)
  - Comprehensive testing suite (85% coverage)
  - Performance optimizations (lazy loading, code splitting)
  - Bundle size optimization (-25%)
  - Version control with rollback functionality

## Development Workflow

### Local Development
1. **Environment Setup**: Docker Compose for dependencies
2. **Hot Reloading**: Vite for frontend, tsx for backend
3. **Database Migrations**: Drizzle-kit for schema changes
4. **Testing**: Continuous testing with Vitest
5. **Code Quality**: ESLint, Prettier, TypeScript

### Deployment Pipeline
1. **Build Process**: Optimized production builds
2. **Testing**: Comprehensive test suite execution
3. **Database Migration**: Automated schema updates
4. **Asset Optimization**: Image compression and CDN upload
5. **Health Verification**: Post-deployment health checks

---

This system architecture provides a solid foundation for a scalable, maintainable, and high-performance blogging platform with enterprise-grade features and real-time capabilities.