import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { PlaylistEntity } from "../entity/playlist.entity";
import { PlaylistResponseDto } from "./playlist-response.dto";

export class ManyPlaylistsResponseDto {

    @ApiProperty({ type: () => [PlaylistResponseDto]})
    playlists: PlaylistResponseDto[]

    constructor(playlists: PlaylistEntity[]) {
        this.playlists = playlists.map(playlist => {
            return new PlaylistResponseDto(playlist)
        })
    }
}
