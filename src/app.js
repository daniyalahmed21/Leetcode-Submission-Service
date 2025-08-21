import apiPlugin from "./routes/api/apiRoutes.js";

async function App(fastify, options) {
  fastify.register(apiPlugin, { prefix: "/api" });
}

export default App;
