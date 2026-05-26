---
name: create-files
description: Create new files that match the existing project architecture, coding style, naming conventions, framework patterns, and folder structure. Use this skill when generating components, APIs, utilities, services, configs, database models, hooks, pages, tests, or documentation inside an existing codebase. Keywords: create file, scaffold, generate component, generate API, project structure, coding conventions, architecture-aware, boilerplate, framework patterns.
---

# Create File Skill

## Purpose

This skill creates new files that fit naturally into an existing project.

The agent must analyze the repository before generating files so the output matches:

- Folder structure
- Naming conventions
- Import style
- Framework architecture
- State management patterns
- Styling conventions
- TypeScript usage
- Testing structure
- Existing abstractions
- Dependency choices
- Code formatting

The generated file should look like it was written by the original project maintainers.

---

# Core Rules

## 1. Analyze Before Creating

Before generating any file:

1. Inspect nearby files
2. Identify framework and architecture
3. Detect naming conventions
4. Detect styling approach
5. Detect import ordering
6. Detect state/data fetching patterns
7. Detect error handling conventions
8. Detect typing strategy
9. Detect testing patterns

Never generate isolated generic boilerplate without project context.

---

# 2. Match Existing Conventions

The generated file MUST follow the project's conventions exactly.

Examples:

| Project Pattern | Follow It |
|---|---|
| `camelCase.ts` | Use camelCase |
| `PascalCase.tsx` | Use PascalCase |
| Uses `axios` | Do not introduce fetch |
| Uses `zod` validation | Continue using zod |
| Uses Tailwind | Do not introduce CSS modules |
| Uses feature folders | Place file correctly |
| Uses Redux Toolkit | Do not introduce Zustand |
| Uses async/await | Keep consistency |
| Uses named exports | Do not switch to default exports |

---

# 3. Respect Architecture

Do not break project boundaries.

Examples:

- UI components should not access database logic directly
- API routes should not contain business logic if services exist
- Repositories/services/controllers should follow existing separation
- Shared utilities belong in existing utility folders
- Domain structure must remain consistent

If the project uses layered architecture, preserve it.

---

# 4. File Placement Rules

Choose the correct location automatically.

Examples:

| File Type | Preferred Location |
|---|---|
| React component | `components/` |
| Page/route | `app/` or `pages/` |
| API handler | `api/` |
| Hook | `hooks/` |
| Utility | `utils/` or `lib/` |
| Service | `services/` |
| Database model | `models/` or `prisma/` |
| Tests | adjacent `__tests__` or matching test structure |

Always inspect similar files before deciding.

---

# 5. Reuse Existing Utilities

Prefer existing helpers and abstractions over introducing new implementations.

Before creating:
- Search for reusable utilities
- Search for shared UI components
- Search for existing hooks/services
- Search for existing types

Avoid duplication.

---

# 6. Generate Production-Ready Code

Generated files must:
- Compile successfully
- Include proper typing
- Handle errors appropriately
- Avoid dead code
- Avoid placeholder TODOs unless requested
- Avoid fake implementations unless explicitly requested

Do not generate incomplete skeletons unless the user asks for scaffolding only.

---

# 7. Preserve Dependency Consistency

Do not introduce new packages unless necessary.

If a dependency is required:
1. Verify no existing alternative exists
2. Explain why it is needed
3. Suggest installation command separately

Prefer current project stack.

---

# 8. Follow Existing Style

Match:
- Indentation
- Quote style
- Semicolon usage
- Import grouping
- File organization
- Component structure
- Comment style

The new file should visually blend into the codebase.

---

# Workflow

## Step 1 — Inspect Repository

Look at:
- package.json
- tsconfig/jsconfig
- eslint/prettier config
- nearby similar files
- folder structure

Identify:
- Framework
- Language
- Styling system
- State management
- Data fetching strategy
- Testing framework

---

## Step 2 — Find Similar Files

Before generating:
- Find the closest matching file
- Mirror its structure
- Reuse patterns

Examples:
- Creating modal → inspect existing modal
- Creating API route → inspect existing API route
- Creating hook → inspect existing hooks

---

## Step 3 — Generate File

Create:
- Correct filename
- Correct location
- Correct imports
- Correct typing
- Correct architecture

---

## Step 4 — Validate

Check:
- Imports resolve correctly
- Naming is consistent
- No unused code
- Matches project standards
- No architecture violations

---

# Examples

---

## Example 1 — React Component

### User Request
Create a user profile card component.

### Agent Should
1. Inspect existing components
2. Detect styling system (Tailwind, CSS modules, styled-components)
3. Detect component patterns
4. Create:`components/user/UserProfileCard.tsx`

### Must Match
- Existing prop typing
- Existing UI primitives
- Existing spacing/style conventions

---

## Example 2 — Express API Route

### User Request
Create endpoint for updating user profile.

### Agent Should
Inspect:
- Existing routes
- Middleware usage
- Validation approach
- Error handling style

Generate:
- Route
- Validation
- Controller/service usage
- Proper HTTP responses

---

## Example 3 — Next.js App Router Page

### User Request
Create dashboard settings page.

### Agent Should
Determine:
- App Router vs Pages Router
- Server vs Client component patterns
- Existing layout structure
- Auth handling

Then generate:
`app/dashboard/settings/page.tsx`

Matching the rest of the application.

---

# Anti-Patterns

Do NOT:
- Invent a new architecture
- Introduce random libraries
- Use generic boilerplate blindly
- Ignore repository conventions
- Create duplicate utilities
- Mix inconsistent patterns
- Generate placeholder-heavy code
- Create files in incorrect folders

---

# Output Expectations

When creating a file:
1. Mention chosen file path
2. Explain detected project conventions briefly
3. Generate complete file contents
4. Mention additional required files if necessary
5. Mention dependency installation only if truly required

---

# High Quality Behavior

A high-quality implementation:
- Feels native to the repository
- Requires minimal editing
- Reuses existing abstractions
- Matches maintainers’ coding style
- Preserves architecture integrity
- Produces immediately usable code

The goal is not merely to generate code, but to extend the project naturally and consistently.