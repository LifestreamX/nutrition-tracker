import React from 'react';
import NavBar from './NavBar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/authOptions';

const NavBarWrapper = async () => {
  const session = await getServerSession(authOptions);

  return <NavBar session={session} />;
};

export default NavBarWrapper;
