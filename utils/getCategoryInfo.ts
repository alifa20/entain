import { CATEGORY_IDS } from "@/types/races";

interface CategoryInfo {
  name: string;
  color: string;
}

export function getCategoryInfo(categoryId: string): CategoryInfo {
  switch (categoryId) {
    case CATEGORY_IDS.HORSE_RACING:
      return {
        name: "Horse Racing",
        color: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      };
    case CATEGORY_IDS.GREYHOUND:
      return {
        name: "Greyhound",
        color: "bg-green-500/10 text-green-400 border-green-500/30",
      };
    case CATEGORY_IDS.HARNESS:
      return {
        name: "Harness",
        color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      };
    default:
      return {
        name: "Racing",
        color: "bg-gray-500/10 text-gray-400 border-gray-500/30",
      };
  }
}
