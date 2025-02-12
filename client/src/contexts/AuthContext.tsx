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
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    userDetails: UserDetails | null;
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | null>>;
    userSignUp: UserSignUp;
    setUserSignUp: React.Dispatch<React.SetStateAction<UserSignUp>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
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