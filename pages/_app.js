import { KioscoProvider } from "../context/KioscoProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<KioscoProvider>
			<Component {...pageProps} />
		</KioscoProvider>
	);
}

export default MyApp;
