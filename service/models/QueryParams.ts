export interface ISearchParams {
  lat: number;
  lng: number;
  radius: number;
  max_persons: number;
  min_persons: number;
  [key: string]: number;
}
