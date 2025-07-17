import React, { createContext, useContext, useState } from 'react';

export const getUsersContext = createContext()

export const useGetUsers = () => {
    return useContext(getUsersContext)
}