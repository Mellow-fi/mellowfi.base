import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-colors-secondary border-b border-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center text-white font-semibold text-2xl">
                  <svg
                    width="90.85714285680001"
                    height="24"
                    viewBox="0 0 106 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Mellow</title>
                    <path
                      fill="#2E3338"
                      d="M13.4197 27.7702C15.4753 19.4966 17.9576 15.7428 23.2323 13.2148L22.03 9.95896C17.337 11.7209 13.4973 16.1259 11.7131 21.7948C10.0454 16.5089 6.43835 11.9508 1.82291 9.49932L0 12.6785C5.11965 15.6279 7.67947 19.4966 9.73509 27.7702H13.4197ZM31.067 28C33.588 28 35.7212 26.8509 36.9623 25.1655L37.1562 27.7702H40.3754V16.5855C40.3754 11.2996 37.3114 8.00547 32.1142 8.00547C30.2137 8.00547 28.2744 8.3502 26.3352 9.07798L27.3048 12.2189C28.7786 11.6826 30.1749 11.4145 31.4936 11.4145C34.7903 11.4145 36.7684 13.3297 36.7684 16.9685V17.3516C35.2558 16.5089 33.3553 15.9726 31.416 15.9726C27.266 15.9726 24.3183 18.4624 24.3183 21.948C24.3183 25.5486 27.4212 28 31.067 28ZM31.7651 24.6293C29.6319 24.6293 28.2356 23.5185 28.2356 21.8714C28.2356 20.2243 29.6707 19.1135 31.8815 19.1135C33.6268 19.1135 35.4109 19.6881 36.9235 20.7223C36.303 23.0588 34.3249 24.6293 31.7651 24.6293ZM49.5675 27.8468V0L45.8053 1.18741V27.8468H49.5675ZM63.8405 28C69.3092 28 73.7307 23.6334 73.7307 18.2709C73.7307 12.87 69.3092 8.54172 63.8405 8.54172C58.3718 8.54172 53.9502 12.87 53.9502 18.2709C53.9502 23.6334 58.3718 28 63.8405 28ZM63.8405 24.3228C60.5049 24.3228 57.8288 21.6416 57.8288 18.2709C57.8288 14.9001 60.5049 12.2189 63.8405 12.2189C67.176 12.2189 69.8522 14.9001 69.8522 18.2709C69.8522 21.6416 67.176 24.3228 63.8405 24.3228ZM81.7205 27.7702V20.0328C81.7205 15.3215 83.8536 12.3338 87.1892 12.3338C87.6546 12.3338 88.0812 12.3721 88.5079 12.487L89.3224 9.15458C88.6242 8.92476 87.8097 8.77155 86.9952 8.77155C84.4354 8.77155 82.3798 10.2271 81.1775 12.5253C80.9835 11.1847 80.5957 9.88235 80.169 8.84815L76.756 9.99726C77.4929 11.9508 77.9971 13.7127 77.9971 16.5472V27.7702H81.7205ZM96.6916 28C99.2126 28 101.346 26.8509 102.587 25.1655L102.781 27.7702H106V16.7387C106 11.4528 102.975 8.15869 97.7 8.15869C95.9158 8.15869 94.0542 8.54172 92.1537 9.26949L92.9294 12.487C94.442 11.8741 95.8383 11.5677 97.157 11.5677C100.415 11.5677 102.393 13.4829 102.393 17.1217V17.3516C100.88 16.5089 98.9799 15.9726 97.0406 15.9726C92.8906 15.9726 89.9429 18.4624 89.9429 21.948C89.9429 25.5486 93.0457 28 96.6916 28ZM97.3897 24.6293C95.2565 24.6293 93.8602 23.5185 93.8602 21.8714C93.8602 20.2243 95.2953 19.1135 97.506 19.1135C99.2514 19.1135 101.035 19.6881 102.548 20.7223C101.928 23.0588 99.9495 24.6293 97.3897 24.6293Z"
                    ></path>
                  </svg>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a className="inline-flex items-center border-b-2 border-black px-1 pt-1 text-sm font-medium text-gray-900">
                    
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Login
              </Disclosure.Button>
              {/* Add here your custom menu elements */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }
