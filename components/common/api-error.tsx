"use client"

import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RabbitMQError } from "@/lib/utils"

interface ApiErrorProps {
  children?: ReactNode
  error?: RabbitMQError
}

export function ApiError({ children, error }: ApiErrorProps) {
  if (!error) {
    return <>{children}</>
  }

  return (
    <div className="space-y-4">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="text-destructive">Connection Error</CardTitle>
          <CardDescription>
            {error.message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-4">
            {error.type === 'CONNECTION' && (
              <ul className="list-disc pl-4 space-y-2">
                <li>Check if the RabbitMQ server is running</li>
                <li>Verify the host and port settings in your .env.local file</li>
                <li>Ensure your network connection is stable</li>
                <li>Check if any firewalls are blocking the connection</li>
              </ul>
            )}
            {error.type === 'AUTH' && (
              <ul className="list-disc pl-4 space-y-2">
                <li>Verify your username and password in .env.local</li>
                <li>Check if the user has the correct permissions</li>
                <li>Ensure the virtual host settings are correct</li>
              </ul>
            )}
            {error.type === 'TIMEOUT' && (
              <ul className="list-disc pl-4 space-y-2">
                <li>The server is taking too long to respond</li>
                <li>Check if the RabbitMQ server is under heavy load</li>
                <li>Verify network latency between your application and the server</li>
              </ul>
            )}
            {error.type === 'UNKNOWN' && (
              <ul className="list-disc pl-4 space-y-2">
                <li>An unexpected error occurred</li>
                <li>Check the browser console for more details</li>
                <li>Try refreshing the page</li>
              </ul>
            )}
            {error.details && (
              <p className="mt-4 font-mono text-sm">
                Technical details: {error.details}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
