import { useContext } from 'react';
import { UserContext } from '@/lib/user-context';

export const useUser = () => useContext(UserContext);
