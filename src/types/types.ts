import { PrismaClient } from "@prisma/client";

export interface Context {
	prisma: PrismaClient;
}

export interface UserInput {
	name: string;
	email: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
}
