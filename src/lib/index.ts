export enum ContentType {
  Movie,
  Show,
}
export function ContentTypeText(type: ContentType) {
  return type == ContentType.Movie ? "movie" : "tv"
}

export class Media {
  type: ContentType = 0;
  genres: number[] = [];
  id: number = 0;
  overview: string = "";
  popularity: number = 0;
  poster_path: string = "";
  release_date: Date = new Date();
  name: string = "";
  vote_average: number = 0;
  vote_count: number = 0;

  static from_data(data: any): Media {
    let newMedia = new Media()
    newMedia.genres = data.genre_ids
    newMedia.id = data.id
    newMedia.overview = data.overview
    newMedia.popularity = data.popularity
    newMedia.poster_path = data.poster_path
    newMedia.vote_average = data.vote_average
    newMedia.vote_count = data.vote_count

    newMedia.type = data.name ? ContentType.Show : ContentType.Movie
    newMedia.release_date = new Date(data.release_date ? data.release_date : data.first_air_date)
    newMedia.name = data.name ? data.name : data.title

    return newMedia
  }
}
