# || (OR) vs ?? (nullish coalescing)

## || triggers on ANY falsy value
```typescript
false || "default"     // "default"
0 || "default"         // "default"
"" || "default"        // "default"
null || "default"      // "default"
undefined || "default" // "default"
```

## ?? only triggers on null/undefined
```typescript
false ?? "default"     // false
0 ?? "default"         // 0
"" ?? "default"        // ""
null ?? "default"      // "default"
undefined ?? "default" // "default"
```

## Real-world example
```typescript
const count = 0;
const name = "";

count || "unknown"     // "unknown" (0 is falsy)
count ?? "unknown"     // 0 (0 is not nullish)

name || "anonymous"    // "anonymous" ("" is falsy)
name ?? "anonymous"    // "" ("" is not nullish)
```

**Use `||` when you want fallback for any falsy value**
**Use `??` when you only want fallback for null/undefined**