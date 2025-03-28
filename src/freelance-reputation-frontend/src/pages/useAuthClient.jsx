import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from '../../../declarations/freelance-reputation-backend/index';

const AuthContext = createContext();

export const useAuthClient = () => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [backendActor, setBackendActor] = useState(null);

    const backendCanisterId = process.env.CANISTER_ID_FREELANCE_REPUTATION_BACKEND;
    
    // Function to update client state
    const clientInfo = async (client) => {
        const isAuthenticated = await client.isAuthenticated();
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();

        setAuthClient(client);
        setIsAuthenticated(isAuthenticated);
        setIdentity(identity);
        setPrincipal(principal);

        if (isAuthenticated && !principal.isAnonymous()) {
            let backendActor = createActor(backendCanisterId, { agentOptions: { identity: identity } });
            setBackendActor(backendActor);
        }
    };

    useEffect(() => {
        (async () => {
            const authClient = await AuthClient.create();
            clientInfo(authClient);
        })();
    }, []);

    // Internet Identity Login
    const login = async () => {
        try {
            const authClient = await AuthClient.create();
            await authClient.login({
                identityProvider: "https://identity.ic0.app/",
                onSuccess: async () => {
                    await clientInfo(authClient);
                },
                onError: (error) => console.error("Login failed", error),
            });
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        await authClient?.logout();
        setIsAuthenticated(false);
    };

    return {
        login, logout, isAuthenticated, identity, principal, backendActor
    };
};

export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
