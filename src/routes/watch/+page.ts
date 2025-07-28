import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  return {
    id: url.searchParams.get("id")
  }
};
