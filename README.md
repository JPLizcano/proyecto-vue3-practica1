# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

**_ Tailwind install _**

1. npm install tailwindcss @tailwindcss/vite --save
2. Add the Tailwind plugin inside your vite.config.js file:
   - import tailwindcss from '@tailwindcss/vite'
   - export default defineConfig({
     plugins: [
     tailwindcss()
     ],
     })
3. Import the tailwind module inside your style.css file:
   - @import "tailwindcss";
