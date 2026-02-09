export interface BaseBankProps {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
  genre_ids?: number[];
}

export interface BankDetailsProps extends BaseBankProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
}

export interface BankImage {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface BankPageProps {
  bank: BankDetailsProps;
  images: BankImage[];
}

export interface BasebankListProps {
  banks: BaseBankProps[];
  action: (m: BaseBankProps) => React.ReactNode;
}

export type FilterOption = "title" | "genre";

export interface Review {
  id: string;
  content: string
  author: string
}

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface DiscoverBanks {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseBankProps[];
}

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  bankId: number,
}

export interface DiscoverShows {
  page: number;
  total_pages: number;
  total_results: number;
  results: BaseBankProps[];
}








