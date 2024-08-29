import type { ReactElement, ReactNode } from 'react';
import { BaseLayout } from '@/src/components';
import '@styles/globals.scss';

export default function Layout({ children }: { children: ReactNode }): ReactElement {
	return (
		<html lang="pt-br">
			<body>
				<main>
					<BaseLayout>{children}</BaseLayout>
				</main>
			</body>
		</html>
	);
}
