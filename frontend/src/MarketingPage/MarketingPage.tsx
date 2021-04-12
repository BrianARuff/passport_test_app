import Typography from "@material-ui/core/Typography";

export default function MarketingPage(props: any) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "1.25rem",
      }}
    >
      <Typography variant="h1" component="h1">
        Welcome!
      </Typography>
    </div>
  );
}
