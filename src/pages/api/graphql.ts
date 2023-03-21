import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";

interface Context {
	prisma: PrismaClient;
}

interface UserInput {
	name: string;
	email: string;
}

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
	}

	type Query {
		hello: String
		users: [User]
	}

	input CreateUserInput {
		name: String!
		email: String!
	}

	type Mutation {
		createUser(input: CreateUserInput!): User!
	}
`;

const resolvers = {
	Query: {
		hello: () => "Hello World",
		// get all user from db
		users: async (parent: undefined, args: {}, context: Context) => {
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
	},
};

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: { prisma },
});

const startServer = apolloServer.start();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	res.setHeader(
		"Access-Control-Allow-Origin",
		"https://studio.apollographql.com"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}

	await startServer;
	await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
	api: {
		bodyParser: false,
	},
};
