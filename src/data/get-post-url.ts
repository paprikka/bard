import type { EditorialTeamMember } from './editorial-team';

export const getSongURL = (dayID: string, author: EditorialTeamMember) => `/${dayID}/${author.id}`;
