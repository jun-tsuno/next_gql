import { ApolloServer, gql } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";

const usersData = [
	{ id: "1", name: "John Doe", email: "Hoge@gmail.com" },
	{ id: "2", name: "Mary Doe", email: "Mary@gmail.com" },
];

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
`;

const resolvers = {
	Query: {
		hello: () => "Hello World",
		users: () => usersData,
	},
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

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
