import "./app.postcss";
import "../node_modules/svelte-material-ui/bare.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
