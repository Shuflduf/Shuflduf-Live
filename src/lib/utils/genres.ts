export type GenreId =
  | 28
  | 12
  | 16
  | 35
  | 80
  | 99
  | 18
  | 10751
  | 14
  | 36
  | 27
  | 10402
  | 9648
  | 10749
  | 878
  | 10770
  | 53
  | 10752
  | 37;

export type GenreMap = {
  [K in GenreId]: string;
};

export const movieGenres: GenreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};
