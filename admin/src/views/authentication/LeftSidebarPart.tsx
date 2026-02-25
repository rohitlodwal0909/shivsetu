import Bgimg from '/src/assets/images/logos/login1.png';

const LeftSidebarPart = () => {
  return (
    <>
      {/* <div className="circle-top"></div> */}

      <div>
        <img src={Bgimg} alt="ShivSetu" className="circle-bottom" />
      </div>

      <div className="flex justify-center h-screen items-center z-10 relative">
        <div className="xl:w-7/12 xl:px-0 px-6">
          {/* Project Name */}
          <h2 className="text-dark text-[40px] font-bold leading-[normal]">ShivSetu</h2>

          {/* Tagline */}
          <p className="opacity-90 text-dark my-3 text-lg font-medium">
            शिवसेतु – पूजा, यात्रा और भक्ति के लिए एक दिव्य सेतु
          </p>

          {/* Description */}
          <p className="opacity-75 text-dark my-4 text-base font-medium">
            A divine platform to manage temple services, yatras, bhakt registrations, and spiritual
            activities with secure and seamless administration.
          </p>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarPart;
