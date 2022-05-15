---
title: Metered GraphQL API usage billing with Stripe
description: Charge users of your GraphQL API per request with Stripe's metered billing.
published: 2021-12-06
video: https://www.youtube.com/watch?v=3pY9jVxzMd8
repo: https://github.com/notrab/graphql.wtf-stripe-metered-billing
instructor: instructors/jamie-barton.md
---

- [Stripe Metered billing](https://stripe.com/docs/billing/subscriptions/metered-billing)
- [Bull](https://www.npmjs.com/package/bull)
- [Redis](https://redis.io)

```js
const REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const logUsageQueue = new Queue("logUsageQueue", REDIS_URL);

app.use(async (req, res, next) => {
  console.log(req?.headers?.authorization);

  await logUsageQueue.add({
    subscriptionItemId: req.headers["authorization"],
  });

  next();
});
```

```js
const Queue = require("bull");
const throng = require("throng");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const workers = process.env.WEB_CONCURRENCY || 2;

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

function start() {
  const logUsageQueue = new Queue("logUsuageQueue", REDIS_URL);

  logUsageQueue.process(async (job) => {
    const { subscriptionItemId } = job.data;

    try {
      await stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
        quantity: 1,
      });
    } catch (err) {
      console.error(err);
    }
  });
}

throng({ workers, start });
```
