import { NextSeo } from "next-seo";

import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
// import WorkshopNotice from "@/components/WorkshopNotice";
import { CheckCircleIcon } from "@heroicons/react/solid";

const includedFeatures = [
  "Schema Definition Language",
  "Queries",
  "Mutations",
  "Subscriptions",
  "Union Types",
  "Fragments",
  "Variables",
  "and much more...",
];

const clientSideFeatures = [
  "GraphQL Basics",
  "Apollo Client 3",
  "GraphQL Code Generator",
  "Authentication",
  "React Apollo",
  "GraphiQL",
  "Error Handling",
  "Variables",
  "and much more...",
];

const serverSideFeatures = [
  "GraphQL Basics",
  "GraphQL Yoga",
  "Server Context",
  "Dataloader",
  "GraphQL Code Generator",
  "Error Handling",
  "Logging",
  "Authorization",
  "and much more...",
];

export default function WorkshopsPage() {
  return (
    <Layout title="GraphQL Training and Workshops">
      <NextSeo
        openGraph={{
          images: [
            {
              url: "https://graphql.wtf/graphql-wtf.png",
              width: 1200,
              height: 526,
            },
          ],
        }}
      />
      <div className="bg-gradient-to-br from-haiti via-haiti to-[#3E0F3F] relative overflow-hidden">
        <div
          className="z-0 absolute inset-0 select-none items-center bg-cover bg-center"
          style={{ backgroundImage: "url(/gradient.svg)" }}
        >
          <img
            src="/hero-wave.svg"
            className="w-full opacity-10 blur-md select-none"
          />
        </div>
        <Nav />
        <div className="mx-auto flex items-center justify-center relative p-6 pb-12 md:p-12 lg:pb-32">
          <div className="text-center space-y-4 md:space-y-6 max-w-4xl z-10 relative">
            <h1 className="text-white text-3xl md:text-6xl font-extrabold md:leading-tight tracking-tighter">
              One to one training, and workshops, on{" "}
              <span className="text-razzmatazz">GraphQL.</span>
            </h1>
          </div>
        </div>
      </div>
      <div id="workshops" className="relative bg-white md:bg-gray-100">
        <div className="py-6 md:py-12">
          <div className="max-w-4xl mx-auto md:space-y-6">
            <div className="md:shadow md:rounded-md md:bg-white">
              <div className="flex-1 px-6 py-8 lg:p-12 space-y-8">
                <div className="lg:flex lg:justify-between lg:items-center lg:space-x-12 space-y-6 lg:space-y-0">
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-2xl lg:text-3xl text-haiti group-hover:text-razzmatazz transition-colors tracking-tight">
                      Intro to GraphQL &mdash; $149
                    </h3>
                    <p className="text-gray-600 leading-6 tracking-tight">
                      Get up to speed with GraphQL by learning the basics of the
                      specification, how to query and mutate data with GraphQL
                      operations.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="rounded-md shadow">
                      <a
                        href="https://savvycal.com/notrab/intro-to-graphql"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-razzmatazz"
                      >
                        Schedule a time
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-3 bg-white text-sm tracking-wider font-semibold uppercase text-razzmatazz">
                      One to one training on
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <ul
                    role="list"
                    className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-8 lg:gap-y-5"
                  >
                    {includedFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start lg:col-span-1"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-5 w-5 text-razzmatazz"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:shadow md:rounded-md md:bg-white">
              <div className="flex-1 px-6 py-8 lg:p-12 space-y-8">
                <div className="lg:flex lg:justify-between lg:items-center lg:space-x-12 space-y-6 lg:space-y-0">
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-2xl lg:text-3xl text-haiti group-hover:text-razzmatazz transition-colors tracking-tight">
                      GraphQL on the Client &mdash; $149
                    </h3>
                    <p className="text-gray-600 leading-6 tracking-tight">
                      Get up to speed with using GraphQL on the client. Learn
                      how to query, mutate, and subscribe to changes.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="rounded-md shadow">
                      <a
                        href="https://savvycal.com/notrab/client-side-graphql"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-razzmatazz"
                      >
                        Schedule a time
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-3 bg-white text-sm tracking-wider font-semibold uppercase text-razzmatazz">
                      One to one training on
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <ul
                    role="list"
                    className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-8 lg:gap-y-5"
                  >
                    {clientSideFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start lg:col-span-1"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-5 w-5 text-razzmatazz"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="md:shadow md:rounded-md md:bg-white">
              <div className="flex-1 px-6 py-8 lg:p-12 space-y-8">
                <div className="lg:flex lg:justify-between lg:items-center lg:space-x-12 space-y-6 lg:space-y-0">
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-2xl lg:text-3xl text-haiti group-hover:text-razzmatazz transition-colors tracking-tight">
                      GraphQL on the Server &mdash; $149
                    </h3>
                    <p className="text-gray-600 leading-6 tracking-tight">
                      Learn how to build a GraphQL server using the Schema
                      Definition Language. Fetch and mutate data with Prisma
                      &amp; MySQL.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="rounded-md shadow">
                      <a
                        href="https://savvycal.com/notrab/server-side-graphql"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-razzmatazz"
                      >
                        Schedule a time
                      </a>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-3 bg-white text-sm tracking-wider font-semibold uppercase text-razzmatazz">
                      One to one training on
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <ul
                    role="list"
                    className="space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-x-8 lg:gap-y-5"
                  >
                    {serverSideFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start lg:col-span-1"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-5 w-5 text-razzmatazz"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* <WorkshopNotice /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
