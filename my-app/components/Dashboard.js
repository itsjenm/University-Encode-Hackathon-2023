
import React, { useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! 
      </div>
    );
  }
  return <a href="/api/auth/login">Login</a>;
};

export default Dashboard;
