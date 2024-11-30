import { Metadata } from "next"
import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

// Import the logo
import logo from "@/public/images/logo.png"

export const metadata: Metadata = {
  title: "Login - RabbitScout",
  description: "Login to RabbitScout Dashboard",
}

export default function LoginPage() {
  return (
    <div className="h-full flex items-start pt-48 justify-center overflow-hidden">
      <div className="w-full max-w-[350px] flex flex-col justify-center space-y-6">
        <div className="flex flex-col text-center">
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="RabbitScout Logo"
              width={96}
              height={96}
              priority
              className="w-24 h-24 object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to <span className="text-orange-500">RabbitScout</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
