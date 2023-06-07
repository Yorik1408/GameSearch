export interface GameSearchFormValues {
  readonly name: string;
  readonly releaseYear: [number, number];
  readonly sortBy: string;
  readonly sortDirection: string;
}

export const DEFAULT_FORM_VALUES: GameSearchFormValues = {
  name: '',
  releaseYear: [1970, new Date().getFullYear()],
  sortBy: 'aggregated_rating',
  sortDirection: 'desc',
};
