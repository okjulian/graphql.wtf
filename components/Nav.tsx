import Link from "next/link";
import { useRouter } from "next/router";
// import { Disclosure } from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
import cc from "classcat";

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CollectionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const navigation = [
  { name: "Episodes", href: "/", icon: PlayIcon },
  { name: "Courses", href: "/courses", icon: CollectionIcon },
  // { name: "Workshops", href: "/workshops" },
];

export default function Nav() {
  const { asPath } = useRouter();

  return (
    // <Disclosure as="nav">
    //   {({ open }) => (
    //     <>
    <div className="max-w-7xl mx-auto px-6 lg:px-0">
      <div className="relative flex items-center justify-between py-6 md:py-12 xl:h-32">
        {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-25 focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div> */}
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <a className="inline-block">
                <span className="sr-only">graphql.wtf</span>

                <svg
                  className="h-9 w-auto"
                  viewBox="0 0 265 60"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m51.9615 15-12.9904-7.5-12.9903-7.5-25.9808 15v30l25.9808 15 25.9807-15v-14.9999l-12.9904-7.5001zm-12.9904 22.5-12.9903 7.5-12.9904-7.5v-15l12.9904-7.5 12.9903 7.5-12.9903 7.5z"
                    fill="#ed1e79"
                  />
                  <g fill="#fff">
                    <path d="m82.7392 16.3481h5.1287v19.732c0 5.3636-3.641 9.357-9.9051 9.357-6.3424 0-9.1221-4.2283-9.4353-7.4778h5.5594c.2349 1.1745 1.1745 2.7014 3.9542 2.7014 2.8188 0 4.2674-1.566 4.2674-3.9934v-2.858c-1.0571 1.4094-3.0929 2.6623-5.9901 2.6623-5.716 0-9.357-4.5807-9.357-10.2967s3.641-10.2966 9.357-10.2966c2.8972 0 5.1288 1.0962 6.4208 2.9754zm-5.2462 4.424c-2.9755 0-4.9722 2.1925-4.9722 5.4028 0 3.2104 1.9967 5.4028 4.9722 5.4028 2.9754 0 4.9721-2.1924 4.9721-5.4028 0-3.2103-1.9967-5.4028-4.9721-5.4028z" />
                    <path d="m103.001 21.3985c-.362-.0696-.728-.1089-1.097-.1174-3.249 0-4.9325 1.6052-4.9325 5.3636v10.2184h-5.5594v-20.515h5.1288v2.6622c.7438-1.2136 2.3098-2.858 5.7941-2.858.196 0 .666.0392.666.0392z" />
                    <path d="m104.527 31.0296c0-3.5627 2.467-5.6768 7.948-6.5382l5.481-.8221v-.1958c0-1.9967-1.253-3.0146-3.68-3.0146-2.584 0-3.602 1.0962-3.798 2.5057h-5.481c.313-3.5627 2.741-7.0863 9.24-7.0863 6.029 0 9.004 2.858 9.004 7.6344v9.6702c0 1.3311.235 2.858.588 3.6802h-5.364c-.039 0-.235-.9396-.235-2.2708-1.292 1.8401-3.367 2.7406-6.499 2.7406-4.737 0-7.204-2.6231-7.204-6.3033zm8.496-2.5839c-2.388.4306-3.132 1.2919-3.132 2.4273 0 1.4094.861 2.1533 3.093 2.1533 3.249 0 4.972-1.8792 4.972-4.5806v-.8222z" />
                    <path d="m132.086 45.0064h-5.56v-28.6583h5.129v2.5056c1.292-1.8792 3.602-2.9754 6.499-2.9754 5.951 0 9.435 4.7764 9.435 10.7273s-3.484 10.7273-9.435 10.7273c-2.897 0-5.011-1.2528-6.068-2.6623zm4.894-12.5674c3.093 0 5.05-2.5056 5.05-5.8334s-1.957-5.8335-5.05-5.8335-5.051 2.5057-5.051 5.8335 1.958 5.8334 5.051 5.8334z" />
                    <path d="m155.549 18.2273c1.057-1.4094 3.015-2.3491 5.677-2.3491 4.933 0 7.556 3.2887 7.556 8.1825v12.8023h-5.559v-12.1758c0-2.3882-1.018-4.0326-3.485-4.0326-2.701 0-4.189 1.6835-4.189 4.5024v11.706h-5.559v-29.363h5.559z" />
                    <path d="m180.663 37.3329c-5.951 0-9.435-4.7764-9.435-10.7273s3.484-10.7273 9.435-10.7273c2.897 0 5.207 1.0962 6.499 2.9754v-2.5056h5.129v28.6583h-5.559v-10.3358c-1.057 1.4095-3.172 2.6623-6.069 2.6623zm1.175-16.5608c-3.093 0-5.051 2.5057-5.051 5.8335s1.958 5.8334 5.051 5.8334 5.05-2.5056 5.05-5.8334-1.957-5.8335-5.05-5.8335z" />
                    <path d="m195.549 36.863v-29.363h5.559v29.363z" />
                    <path d="m204.909 35.0621c0-1.2136.9-2.1141 2.153-2.1141 1.214 0 2.153.9005 2.153 2.1141 0 1.2529-.939 2.1142-2.153 2.1142-1.253 0-2.153-.8613-2.153-2.1142z" />
                    <path d="m223.041 20.4589h-.039l-5.442 16.4041h-2.897l-6.891-19.9277h2.976l5.364 16.639 5.481-16.639h2.897l5.403 16.639 5.442-16.639h2.936l-6.969 19.9277h-2.897z" />
                    <path d="m251.106 36.7455s-.705.1958-2.115.1958c-3.367 0-5.168-1.8401-5.168-5.442v-12.215h-3.797v-2.349h3.797v-5.6769h2.78v5.6769h4.581v2.349h-4.581v12.0193c0 2.1141.822 3.132 2.741 3.132.592-.0107 1.182-.0762 1.762-.1957z" />
                    <path d="m257.463 13.6467c0-4.18915 2.427-6.14668 5.912-6.14668.445-.00455.889.02161 1.331.0783v2.54478c-.363-.0585-.729-.0847-1.096-.0783-2.154 0-3.367.9396-3.367 3.4844v3.4061h4.502v2.3491h-4.502v17.5786h-2.78v-17.5786h-3.876v-2.3491h3.876z" />
                  </g>
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div className="hidden absolute inset-y-0 right-0 md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3 md:space-x-6">
          <div className="flex space-x-4">
            {navigation.map(({ icon: Icon, ...item }) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={cc([
                    "group px-3 py-2 rounded-md text-sm font-medium transition inline-flex items-center space-x-2",
                    item.href === asPath
                      ? "text-white"
                      : "text-white text-opacity-80 hover:text-opacity-100",
                  ])}
                  aria-current={item.href === asPath ? "page" : undefined}
                >
                  <Icon />
                  <span>{item.name}</span>
                </a>
              </Link>
            ))}
            <a
              href="https://www.youtube.com/channel/UCcSj41xzQJCT2V0GNwlob_w"
              className="group px-3 py-2 rounded-md text-sm font-medium transition inline-flex items-center space-x-2 text-white text-opacity-80 hover:text-opacity-100"
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
              <span>Subscribe</span>
            </a>
            <a
              href="https://twitter.com/graphqlwtf"
              className="group px-3 py-2 rounded-md text-sm font-medium transition inline-flex items-center space-x-2 text-white text-opacity-80 hover:text-opacity-100"
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
          </div>
        </div>
      </div>
    </div>

    //       <Disclosure.Panel className="sm:hidden">
    //         <div className="px-2 pt-2 pb-3 space-y-1">
    //           {navigation.map((item) => (
    //             <a
    //               key={item.name}
    //               href={item.href}
    //               className={cc([
    //                 "block px-3 py-2 rounded-md text-base font-medium",
    //                 item.href === asPath
    //                   ? "text-white"
    //                   : "text-white text-opacity-80 hover:text-opacity-100",
    //               ])}
    //               aria-current={item.href === asPath ? "page" : undefined}
    //             >
    //               {item.name}
    //             </a>
    //           ))}
    //         </div>
    //       </Disclosure.Panel>
    //     </>
    //   )}
    // </Disclosure>
  );
}
