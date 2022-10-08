import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apollo from "@/lib/apollo";
import "@/styles/tailwind.scss";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ApolloProvider client={apollo}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}

export default MyApp;
