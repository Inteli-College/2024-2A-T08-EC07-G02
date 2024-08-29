import Head from 'next/head';

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Head>
                <title>Login</title>
            </Head>
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
                <img src="/car-logo.png" alt="Logo" className="w-40 h-40 mb-8" />
                <input 
                    type="text" 
                    placeholder="Usuário" 
                    className="mb-4 px-4 py-2 w-64 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    className="mb-6 px-4 py-2 w-64 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => {
                        // Ação ao clicar no botão
                    }}
                    className="px-10 py-2 bg-gray-400 text-white font-semibold text-lg leading-normal uppercase rounded-lg shadow-lg hover:bg-gray-500 hover:shadow-xl focus:bg-gray-500 focus:shadow-xl focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-xl transition duration-150 ease-in-out"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}
