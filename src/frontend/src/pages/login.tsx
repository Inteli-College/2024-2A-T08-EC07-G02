import Head from 'next/head';

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Head>
                <title>Login</title>
            </Head>
            <img src="/logo.png" alt="Logo" className="w-400 h-450 mb-8" />
            <div 
                className="flex flex-col items-center p-8"
                style={{
                    borderRadius: '30px',
                    border: '5px solid #3E4851',
                    background: '#CACFD2',
                    boxShadow: '0 10px 30px 0 rgba(0, 0, 0, 0.3)',
                    width: '450px'
                }}>
                <input 
                    type="text" 
                    placeholder="Usuário" 
                    className="mb-4 px-4 py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                        borderRadius: '30px',
                        background: '#EBEBEB',
                    }}
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    className="mb-6 px-4 py-2 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                        borderRadius: '30px',
                        background: '#EBEBEB',
                    }}
                />
                <button
                    onClick={() => {
                    }}
                    className= "px-10 py-2 bg-gray-400 text-white font-semibold text-lg leading-normal uppercase rounded-lg shadow-lg hover:bg-gray-500 hover:shadow-xl focus:bg-gray-500 focus:shadow-xl focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-xl transition duration-150 ease-in-out"
                >
                    Entrar
                </button>
            </div>
        </div>
    );
}
