# Contributor Guide

This is a next.js component library based on TailwindCSS,Framer motion, ShadcnUI and Typescript.

## Dev Environment Tips
- Run pnpm tsc:watch to watch for TypeScript errors.

## Development Instructions
- Run pnpm dev to start the development server.
- Every pro-component should be created like this
    - Create a new <component-folder> folder in the app folder so that this component has a route. Choose a descriptive name like `hero-section-1`
    - Create a page.tsx file in this folder.
    - Create all the necessary components in the <component-folder> in a flat hierarcy. 
    - Create a styles folder in this folder.
    - Use framer motion to add polish to the component.
    - Use tailwindcss, typescript. 
    - Use components/ui for shadcnui tailwindcss components.    
    

## Testing Instructions
- After any code additions, updations or deletions, run pnpm tsc to be sure TypeScript rules still pass.

## PR instructions
Title format: [<project_name>] <Title>