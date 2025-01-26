import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";


export default function HomePage() {
  return(
    <section className={"flex flex-col items-center justify-center h-[calc(100vh-60px)]"}>
      <h1 className={"text-4xl text-pretty font-extrabold"}>Better Auth Demo Project</h1>
      <p className={"text-xl text-pretty text-muted-foreground"}>This is a demo project for better auth</p>
      <Card className={"mt-10"}>
        <CardHeader>
          <CardTitle>Your Session Details</CardTitle>
          <CardDescription>
            This is where you can see your session details.
          </CardDescription>
          <CardContent></CardContent>
        </CardHeader>
      </Card>
    </section>
  )
}
