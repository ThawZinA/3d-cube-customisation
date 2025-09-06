"use client"

import dynamic from "next/dynamic"

const CubeCustomizationPage = dynamic(() => import("./cube-customization-page"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Loading 3D Customization...</p>
      </div>
    </div>
  ),
})

export default function CubeClientWrapper() {
  return <CubeCustomizationPage />
}
