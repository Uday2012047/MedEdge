// Home Page
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useSession, signIn, getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      Router.push("/profile");
    }
  }, []);
  return (

    <header >
      {/* navbar */}
      <div className="flex  bg-blue-200 text-black h-[60px] ">
        {/* left */}
        <div className="flex items-center m-4 ">
          {/* <Link to={"/"}> */}
          <img className="h-[35px] w-[100px] m-2" src={"../images/mededg_logo.png"} />
          {/* </Link> */}

          {/* <div className="pl-4 pt-5">

          </div> */}
          <div className="pr-4 pl-9 ">
            <div className="text-xs xl:text-sm">Any where </div>
            <div className="text-sm xl:text-base font-bold"> India</div>

          </div>
        </div>
        {/* middle */}
        <div className="flex grow relative items-center ">
          {/* <Search /> */}
        </div>
        {/* right */}
        <div className="flex items-center m-4">
          <div className="pr-4 pl-4">
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()} >Sign in/Sign Up</button>
          </div>

          <div className=" flex pr-3 pl-3">

          </div>
          {/* </Link> */}
        </div>
      </div>
      <div className="flex bg-blue-300 text-green-700 font-semibold items-center  space-x-3 text-xl xl:text-xl p-2 pl-52">
        <div>Better </div>
        <div> Healthcare</div>
        <div> for </div>
        <div> the </div>
        <div> World</div>
      </div>

      {/* homepage */}
      <div class="relative h-screen">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-black"> <img className="h-screen w-screen" src={"../images/Home_bg.jpg"} /></div>
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent"></div>
        <div class="absolute top-0 left-0 w-full h-full flex m-10 ">
          <div class="text-white text-center">
            <p class="text-2xl font-bold">WELCOME TO MEDEDGE</p>
            <p class="text-lg p-6">Additional paragraph content</p>
            <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => signIn()} >Sign in/Sign Up</button>
          </div>

        </div>
      </div>
      {/* footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 m-4">
          <div className="flex items-center justify-between">
            <p className="text-white">Some content here</p>
            <p className="text-white">Some content here</p>
            <p className="text-white">Some content here</p>
            <p className="text-white">Some content here</p>


          </div>
          <div className="flex space-x-5 items-center justify-center m-5 p-5">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
              <FontAwesomeIcon className="h-7 w-7" icon={faTwitter} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
              <FontAwesomeIcon className="h-7 w-7" icon={faFacebook} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600  hover:text-white">
              <FontAwesomeIcon className="h-7 w-7" icon={faInstagram} />
            </a>
            <a href="https://www.linkedin.com/your-profile-url" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
              <FontAwesomeIcon className="h-7 w-7" icon={faLinkedin} size="lg" />
            </a>
          </div>
          <p className="text-gray-400 text-center mt-4">
            &copy; {new Date().getFullYear()} MedEdge_NITS. All rights reserved.
          </p>
        </div>
      </footer>




    </header>





  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
