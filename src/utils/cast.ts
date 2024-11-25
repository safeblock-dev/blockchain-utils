export default function cast<T>(value: any): T {
  return value as any as T
}
