/**
 * Wraps a data-fetch call that may throw (most `lib/data/*.ts` functions do,
 * on a real Supabase error) so an optional homepage section can render an
 * empty/coming-soon state and a genuine-error state differently, instead of
 * either crashing the page or treating both cases as identical silence.
 */
export async function safeFetch<T>(
  promise: Promise<T>
): Promise<{ data: T | null; failed: boolean }> {
  try {
    const data = await promise;
    return { data, failed: false };
  } catch {
    return { data: null, failed: true };
  }
}
