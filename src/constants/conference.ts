// The single conference record's ID in production. There is currently
// exactly one row in the `conferences` table, so this is hardcoded rather
// than looked up. If a second conference is ever introduced, this constant
// (and every import of it) needs to be replaced with a real lookup.
export const CONFERENCE_ID = "540c9aa6-9af7-457e-a762-1c4824710a08";

// The official full conference name, as specified throughout the project
// brief. Hardcoded rather than read from `conferences.tagline`, because the
// stored tagline value differs slightly ("Conference of..." vs the correct
// "Conference on...") — this constant is the single correct source, used
// by both the navbar and the footer so they can never disagree with each
// other or silently pick up the DB typo. If the official name changes,
// update it here once.
export const FULL_CONFERENCE_NAME =
  "International Conference on Computational Intelligence for Modern Engineering Systems & Societal Applications";

