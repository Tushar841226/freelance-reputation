import React from "react";
import { useAuth } from "../pages/useAuthClient.jsx";

const Login = () => {
    const { login } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Login with Internet Identity</h1>
            <button
                onClick={login}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Login with Internet Identity
            </button>
        </div>
    );
};

export default Login;
