import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: import.meta.env.VITE_GRAPHQL_API_URL,
        credentials: "include",
    }),
    cache: new InMemoryCache(),
});

export default apolloClient;