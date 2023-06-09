import { gql } from "apollo-server-micro";

const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		email: String!
	}

	type Query {
		users: [User]
	}

	input CreateUserInput {
		name: String!
		email: String!
	}

	type Mutation {
		createUser(input: CreateUserInput!): User!
		deleteUser(id: ID!): User
	}
`;

export default typeDefs;
