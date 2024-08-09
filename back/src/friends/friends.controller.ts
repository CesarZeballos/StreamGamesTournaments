import { Body, Controller, Delete, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AddFriendDto } from './friends.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Friends')
@Controller('users')
export class FriendsController {

    constructor(private readonly friendsService: FriendsService) { }

    @Post('add-friend/:id')
    addFriend(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.friendsService.addFriend(id);
    }

    @Post('sendfriend')
    sendFriendRequest(@Body() addFriendDto: AddFriendDto) {
        const { userId, friendId } = addFriendDto;
        return this.friendsService.sendFriendRequest(userId, friendId);
    }

    @Delete('sendfriend/:id')
    rejectFriendRequest(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.friendsService.rejectFriendRequest(id);
    }

    @Delete('remove-friend/:id')
    async removeFriend(@Param('id', new ParseUUIDPipe()) id: string) {

        return await this.friendsService.removeFriend(id);
    }
}
