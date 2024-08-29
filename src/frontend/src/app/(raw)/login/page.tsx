import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

export default function Login() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="flex items-center justify-center mb-8">
				<img src="/logo.png" alt="Vercel Logo" className="h-auto w-auto" />
			</div>

			<div className="flex items-center justify-center ">
				<form className="flex flex-col w-96 space-y-4">
					<input type="email" placeholder="Email" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
					<input
						type="password"
						placeholder="Password"
						className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white font-semibold text-lg leading-normal uppercase rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl focus:bg-blue-600 focus:shadow-xl focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-xl transition duration-150 ease-in-out"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
