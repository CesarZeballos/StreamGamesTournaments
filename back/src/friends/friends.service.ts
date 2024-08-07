import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class FriendsService {

    constructor(private readonly prisma: PrismaService) { }

    async addFriend(id: string) {

        const friendRequest = await this.prisma.friendRequest.findUnique({ where: { id: id } })


        if (!friendRequest) {
            throw new NotFoundException(
                `Solicitud con id ${friendRequest.id} no encontrada`,
            );
        }

        await this.prisma.$transaction(async (prisma) => {
            await prisma.userFriends.create({
                data: {
                    user: { connect: { id: friendRequest.senderId } },
                    friend: { connect: { id: friendRequest.receiverId } },
                },
            });

            await prisma.userFriends.create({
                data: {
                    user: { connect: { id: friendRequest.receiverId } },
                    friend: { connect: { id: friendRequest.senderId } },
                },
            });

            await this.rejectFriendRequest(id)
        });

        return this.prisma.user.findMany({ where: { id: friendRequest.receiverId } });
    }

    async removeFriend(id: string) {

        try {
            const friend = await this.prisma.user.findUnique({ where: { id } });

            if (!friend) {
                throw new NotFoundException(`Amigo con id: ${friend.id}no encontrado`);
            }

            await this.prisma.userFriends.delete({ where: { id } });

        } catch (error) {
            throw new InternalServerErrorException(
                'Error interno del servidor',
            );
        }
    }

    async sendFriendRequest(userId: string, receiverId: string) {
        if (userId === receiverId) {
            throw new BadRequestException('No se puede enviar solicitud a sí mismo como amigo');
        }

        const [user, receiver] = await this.prisma.$transaction([
            this.prisma.user.findUnique({ where: { id: userId } }),
            this.prisma.user.findUnique({ where: { id: receiverId } }),
        ]);

        if (!user) {
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
        }

        if (!receiver) {
            throw new NotFoundException(`Usuario con id ${receiverId} no encontrado`);
        }

        const existingRequest = await this.prisma.friendRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: receiverId,
            },
        });

        if (existingRequest) {
            throw new ConflictException('Ya has enviado una solicitud de amistad a este usuario');
        }

        const existingFriendship = await this.prisma.userFriends.findFirst({
            where: {
                OR: [
                    { userId, friendId: receiverId },
                    { userId: receiverId, friendId: userId },
                ],
            },
        });

        if (existingFriendship) {
            throw new ConflictException('Ya son amigos');
        }

        const friendRequest = await this.prisma.friendRequest.create({
            data: {
                senderId: userId,
                receiverId: receiverId,
            },
        });

        return friendRequest;
    }

    async rejectFriendRequest(id: string) {
        const friendRequest = await this.prisma.friendRequest.findUnique({
            where: { id },
        });

        if (!friendRequest) {
            throw new NotFoundException(`Solicitud de amistad con id ${id} no encontrada`);
        }

        await this.prisma.friendRequest.delete({
            where: { id },
        });

        return { message: 'Solicitud de amistad rechazada' };
    }
}
