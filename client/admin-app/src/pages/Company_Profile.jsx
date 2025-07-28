import React, { useEffect } from "react";
import { Link } from "react-router";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";

export default function Company_Profile() {
  useEffect(() => {
    $(".dropify").dropify({
      messages: {
        default: "Drag and drop",
      },
      tpl: {
        message: `<div class="dropify-message"><span class="file-icon" /> <p class="text-[25px]">{{ default }}</p></div>`,
      },
    });
  });
  return (
    <>
      <div className=" bg-[#F1F4F5] p-5 border-t-3 border-gray-300">
        <div className=" ">
          <h1 className="text-[22px]">Company Profile</h1>
          <div className="flex gap-1 text-[18px]">
            <Link to="/dashboard" className="text-[blue]">
              <h1>Dashboard </h1>
            </Link>{" "}
            / <h1> Company Profile</h1>
          </div>
        </div>
        <div className="p-4 shadow-md bg-[#fff] rounded-[10px] overflow-hidden mt-5">
          <form action="">
            <div className="">
              <div>
                <div className="flex lg:flex-nowrap flex-wrap gap-4 mt-2">
                  <div className="lg:w-[40%] w-full">
                    <label className="mb-1">
                      <b>Category Image</b>
                    </label>
                    <input
                      type="file"
                      className="dropify text-[15px]"
                      data-height="250"
                    />
                  </div>
                  <div className="lg:w-[60%] w-full">
                    <div className="flex flex-col mt-4">
                      <label className="mb-1">
                        <b>Name</b>
                      </label>
                      <input
                        type="text"
                        className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                        placeholder="Name"
                        required
                      />
                    </div>

                    <div className="flex flex-col mt-4">
                      <label className="mb-1">
                        <b>Email</b>
                      </label>
                      <input
                        type="text"
                        className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label className="mb-1">
                        <b>Mobile Number</b>
                      </label>
                      <input
                        type="text"
                        className=" border border-[#0000004a]  rounded-[5px] outline-0 px-3 py-1 "
                        placeholder="Mobile Number"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-4">
                <label className="mb-1">
                  <b>Address</b>
                </label>
                <textarea
                  className=" border border-[#0000004a] h-[90px] rounded-[5px] outline-0 px-3 py-1 "
                  placeholder="Address"
                  required
                />
              </div>

              <div className="flex flex-col mt-4">
                <label className="mb-1">
                  <b>Google Map URL</b>
                </label>
                <textarea
                  className=" border border-[#0000004a] h-[90px] rounded-[5px] outline-0 px-3 py-1 "
                  placeholder="Google Map URL"
                  required
                />
              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231374.05927515615!2d54.983620699247446!3d25.026617974776656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1744459564501!5m2!1sen!2sin"
                className="w-full mt-4"
                height="150"
                allowfullscreen=""
                loading="lazy"
              ></iframe>

              <button
                className="bg-[#7E22CE] text-[#fff] py-2 px-3 rounded-[8px] font-[500]  cursor-pointer my-4"
                onSubmit={(e) => e.preventDefault()}
              >
                Update Company Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
