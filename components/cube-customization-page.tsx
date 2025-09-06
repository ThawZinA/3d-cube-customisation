"use client"

import { useState, useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text3D, Center } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, ZoomIn, ZoomOut, ShoppingCart } from "lucide-react"

interface CubeProps {
  surface1: string
  surface2: string
  surface3: string
  surface4: string
  material: string
  font: string
  fontSize: number
  surface1Logo: string
  surface2Logo: string
  surface3Logo: string
  surface4Logo: string
  engravingType: { [key: string]: "Word" | "Logo" }
}

const logoLibrary = {
  heart: "<3",
  star: "*",
  music: "♪",
  diamond: "<>",
  crown: "^",
  infinity: "8",
  peace: "O",
  smile: ":)",
}

function CustomCube({
  surface1,
  surface2,
  surface3,
  surface4,
  material,
  font,
  fontSize,
  surface1Logo,
  surface2Logo,
  surface3Logo,
  surface4Logo,
  engravingType,
}: CubeProps) {
  const materialColors = {
    "Rose Gold": "#E8B4A0",
    Gold: "#FFD700",
    Silver: "#C0C0C0",
    Black: "#2C2C2C",
  }

  const cubeColor = materialColors[material as keyof typeof materialColors] || "#FFD700"

  const fontPaths = {
    Helvetiker: "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    Optimer: "https://threejs.org/examples/fonts/optimer_regular.typeface.json",
    Gentilis: "https://threejs.org/examples/fonts/gentilis_regular.typeface.json",
    Inter: "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", // fallback to helvetiker
  }

  const selectedFontUrl = fontPaths[font as keyof typeof fontPaths] || fontPaths.Helvetiker

  // Load the font using useLoader
  let loadedFont: any = null
  try {
    loadedFont = useLoader(FontLoader, selectedFontUrl)
  } catch (e) {
    // Font failed to load
    loadedFont = null
  }

  const renderSurfaceContent = (
    surfaceText: string,
    surfaceLogo: string,
    surfaceKey: string,
    position: [number, number, number],
    rotation?: [number, number, number],
  ) => {
    const content = engravingType[surfaceKey] === "Logo" ? surfaceLogo : surfaceText
    if (!content) return null

    // Only render Text3D if font is loaded
    if (!loadedFont) {
      return null
    }

    return (
      <Center position={position} rotation={rotation}>
        <Text3D
          font={loadedFont}
          size={fontSize}
          height={0.02}
          curveSegments={12}
        >
          {content}
          <meshStandardMaterial color="#000000" />
        </Text3D>
      </Center>
    )
  }

  return (
    <group>
      {/* Cube geometry */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={cubeColor} metalness={0.8} roughness={0.2} />
      </mesh>

      {renderSurfaceContent(surface1, surface1Logo, "surface1", [0, 0, 1.01])}
      {renderSurfaceContent(surface2, surface2Logo, "surface2", [1.01, 0, 0], [0, Math.PI / 2, 0])}
      {renderSurfaceContent(surface3, surface3Logo, "surface3", [0, 0, -1.01], [0, Math.PI, 0])}
      {renderSurfaceContent(surface4, surface4Logo, "surface4", [-1.01, 0, 0], [0, -Math.PI / 2, 0])}
    </group>
  )
}

export default function CubeCustomizationPage() {
  const [mounted, setMounted] = useState(false)
  const [surface1, setSurface1] = useState("")
  const [surface2, setSurface2] = useState("")
  const [surface3, setSurface3] = useState("")
  const [surface4, setSurface4] = useState("")
  const [surface1Logo, setSurface1Logo] = useState("")
  const [surface2Logo, setSurface2Logo] = useState("")
  const [surface3Logo, setSurface3Logo] = useState("")
  const [surface4Logo, setSurface4Logo] = useState("")
  const [material, setMaterial] = useState("Rose Gold")
  const [font, setFont] = useState("Helvetiker")
  const [fontSize, setFontSize] = useState(0.15)
  const [engravingType, setEngravingType] = useState<{ [key: string]: "Word" | "Logo" }>({
    surface1: "Word",
    surface2: "Word",
    surface3: "Word",
    surface4: "Word",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const materials = ["Rose Gold", "Gold", "Silver", "Black"]
  const fonts = ["Helvetiker", "Optimer", "Gentilis", "Inter"]

  // Warn if @react-three/fiber or drei version is incompatible
  useEffect(() => {
    // @ts-ignore
    if (typeof window !== "undefined" && window.React && window.React.version) {
      const reactVersion = window.React.version
      // React 18+ is required for latest fiber/drei
      if (parseInt(reactVersion.split(".")[0], 10) < 18) {
        // eslint-disable-next-line no-console
        console.warn("[v0] React version is too old for @react-three/fiber 9.x. Please upgrade React.")
      }
    }
  }, [])

  const handleEngravingTypeChange = (surface: keyof typeof engravingType, type: "Word" | "Logo") => {
    setEngravingType((prev) => ({ ...prev, [surface]: type }))
  }

  const getCharacterCount = (text: string) => text.length
  const maxCharacters = 10

  const getLogoSetter = (surfaceNum: number) => {
    switch (surfaceNum) {
      case 1:
        return setSurface1Logo
      case 2:
        return setSurface2Logo
      case 3:
        return setSurface3Logo
      case 4:
        return setSurface4Logo
      default:
        return setSurface1Logo
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading 3D Customization...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-foreground">GRACE SOUVENIRS</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Home
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Products
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">1</span>
              </div>
              <span className="text-sm text-muted-foreground">GET STARTED</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">2</span>
              </div>
              <span className="text-sm font-medium">ENGRAVING</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">3</span>
              </div>
              <span className="text-sm text-muted-foreground">NAME CARD & SIZE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">4</span>
              </div>
              <span className="text-sm text-muted-foreground">CUSTOMER INFO</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Special Edition Ver.2 Rose Gold Cube</h1>
              <p className="text-muted-foreground">
                You can engrave anything you like on the four surfaces of the middle cube making it your own unique
                bracelet. You can engrave <span className="text-primary font-medium">"Word"</span> or{" "}
                <span className="text-primary font-medium">"Logo"</span> to your liking.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                You can add 1 line with 10 characters maximum in each line.
              </p>
            </div>

            {/* 3D Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3D Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-muted/20 rounded-lg overflow-hidden">
                  <Canvas
                    camera={{ position: [4, 4, 4], fov: 50 }}
                    onError={(error) => {
                      console.warn("[v0] Canvas rendering error:", error)
                    }}
                  >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <CustomCube
                      surface1={surface1}
                      surface2={surface2}
                      surface3={surface3}
                      surface4={surface4}
                      surface1Logo={surface1Logo}
                      surface2Logo={surface2Logo}
                      surface3Logo={surface3Logo}
                      surface4Logo={surface4Logo}
                      material={material}
                      font={font}
                      fontSize={fontSize}
                      engravingType={engravingType}
                    />
                    <OrbitControls enablePan={false} />
                    <Environment preset="studio" />
                  </Canvas>
                </div>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset View
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Customization */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Own Cube</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4].map((num) => {
                  const surfaceKey = `surface${num}` as keyof typeof engravingType
                  const surfaceValue = num === 1 ? surface1 : num === 2 ? surface2 : num === 3 ? surface3 : surface4
                  const setSurfaceValue =
                    num === 1 ? setSurface1 : num === 2 ? setSurface2 : num === 3 ? setSurface3 : setSurface4

                  return (
                    <div key={num} className="space-y-3">
                      <Label className="text-sm font-medium">Surface {num}</Label>
                      {engravingType[surfaceKey] === "Word" ? (
                        <Input
                          placeholder={`Enter text for surface ${num}`}
                          value={surfaceValue}
                          onChange={(e) => setSurfaceValue(e.target.value.slice(0, maxCharacters))}
                          className="flex-1"
                        />
                      ) : (
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(logoLibrary).map(([key, symbol]) => (
                            <Button
                              key={key}
                              variant="outline"
                              size="sm"
                              onClick={() => getLogoSetter(num)(symbol)}
                              className="h-12 text-lg"
                              title={key}
                            >
                              {symbol}
                            </Button>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button
                            variant={engravingType[surfaceKey] === "Word" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleEngravingTypeChange(surfaceKey as keyof typeof engravingType, "Word")}
                          >
                            Word ✓
                          </Button>
                          <Button
                            variant={engravingType[surfaceKey] === "Logo" ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleEngravingTypeChange(surfaceKey as keyof typeof engravingType, "Logo")}
                          >
                            Logo
                          </Button>
                        </div>
                        {engravingType[surfaceKey] === "Word" && (
                          <span className="text-xs text-muted-foreground">
                            {getCharacterCount(surfaceValue)}/{maxCharacters}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}

                <Separator />

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Font Size</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      max={0.25}
                      min={0.08}
                      step={0.01}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Small</span>
                      <span>Large</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Material Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Material</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {materials.map((mat) => (
                      <Button
                        key={mat}
                        variant={material === mat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMaterial(mat)}
                        className="justify-start"
                      >
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{
                            backgroundColor:
                              mat === "Rose Gold"
                                ? "#E8B4A0"
                                : mat === "Gold"
                                  ? "#FFD700"
                                  : mat === "Silver"
                                    ? "#C0C0C0"
                                    : "#2C2C2C",
                          }}
                        />
                        {mat}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Font Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Font Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {fonts.map((fontName) => (
                      <Button
                        key={fontName}
                        variant={font === fontName ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFont(fontName)}
                      >
                        {fontName}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold text-primary">$89.99</span>
                  </div>
                  <Button className="w-full" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    NEXT
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Let's Make Some Memories Together</h3>
              <p className="text-muted-foreground">
                Create personalized jewelry that tells your unique story. Each piece is crafted with care and attention
                to detail.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Our Contact Info</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>GRACE Souvenirs Myanmar Co.,Ltd.</p>
                <p>097 848 33397, 097 848 33398</p>
                <p>gracesouvenirs.myanmar@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            Copyright © 2020 Grace Souvenirs Myanmar Co.,Ltd. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
