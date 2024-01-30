"use client"
import { useEffect,useState } from "react";
import React from "react";
import { useRouter } from 'next/navigation';


const home=()=>{
  const router = useRouter()
  useEffect(() => {

  router.push('/dashboard');
  },[router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
    
    </div>
  );
  };

export default home;
