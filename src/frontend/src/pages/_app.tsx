import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Layout } from '@/src/components';
import '@styles/globals.scss';

const App: NextPage<AppProps> = ({ Component, pageProps }: AppProps): ReactElement => {
	return (
		<Layout>
			<Component {...pageProps} />
			
		</Layout>
	);
};

export default App;
