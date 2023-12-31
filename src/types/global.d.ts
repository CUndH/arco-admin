declare type Recordable<T = any, K = string> = Record<K extends null | undefined ? string : K, T>

declare type Nullable<T> = T | null
