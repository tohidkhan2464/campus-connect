import React from "react";
import email from "../assets/email.svg";
import linkedin from "../assets/linkedin.svg";
import github from "../assets/github.svg";
import whatsapp from "../assets/whatsapp.svg";
import phone from "../assets/phone.svg";
import insta from "../assets/instagram.svg";
import { AiOutlineTrademark } from "react-icons/ai";

function Footer() {
  return (
    <div>
      <div className="w-10/12  max-w-[1080px] mx-auto relative pt-4">
        <h2 className="font-mullish text-center text-2xl leading-[1.2] text-white font-extrabold">
          Let's work together...
        </h2>
        <div class="w-16 h-1 bg-greenLight mx-auto mt-4 mb-14 "></div>

        <div className="max-w-10/12 flex flex-row justify-evenly items-center realtive gap-4 my-2 mx-auto">
          <a
            href="mailto:tohid1193407@gmail.com?"
            className="flex flex-col items-center justify-center cursor-pointer rounded-[10px] w-14 h-14 bg-white
                    hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-2 transition-all duration-300 shadow shadow-white "
          >
            <img src={email} className="w-12 h-12" alt="logo"></img>
          </a>

          <a
            href="https://www.linkedin.com/in/tohidkhan324/"
            className="flex flex-col items-center justify-center cursor-pointer rounded-[10px] w-14 h-14 bg-white
                    hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-2 transition-all duration-300 shadow shadow-white "
          >
            <img src={github} className="w-12 h-12" alt="logo"></img>
          </a>

          <a
            href="https://www.linkedin.com/in/tohidkhan324/"
            className="flex flex-col items-center justify-center cursor-pointer rounded-[10px] w-14 h-14 bg-white
                    hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-2 transition-all duration-300 shadow shadow-white "
          >
            <img src={linkedin} className="w-12 h-12" alt="logo"></img>
          </a>
          <a
            href="https://www.instagram.com/tohidkhan_30/"
            className="flex flex-col items-center justify-center cursor-pointer rounded-[10px] w-14 h-14 bg-white
                    hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-2 transition-all duration-300 shadow shadow-white "
          >
            <img src={insta} className="w-12 h-12" alt="logo"></img>
          </a>
          <a
            href="tel:919772079668"
            className="flex flex-col items-center justify-center cursor-pointer rounded-[10px] w-14 h-14 bg-white
                    hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-2 transition-all duration-300 shadow shadow-white "
          >
            <img src={phone} className="w-12 h-12" alt="logo"></img>
          </a>
          <a
            href="https://wa.me/916367097548"
            className="flex flex-col items-center justify-center cursor-pointer rounded-[10px] w-14 h-14 bg-white
                    hover:shadow-lg hover:shadow-slate-500 hover:-translate-y-2 transition-all duration-300 shadow shadow-white "
          >
            <img src={whatsapp} className="w-12 h-12" alt="logo"></img>
          </a>
        </div>
      </div>

      <div className="w-10/12  max-w-[1080px] mx-auto relative pt-4">
        <div class="w-16 h-1 bg-greenLight mx-auto  mt-4 mb-6 "></div>
        <div className="flex flex-row relative justify-center items-center">
          <p className="font-mullish text-center text-lg leading-[1.2] text-white font-extrabold">
            ©Campus Connect. All rights reserved
            
          </p>
        </div>
        <div class="w-16 h-1 bg-greenLight mx-auto  mt-4"></div>
      </div>
    </div>
  );
}

export default Footer;
