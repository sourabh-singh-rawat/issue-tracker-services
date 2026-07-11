/**
 * Compatibility export for older imports.
 * Prefer StatusesContext going forward — this is not a domain "Space".
 */
export {
  StatusesContext as SpaceContext,
  StatusesContext,
  type StatusesContextValue,
} from "../StatusesContext/StatusesContext";
