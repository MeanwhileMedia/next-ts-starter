export interface AllUsersIdsTypes {
  user_ids: number[];
}

export interface UserInfoTypes {
  id: number,
  first_name: string,
  last_name: string,
  image: string,
  invert: boolean,
  stats: {
    total_sessions_played: integer
    current_streak_in_days: integer,
    skills: {
      [skillName: string]: {
        current: number;
        level: string;
        max: number;
      }
    }
  }
}