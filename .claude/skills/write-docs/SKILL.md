---
name: write-docs
description: "Create and maintain project documentation that matches the repository style and architecture. Use this skill for README files, API documentation, setup guides, architecture explanations, developer onboarding, feature documentation, usage examples, changelogs, and technical docs."
---

# Write Docs Skill

## Purpose

This skill creates clear, accurate, and maintainable documentation for a project.

The generated documentation must:
- Match the repository tone and structure
- Reflect the actual implementation
- Stay concise but informative
- Be useful for developers and contributors
- Avoid fake or misleading information

The goal is to produce documentation that feels professionally maintained and immediately usable.

---

# Core Rules

## 1. Analyze Before Writing

Before generating documentation:

Inspect:
- README structure
- Existing docs
- package.json
- Scripts
- Folder structure
- Framework/tooling
- Existing architecture
- Environment variables
- Build/deployment process

Never write generic documentation blindly.

---

# 2. Match Existing Documentation Style

Follow the project's documentation conventions.

Examples:
- Heading structure
- Markdown formatting
- Emoji usage
- Code block style
- Table formatting
- Tone
- Technical depth

If the repository is concise, stay concise.
If the repository is enterprise-style, stay structured and detailed.

---

# 3. Documentation Must Reflect Reality

Only document:
- Existing commands
- Real file paths
- Actual dependencies
- Existing APIs
- Current architecture

Do not invent:
- Fake scripts
- Fake endpoints
- Placeholder features
- Unsupported configs

Accuracy is more important than completeness.

---

# 4. Prioritize Clarity

Documentation should:
- Be scannable
- Use clear sectioning
- Avoid unnecessary jargon
- Include practical examples
- Explain purpose before implementation

Good documentation reduces onboarding friction.

---

# 5. Include Actionable Examples

Whenever possible include:
- Commands
- Usage examples
- API requests
- Response examples
- Configuration examples
- Environment setup examples

Examples should be realistic and executable.

---

# 6. Respect Project Structure

Place documentation correctly.

Examples:

| Documentation Type | Preferred Location |
|---|---|
| Main project guide | README.md |
| API docs | docs/api/ |
| Architecture docs | docs/architecture/ |
| Component docs | component folder |
| Setup guide | docs/setup/ |
| Contribution guide | CONTRIBUTING.md |
| Changelog | CHANGELOG.md |

Follow existing repo organization.

---

# 7. Avoid Over-Documentation

Do not:
- Explain obvious code
- Repeat implementation details unnecessarily
- Create massive unreadable documents
- Add filler sections

Prefer concise high-value explanations.

---

# 8. Keep Docs Developer-Focused

Documentation should help developers:
- Understand the system
- Run the project
- Modify features
- Debug issues
- Contribute safely

Optimize for usability.

---

# Workflow

## Step 1 — Inspect Repository

Identify:
- Framework
- Runtime
- Package manager
- Deployment method
- Scripts
- Architecture style
- Existing documentation style

---

## Step 2 — Determine Documentation Type

Examples:
- README
- API docs
- Setup guide
- Architecture explanation
- Deployment guide
- Feature documentation
- Internal developer docs

Choose structure accordingly.

---

## Step 3 — Gather Real Information

Extract:
- Actual commands
- Existing environment variables
- File structure
- Dependencies
- Routes/endpoints
- Feature behavior

Never guess implementation details.

---

## Step 4 — Generate Documentation

Write:
- Clear headings
- Concise explanations
- Working examples
- Consistent formatting

---

## Step 5 — Validate

Ensure:
- Commands are correct
- Paths exist
- APIs match implementation
- Markdown formatting is valid
- Documentation is readable

---

# README Structure Example

A strong README typically includes:

```md
# Project Name

Short project description.

## Features

- Feature A
- Feature B
- Feature C

## Tech Stack

- Next.js
- TypeScript
- Prisma
- PostgreSQL

## Installation

```bash
npm install