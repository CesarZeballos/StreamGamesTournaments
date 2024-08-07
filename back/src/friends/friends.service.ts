import { BadRequestException, ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class FriendsService {

    constructor(private readonly prisma: PrismaService) { }

    async addFriend(userId: string, friendId: string): Promise<User[]> {
        if (userId === friendId) {
            throw new BadRequestException(
                'No se puede agregar a sí mismo como amigo',
            );
        }

        const [user, friend] = await this.prisma.$transaction([
            this.prisma.user.findUnique({ where: { id: userId } }),
            this.prisma.user.findUnique({ where: { id: friendId } }),
        ]);

        if (!user) {
            throw new NotFoundException(
                `Usuario con id ${userId} no encontrado`,
            );
        }

        if (!friend) {
            throw new NotFoundException(
                `Usuario amigo con id ${friendId} no encontrado`,
            );
        }

        const existingFriendship = await this.prisma.userFriends.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });

        if (existingFriendship) {
            throw new ConflictException('Ya son amigos');
        }

        await this.prisma.$transaction(async (prisma) => {
            await prisma.friendRequest.create({
                data: {
                    sender: { connect: { id: userId } },
                    receiver: { connect: { id: friendId } },
                },
            });

            await prisma.friendRequest.create({
                data: {
                    sender: { connect: { id: friendId } },
                    receiver: { connect: { id: userId } },
                },
            });
        });

        return this.prisma.user.findMany({
            where: {
                OR: [{ id: userId }, { id: friendId }],
            },
            include: {
                receivedFriendRequests: true,
                sentFriendRequests: true
            },
        });
    }

    async removeFriend(id: string, friendId: string): Promise<void> {
        if (id === friendId) {
            throw new BadRequestException(
                'No se puede eliminar a sí mismo como amigo',
            );
        }

        try {
            const user = await this.prisma.user.findUnique({ where: { id } });
            const friend = await this.prisma.user.findUnique({
                where: { id: friendId },
            });

            if (!user || !friend) {
                throw new NotFoundException('Usuario o amigo no encontrado');
            }

            await this.prisma.$transaction(async (prisma) => {
                await prisma.userFriends.deleteMany({
                    where: {
                        userId: id,
                        friendId: friendId,
                    },
                });

                await prisma.userFriends.deleteMany({
                    where: {
                        userId: friendId,
                        friendId: id,
                    },
                });
            });
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

    async rejectFriendRequest(userId: string, requestId: string) {
        const friendRequest = await this.prisma.friendRequest.findUnique({
            where: { id: requestId },
        });

        if (!friendRequest) {
            throw new NotFoundException(`Solicitud de amistad con id ${requestId} no encontrada`);
        }

        if (friendRequest.receiverId !== userId) {
            throw new ForbiddenException('No tienes permiso para rechazar esta solicitud de amistad');
        }

        await this.prisma.friendRequest.delete({
            where: { id: requestId },
        });

        return { message: 'Solicitud de amistad rechazada' };
    }
}
