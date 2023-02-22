import React, { useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from "react";
import { authAccount, authWaiter } from "../services";

export interface AuthAccountData {
    token: string;
}

export interface AuthWaiterData {
    token: string
}

interface AuthContextData {
    authAccountData?: AuthAccountData
    authWaiterData?: AuthWaiterData
    signInAccount: (email: string, password: string) => Promise<AuthAccountData>
    signInWaiter: (cpf: number, password: string) => Promise<AuthWaiterData>
    singOutAccount: () => Promise<void>;
    singOutWaiter: () => Promise<void>;
    loading: boolean
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [authAccountData, setAuthAccountData] = useState<AuthAccountData>()
    const [authWaiterData, setAuthWaiterData] = useState<AuthWaiterData>()
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        loadStorageAccountData();
        loadStorageWaiterData();
    }, []);

    async function loadStorageAccountData(): Promise<void> {
        try {

            const authAccountDataSerialized = await AsyncStorage.getItem('@AuthAccountData');
            if (authAccountDataSerialized) {

                const _authAccountData: AuthAccountData = JSON.parse(authAccountDataSerialized);
                setAuthAccountData(_authAccountData);
            }
        } catch (error) {
        } finally {
            setisLoading(false);
        }
    }

    async function loadStorageWaiterData(): Promise<void> {
        try {

            const authWaiterDataSerialized = await AsyncStorage.getItem('@AuthWaiterData');
            if (authWaiterDataSerialized) {

                const _authWaiterData: AuthAccountData = JSON.parse(authWaiterDataSerialized);
                setAuthWaiterData(_authWaiterData);
            }
        } catch (error) {
        } finally {
            setisLoading(false);
        }
    }

    async function signInAccount(email: string, password: string) {
        try {
            const AuthAccount = await authAccount({ email, password })
            setAuthAccountData(AuthAccount.data)
            AsyncStorage.setItem('@AuthAccountData', JSON.stringify(AuthAccount.data));
            return AuthAccount
        } catch (error) {
            console.log(error)
        }
    }

    async function signInWaiter(cpf: number, password: string) {
        try {
            const AuthWaiter = await authWaiter({ cpf, password })
            setAuthWaiterData(AuthWaiter)
            AsyncStorage.setItem('@AuthWaiterData', JSON.stringify(AuthWaiter));
            return AuthWaiter
        } catch (error) {
            console.log(error)
        }

    }

    async function singOutAccount() {
        singOutWaiter()
        AsyncStorage.removeItem('@AuthAccountData');
        setAuthAccountData(undefined)
    }

    async function singOutWaiter() {
        AsyncStorage.removeItem('@AuthWaiterData');
        setAuthWaiterData(undefined)
    }

    return (
        <AuthContext.Provider value={{ authAccountData, authWaiterData, signInAccount, signInWaiter, singOutAccount, singOutWaiter }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
}
