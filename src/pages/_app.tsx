import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// uri: graphql's endpoint
const client = new ApolloClient({
	uri: "http://localhost:3000/api/graphql",
	cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
