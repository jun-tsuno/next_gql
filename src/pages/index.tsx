import styles from "@/styles/Home.module.css";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { User } from "@/types/types";

const GET_USERS = gql`
	query GetUsers {
		users {
			id
			name
			email
		}
	}
`;

// arguments' type: same type as schema type
const CREATE_USER_MUTATION = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			name
			email
		}
	}
`;

const DELETE_USER_MUTATION = gql`
	mutation DeleteUser($id: ID!) {
		deleteUser(id: $id) {
			name
		}
	}
`;

export default function Home() {
	const [inputName, setInputName] = useState<string>("");
	const [inputEmail, setInputEmail] = useState<string>("");

	const { data: allUsersData, loading, error, refetch } = useQuery(GET_USERS);
	const [createUser] = useMutation(CREATE_USER_MUTATION);
	const [deleteUser] = useMutation(DELETE_USER_MUTATION);

	if (loading) return <h2>Loading...</h2>;
	if (error) return <h2>Something Went Wrong!!</h2>;

	const { users } = allUsersData;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (inputName === "" || inputEmail === "")
			return alert("Field Are Required!");

		await createUser({
			variables: { input: { name: inputName, email: inputEmail } },
		});
		refetch();
	};

	const handleDelete = async (id: string) => {
		await deleteUser({
			variables: { id },
		});
		refetch();
	};

	return (
		<>
			<div>
				<h1>All Users</h1>
				<div>
					{users.map((user: User) => {
						return (
							<div key={user.id} className={styles.Card}>
								<p>Name: {user.name}</p>
								<p>e-mail: {user.email}</p>
								<button onClick={() => handleDelete(user.id)}>
									Delete
								</button>
							</div>
						);
					})}
				</div>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Name..."
						value={inputName}
						onChange={(e) => setInputName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Email..."
						value={inputEmail}
						onChange={(e) => setInputEmail(e.target.value)}
					/>
					<button type="submit">Add</button>
				</form>
			</div>
		</>
	);
}
