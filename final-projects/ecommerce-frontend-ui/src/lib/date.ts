export function parseDate(value: string | number | Date): Date {
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
}

export function formatDateTime(value: string | number | Date): string {
  return parseDate(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(value: string | number | Date): string {
  return parseDate(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatFullDate(value: string | number | Date): string {
  return parseDate(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
