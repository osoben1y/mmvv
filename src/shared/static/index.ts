export interface IPeriod {
  value: number;
  lte: string;
  gte: string;
  label: string;
}

export const Period: IPeriod[] = [
  { value: 1, lte: "01-01-1950", gte: "01-01-1940", label: "1940s" },
  { value: 2, lte: "01-01-1960", gte: "01-01-1950", label: "1950s" },
  { value: 3, lte: "01-01-1970", gte: "01-01-1960", label: "1960s" },
  { value: 4, lte: "01-01-1980", gte: "01-01-1970", label: "1970s" },
  { value: 5, lte: "01-01-1990", gte: "01-01-1980", label: "1980s" },
  { value: 6, lte: "01-01-2000", gte: "01-01-1990", label: "1990s" },
  { value: 7, lte: "01-01-2010", gte: "01-01-2000", label: "2000s" },
  { value: 8, lte: "01-01-2020", gte: "01-01-2010", label: "2010s" },
  { value: 9, lte: "01-01-2025", gte: "01-01-2020", label: "2020s" },
];
