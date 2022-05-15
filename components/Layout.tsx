import { ReactNode } from "react";
import { NextSeo } from "next-seo";

import SubscribeForm from "@/components/SubscribeForm";

function Layout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <>
      <NextSeo title={title} />

      {children}

      <footer>
        <div className="max-w-7xl mx-auto p-6 md:px-0 md:py-12 text-center">
          <div className="space-y-6 md:space-y-0 flex flex-col md:flex-row items-center justify-between">
            <ul className="-mr-1 flex items-center space-x-4 text-white">
              <li>
                <a
                  href="https://www.youtube.com/channel/UCcSj41xzQJCT2V0GNwlob_w"
                  className="hover:text-razzmatazz p-1 block transition hover:scale-110"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                  </svg>
                  <span className="sr-only">Subscribe on YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/graphqlwtf"
                  className="hover:text-razzmatazz p-1 block transition hover:scale-110"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                  </svg>
                  <span className="sr-only">Follow on Twitter</span>
                </a>
              </li>
              <li className="hidden">
                <a
                  href="#"
                  className="hover:text-razzmatazz p-1 block transition hover:scale-110"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M3 3c9.941 0 18 8.059 18 18h-3c0-8.284-6.716-15-15-15V3zm0 7c6.075 0 11 4.925 11 11h-3a8 8 0 0 0-8-8v-3zm0 7a4 4 0 0 1 4 4H3v-4z" />
                  </svg>
                </a>
              </li>
            </ul>
            <SubscribeForm />
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
