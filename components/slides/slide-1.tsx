"use client";

import Image from "next/image";

export function Slide1() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pb-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* PromptMates logo and presents */}
        <div className="flex flex-col items-center mb-10">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PM%20-%20PromptMates%20Transparent%20Logo-wAr4yojXywvrgF8OdIzYd5yibBbq9h.png"
            alt="PromptMates"
            width={320}
            height={320}
            className="h-64 w-auto object-contain mb-3"
          />
          <p className="text-sm uppercase tracking-widest text-gray-400">PromptMates Presents</p>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6">
          Stop Prompting From Scratch
        </h1>
        
        <p className="text-2xl md:text-3xl font-medium mb-4">
          <span className="bg-[#c1ff72] px-3 py-1 rounded">
            Build Your AI Operating System in 60 Minutes
          </span>
        </p>
        
        <p className="text-lg text-gray-500 mb-12">
          A hands-on workshop by PromptMates
        </p>

        {/* Presenter cards with names */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-8 py-5 min-w-[180px]">
            <p className="font-semibold text-gray-900">Jason Miller</p>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Natera_logo-b2GTixta3E3icqI2euL8tVPK4XGK5k.png"
              alt="Natera"
              width={80}
              height={24}
              className="h-5 w-auto object-contain mx-auto mt-2"
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-8 py-5 min-w-[180px]">
            <p className="font-semibold text-gray-900">Matt Texeira</p>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Komodo-dark-yw78TSN0ze1l7d6BPKYv60E9CUCw7c.svg"
              alt="Komodo Health"
              width={100}
              height={24}
              className="h-5 w-auto object-contain mx-auto mt-2"
            />
          </div>
        </div>

        <p className="text-gray-400 animate-pulse-opacity">
          {"Press \u2192 to begin"}
        </p>
      </div>
    </div>
  );
}
