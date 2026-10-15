import React from "react";
const paths = {
  closet: (
    <>
      <path d="M5 3h14v18H5zM12 3v18M8 11v3m8-3v3" />
      <path d="M4 21h16" />
    </>
  ),
  room: (
    <>
      <path d="m3 10 9-7 9 7v11H3zM9 21v-8h6v8M6 8h12" />
    </>
  ),
  diary: (
    <>
      <path d="M5 3h14v18H5zM9 3v18M3 7h4m-4 5h4m-4 5h4M12 8h4m-4 4h4" />
    </>
  ),
  letter: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  neighbors: (
    <>
      <path d="M3 21V10l6-5 6 5v11M15 12l4-3 3 3v9M7 21v-6h4v6" />
      <path d="M6 10h6" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h6l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3z" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  back: <path d="m14 5-7 7 7 7M7 12h14" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2" />
    </>
  ),
  heart: <path d="M12 21S1 14 3 7c2-6 8-4 9 0 1-4 7-6 9 0 2 7-9 14-9 14Z" />,
  check: <path d="m5 12 4 4L20 5" />,
  hanger: (
    <>
      <path d="M9 6a3 3 0 1 1 5 2l-2 2v2L3 18v2h18v-2l-9-6" />
    </>
  ),
  flower: (
    <>
      <path d="M12 11c-9 0-7-9-2-6 1-7 9-4 6 1 8 0 8 8 2 8 5 7-4 10-7 4-6 4-10-4-4-7Z" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  trash: (
    <>
      <path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
    </>
  ),
  spark: (
    <>
      <path d="m12 2 2 7 7 3-7 2-2 8-3-8-7-2 7-3z" />
    </>
  ),
  volume: (
    <>
      <path d="M4 9h4l6-5v16l-6-5H4zM18 7q6 5 0 10" />
    </>
  ),
};
export default function Icon({ name, size = 22, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.spark}
    </svg>
  );
}
