export function loadComponent(component) {
  return () => import( /* webpackChunkName: "component-[request]" */ `@/components/${component}.vue`)
}

export function loadView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
