# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production application
- `pnpm lint` - Run ESLint checks
- `pnpm tsc` - Type check without emitting files
- `pnpm tsc:watch` - Type check in watch mode

## Architecture Overview

This is a Next.js 15 component kit showcasing various UI components built with shadcn/ui and Tailwind CSS. The project structure follows a component showcase pattern:

### Core Structure
- **App Router**: Uses Next.js App Router with each component having its own route
- **Component Pattern**: Each showcase page has a dedicated folder with:
  - `page.tsx` - Next.js page wrapper
  - `ComponentName.tsx` - Main component implementation
  - `styles/index.css` - Component-specific styles

### UI System
- **shadcn/ui**: Complete UI component library in `src/components/ui/`
- **Tailwind CSS**: Utility-first styling with custom configuration
- **Design System**: Uses "new-york" style variant with neutral base colors
- **Path Aliases**: `@/` maps to `src/`, with specific aliases for components, utils, ui, lib, and hooks

### Component Categories
Current component categories include:
- **Hero Sections**: Various landing page hero components
- **Authentication**: Login, signup, password reset, and email confirmation forms
- **Testimonials**: Horizontal scrollable and slider testimonial components

### Styling Approach
- Each component page imports component-specific CSS from `styles/index.css`
- Global styles in `src/app/globals.css`
- Utility function `cn()` in `src/lib/utils.ts` for conditional class merging
- Uses CSS variables for theming support

### Navigation
The main page (`src/app/page.tsx`) serves as a navigation hub listing all available component demos.

## Package Manager
This project uses pnpm as specified in the package.json packageManager field.