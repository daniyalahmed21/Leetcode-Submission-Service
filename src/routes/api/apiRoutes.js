import v1Plugin from "./v1/v1Routes.js";

async function apiPlugin(fastify,options) {
    fastify.register(v1Plugin,{prefix:"/v1"})
}

export default apiPlugin