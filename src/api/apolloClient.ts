import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { fromPromise } from "@apollo/client/link/utils";
import axiosClient from "./axiosClient";

let isRefreshing = false;
let pendingRequests: Array<() => void> = [];

const addPendingRequest = (callback: () => void) => {
  pendingRequests.push(callback);
};

const resolvePendingRequests = () => {
  pendingRequests.forEach((cb) => cb());
  pendingRequests = [];
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    const unauthByGraphQL = graphQLErrors?.some(
        (err) => (err.extensions as any)?.code === "AUTH_NOT_AUTHENTICATED" || (err.extensions as any)?.code === "AUTH_NOT_AUTHORIZED"
    );

    if (unauthByGraphQL) {
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                return fromPromise(axiosClient.post("/auth/refresh"))
                .flatMap(() => {
                    isRefreshing = false;
                    resolvePendingRequests();
                    return forward(operation); // Retry original
                })
            }
            catch (err: unknown) {
                console.error("Refresh token failed, redirecting to login", err);
                window.location.href = "/login";
                return fromPromise(Promise.reject(err));
            }
        } else {
            // Add request to queue until refresh is done
            return fromPromise(
                new Promise((resolve) => {
                    addPendingRequest(() => resolve(true));
                })
            ).flatMap(() => forward(operation));
        }
    }

    if (graphQLErrors) {
        graphQLErrors.forEach(({ message }) =>
            console.error(`[GraphQL error]: ${message}`)
        );
    }
});

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  credentials: "include",
});

const apolloClient = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
});

export default apolloClient;