import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AddFriendDto } from './friends.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Friends')
@Controller('users')
export class FriendsController {

    constructor(private readonly friendsService: FriendsService) { }

    @Post('add-friend')
    addFriend(@Body() addFriendDto: AddFriendDto) {
        const { userId, friendId } = addFriendDto;
        return this.friendsService.addFriend(userId, friendId);
    }

    @Post('sendfriend')
    sendFriendRequest(@Body() addFriendDto: AddFriendDto) {
        const { userId, friendId } = addFriendDto;
        return this.friendsService.sendFriendRequest(userId, friendId);
    }

    @Delete('sendfriend')
    rejectFriendRequest(@Body() addFriendDto: AddFriendDto) {
        const { userId, friendId } = addFriendDto;
        return this.friendsService.rejectFriendRequest(userId, friendId);
    }

    @Delete('remove-friend/:id')
    async removeFriend(
        @Param('id') id: string,
        @Query('friendId') friendId: string,
    ) {

        await this.friendsService.removeFriend(id, friendId);
    }
}
