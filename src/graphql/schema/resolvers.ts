import { Context, UserInput } from "@/types/types";

const resolvers = {
	Query: {
		users: async (parent: undefined, args: {}, context: Context) => {
			// user: User model
			return await context.prisma.user.findMany();
		},
	},
	Mutation: {
		createUser: async (
			parent: undefined,
			args: { input: UserInput },
			context: Context
		) => {
			const { name, email } = args.input;
			const newUser = await context.prisma.user.create({
				data: {
					name,
					email,
				},
			});
			return newUser;
		},
		deleteUser: async (
			parent: undefined,
			args: { id: string },
			context: Context
		) => {
			const id = +args.id;
			await context.prisma.user.delete({
				where: {
					id,
				},
			});
			return null;
		},
	},
};

export default resolvers;
