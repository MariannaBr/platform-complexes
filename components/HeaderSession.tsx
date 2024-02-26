import React from "react";
import Link from "next/link";
import Rating from "./Rating";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import { faHeart as faHeartReg } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { titleDogpatch, titleFavorites, titleSave } from "../lib/defaults";

type PropType = {
  title: string;
  placeId?: string;
  rating?: string;
  rateCount?: number;
  isHomepage: boolean;
};

const HeaderSession: React.FC<PropType> = ({
  title,
  placeId,
  rating,
  rateCount,
  isHomepage,
}) => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  let right = null;

  if (status === "loading") {
    right = (
      <div className="mt-4 flex md:ml-6 md:mt-0">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="mt-4 flex md:ml-6 md:mt-0">
        <Button
          title={titleFavorites}
          buttonColor="button_colors_pink"
          link="/"
        />
        <Link href="/api/auth/signin">
          <a
            data-active={isActive("/signup")}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Log in
          </a>
        </Link>
      </div>
    );
  }

  if (session) {
    right = (
      <div className="mt-4 flex md:ml-6 md:mt-0">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Button
          title={titleFavorites}
          buttonColor="button_colors_pink"
          link="/"
        />
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
      </div>
    );
  }

  let titleData;

  if (!isHomepage) {
    titleData = (
      <div>
        <div className="flex items-center justify-between gap-x-4 text-xs">
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h1>
          <Rating placeId={placeId} rating={rating} rateCount={rateCount} />
        </div>
        <a
          href="/"
          className="inline-flex items-center rounded-md bg-gray-100 px-3 py-2 mt-3 text-xs font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {titleDogpatch}
        </a>
      </div>
    );
  } else {
    titleData = (
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        {title}
      </h1>
    );
  }

  return (
    <nav className="py-6 max-w-7xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        {titleData}
        <div className="flex">
          {/* {!isHomepage && (
            <ButtonIcon iconName={faHeartReg} color="gray" title={titleSave} />
          )} */}
          {right}
        </div>
      </div>
    </nav>
  );
};

export default HeaderSession;
