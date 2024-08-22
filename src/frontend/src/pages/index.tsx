import Head from 'next/head';
import toast from 'react-hot-toast';

export default function Home() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Head>
				<title>Home</title>
			</Head>
			<button
				onClick={() => {
					toast.success('Hello toast!');
				}}
				className="px-10 py-4 bg-blue-500 text-white font-semibold text-lg leading-normal uppercase rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl focus:bg-blue-600 focus:shadow-xl focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-xl transition duration-150 ease-in-out"
			>
				Click me
			</button>
		</div>
	);
}
