declare module 'vite' {
  export function mergeConfig(
    defaults: Record<string, any>,
    overrides: Record<string, any>,
    isRoot?: boolean
  ): Record<string, any>;
  
  export * from 'vite';
}
