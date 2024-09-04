FROM node:20.17.0-alpine3.20 AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# should be use CDN instead (`public` and `.next/static`)
COPY .env.local ./
COPY ./public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs ./.next/standalone ./
COPY --chown=nextjs:nodejs ./.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT 3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]