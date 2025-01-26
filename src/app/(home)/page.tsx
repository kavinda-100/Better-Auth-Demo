import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export default function HomePage() {
  return (
    <section
      className={
        "flex h-[calc(100vh-60px)] flex-col items-center justify-center"
      }
    >
      <h1 className={"text-pretty text-4xl font-extrabold"}>
        Better Auth Demo Project
      </h1>
      <p className={"text-pretty text-xl text-muted-foreground"}>
        This is a demo project for better auth
      </p>
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
  );
}
