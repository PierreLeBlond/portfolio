import { page } from "$app/stores";
import { derived, writable, type Readable, type Writable } from "svelte/store";

export type Page = {
  objectName: string;
  pathname: string;
  label: string;
  description?: string;
  isExternal: boolean;
  disolve: boolean;
};

export const selectedPage: Writable<Page | null> = writable(null);
export const pointedPage: Writable<Page | null> = writable(null);
export const touchedPage: Writable<Page | null> = writable(null);
export const currentPage: Readable<Page | null> = derived(
  [page],
  ([page]) =>
    page.data.pages.find(
      (pageData: Page) => pageData.pathname === page.url.pathname,
    ) || null,
);
