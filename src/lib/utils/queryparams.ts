import { ReadonlyURLSearchParams } from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function updateQueryParam(
  router: AppRouterInstance,
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string | null
) {
  const params = new URLSearchParams(searchParams.toString());

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  router.push(`?${params.toString()}`, { scroll: false });
}
