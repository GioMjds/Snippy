/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, FC, ReactNode } from "react";

interface UserDetails {
    username: string;
    email: string;
    profileImage?: string;
}

interface UserSignUp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UserContextType {
    isAuthenticated: boolean;
    userDetails: UserDetails | null;
    userSignUp: UserSignUp;
    sessionExpired: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setUserDetails: (value: UserDetails) => void;
    setUserSignUp: (value: UserSignUp) => void;
    setSessionExpired: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | any>(null);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [sessionExpired, setSessionExpired] = useState<boolean>(false);
    const [userSignUp, setUserSignUp] = useState<UserSignUp>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const contextValue: UserContextType = {
        isAuthenticated,
        setIsAuthenticated,
        userDetails,
        setUserDetails,
        userSignUp,
        setUserSignUp,
        sessionExpired,
        setSessionExpired,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};