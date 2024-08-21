import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Presgen',
	description: 'Sistema de Manutenção Preditiva com IA e Arquitetura em Nuvem',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
