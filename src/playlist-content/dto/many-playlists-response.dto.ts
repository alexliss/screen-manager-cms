import { PlaylistEntity } from "../playlist.entity";
import { PlaylistResponseDto } from "./playlist-response.dto";

export class ManyPlaylistsResponseDto {

    playlists: PlaylistResponseDto[]

    constructor(playlists: PlaylistEntity[]) {
        this.playlists = playlists.map(playlist => {
            return new PlaylistResponseDto(playlist)
        })
    }
}
