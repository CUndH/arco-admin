// copy to vben-admin

const { toString } = Object.prototype

// 是否为某种类型
export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

// 是否为有效值(非undefined，注意null和NaN也在其中)
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

// 是否为未定义值(仅限于undefined)
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val)
}

// 是否为有效对象
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

export const isArray = (val: any): val is Array<any> => {
  return val && Array.isArray(val)
}

export const isString = (val: unknown): val is string => {
  return is(val, 'String')
}


// 是否为空（包含String，Array，Map，Set）
export const isEmpty = <T = unknown>(val: T): val is T => {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

// 是否为日期
export const isDate = (val: unknown): val is Date => {
  return is(val, 'Date')
}

// 是否为null
export const isNull = (val: unknown): val is null => {
  return val === null
}

// 略有多余的方法，是否为null和未定义
export const isNullAndUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) && isNull(val)
}

// 略有多余的方法，是否为null或未定义
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
  return isUnDef(val) || isNull(val)
}

export const isNumber = (val: unknown): val is number => {
  return is(val, 'Number')
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isBoolean = (val: unknown): val is boolean => {
  return is(val, 'Boolean')
}

export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, 'RegExp')
}

export const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName
}

export const isMap = (val: unknown): val is Map<any, any> => {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isDark = (): boolean => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}
