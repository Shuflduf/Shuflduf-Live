export enum ContentType {
  Movie,
  Show,
}
export function ContentTypeText(type: ContentType) {
  return type == ContentType.Movie ? "movie" : "tv";
}

export class Media {
  type: ContentType = 0;
  genres: number[] = [];
  id: number = 0;
  overview: string = "";
  popularity: number = 0;
  posterPath: string = "";
  releaseDate: Date = new Date();
  name: string = "";
  voteAverage: number = 0;
  voteCount: number = 0;

  static fromData(data: any): Media {
    let newMedia = new Media();
    newMedia.id = data.id;
    newMedia.overview = data.overview;
    newMedia.popularity = data.popularity;
    newMedia.posterPath = data.poster_path;
    newMedia.voteAverage = data.vote_average;
    newMedia.voteCount = data.vote_count;

    newMedia.type = data.name ? ContentType.Show : ContentType.Movie;
    newMedia.releaseDate = new Date(
      data.release_date ? data.release_date : data.first_air_date,
    );
    newMedia.name = data.name ? data.name : data.title;
    newMedia.genres = data.genre_ids ? data.genre_ids : data.genres.map((g: any) => g.id);

    return newMedia;
  }

  static fromEpisode(data: any): Media {
    let newMedia = new Media();

    newMedia.name = data.name
    newMedia.overview = data.overview
    newMedia.posterPath = data.still_path
    newMedia.voteAverage = data.vote_average
    newMedia.voteCount = data.vote_count

    return newMedia
  }
}


export class Review {
  username: string = "";
  avatarPath: string = "";
  rating: number = 0;
  content: string = "";
  createdAt: Date = new Date();
  link: string = ""

  static fromData(data: any): Review {
    let newReview = new Review();

    newReview.username = data.author_details.username
    newReview.avatarPath = data.author_details.avatar_path
    newReview.rating = data.author_details.rating
    newReview.content = data.content
    newReview.createdAt = new Date(data.created_at)
    newReview.link = data.url

    return newReview
  }
}

export function tmdbUrlConstructor(path: string, flags: any): string {
  const BASE_URL = "https://api.themoviedb.org/3"
  const tmdb_url = `${BASE_URL}${path}${Object.keys(flags).length ? "?" : ""}${new URLSearchParams(flags)}`
  console.log(tmdb_url);

  return tmdb_url
}
