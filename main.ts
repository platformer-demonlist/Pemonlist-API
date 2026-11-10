import Fastify from "fastify";
import * as Path from "node:path";
import * as FS from "node:fs"

const fastify = Fastify({
    logger: true
});

fastify.get("/docs", async (_request, reply) => {
    const stream = FS.createReadStream(Path.join("docs", "dist", "redoc-static.html"));
    await reply.send(stream);
    stream.close();
});

try {
    await fastify.listen({ port: 8080 });
} catch (err) {
    fastify.log.error(err);
}