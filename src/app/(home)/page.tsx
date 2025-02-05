export default async function HomePage() {
  return (
    <section
      className={
        "flex h-[calc(100vh-60px)] flex-col items-center justify-center"
      }
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <h1 className={"text-pretty text-4xl font-extrabold"}>
        Better Auth Demo Project
      </h1>
      <p className={"text-pretty text-xl text-muted-foreground"}>
        This is a demo project for better auth
      </p>
    </section>
  );
}
