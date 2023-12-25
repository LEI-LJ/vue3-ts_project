// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
// import 'vue-router'

// To ensure it is treated as a module, add at least one `export` statement

export declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    title?: string
    // 每个路由都必须声明
  }
}
