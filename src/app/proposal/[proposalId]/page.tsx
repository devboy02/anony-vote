"use client";
import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

const ProposalPage = ({ params }: any) => {
  const proposalId = params.proposalId;
  return (
    <div className={"flex flex-col w-full"}>
      <div className={"w-full h-screen flex gap-[16px] flex-col pt-[96px] pb-[32px] pl-[256px] pr-[40px]"}>
        <div className={"w-full flex flex-col gap-[4px] pl-[28px]"}>
          <div className={"flex items-center gap-[12px]"}>
            <div className={"relative w-[32px] h-[32px]"}>
              <img
                src="/example4.png"
                className={
                  "absolute z-[10] rounded-full left-0 bottom-0 w-[24px] h-[24px] border border-1 border-[#FAF5F0]"
                }
              />
              <img src="/example3.png" className={"absolute rounded-full top-0 right-0 w-[20px] h-[20px] "} />
            </div>
            <div className={"flex items-center gap-1 text-[17px] font-medium"}>
              <p className={"text-[#9B9B9B]"}>Aave by</p>
              <p className={""}>gauntletgov.eth</p>
            </div>
          </div>
          <p className={"text-[32px] leading-[40px] font-semibold"}>Gauntlet Cap Recommendations for Polygon v3</p>
        </div>
        <div className="w-full h-full flex gap-[16px]">
          <div className="w-full h-full rounded-3xl flex flex-col items-center p-[16px] bg-[#F5EDE6] justify-between">
            <div className="bg-black/5 rounded-full px-[14px] py-[4px] w-fit">00:08:23</div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-12">
                <div className="flex flex-col items-center font-medium gap-2">
                  <img
                    src="/example4.png"
                    alt=""
                    className="w-[120px] rounded-full ring-2 ring-green-500 ring-offset-4"
                  />
                  <p>ardasari.eth</p>
                </div>
                <div className="flex flex-col gap-2 items-center font-medium">
                  <img src="/example3.png" alt="" className="w-[120px] rounded-full" />
                  <p>oclar.eth</p>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center mt-32">
                <p className={"text-black/75 font-semibold pb-2"}>Will Speak</p>
                <div className="flex items-center justify-center w-[50%] gap-8">
                  <div className="flex flex-col items-center font-medium gap-2">
                    <img src="/example4.png" alt="" className="w-[60px] rounded-full" />
                    <p>vito.eth</p>
                  </div>
                  <div className="flex flex-col items-center font-medium gap-2">
                    <img src="/example4.png" alt="" className="w-[60px] rounded-full" />
                    <p>ardasari.eth</p>
                  </div>
                  <div className="flex flex-col items-center font-medium gap-2">
                    <img src="/example3.png" alt="" className="w-[60px] rounded-full" />
                    <p>micho.eth</p>
                  </div>
                  <div className="flex flex-col items-center font-medium gap-2">
                    <img src="/examplepp.png" alt="" className="w-[60px] rounded-full" />
                    <p>exoc.eth</p>
                  </div>
                  <div className="flex flex-col items-center font-medium gap-2">
                    <img src="/examplepp.png" alt="" className="w-[60px] rounded-full" />
                    <p>tetdd.eth</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex -space-x-[8px] items-center">
                <img
                  className="w-[42px] aspect-square border-2 rounded-full border-[#F5EDE6]"
                  src="/examplepp.png"
                  alt=""
                />
                <img
                  className="w-[42px] aspect-square border-2 rounded-full border-[#F5EDE6]"
                  src="/examplepp.png"
                  alt=""
                />
                <img
                  className="w-[42px] aspect-square border-2 rounded-full border-[#F5EDE6]"
                  src="/examplepp.png"
                  alt=""
                />
                <p className="pl-4">+256 listening</p>
              </div>
              <div className="flex items-center gap-[12px]">
                <button className="flex items-center gap-2 text-red-500 bg-white rounded-full px-[28px] py-[16px]">
                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.1503 4.90824e-07H11.3497C11.9305 -1.21136e-05 12.4224 -2.27848e-05 12.8256 0.0329198C13.2483 0.0674595 13.6556 0.142833 14.0437 0.340608C14.6317 0.640212 15.1098 1.11828 15.4094 1.70628C15.6072 2.09444 15.6825 2.50167 15.7171 2.92442C15.75 3.32764 15.75 3.81946 15.75 4.40034L15.75 7.5H13.875V4.4375C13.875 3.80948 13.8743 3.39484 13.8483 3.0771C13.8232 2.77031 13.7794 2.63729 13.7388 2.55752C13.6189 2.32231 13.4277 2.13109 13.1925 2.01125C13.1127 1.9706 12.9797 1.92676 12.6729 1.90169C12.3552 1.87573 11.9405 1.875 11.3125 1.875H5.1875C4.55947 1.875 4.14484 1.87573 3.8271 1.90169C3.5203 1.92676 3.38729 1.9706 3.30751 2.01125C3.07231 2.13109 2.88109 2.32231 2.76124 2.55752C2.7206 2.63729 2.67676 2.77031 2.65169 3.0771C2.62573 3.39484 2.625 3.80948 2.625 4.4375V15.5625C2.625 16.1905 2.62573 16.6052 2.65169 16.9229C2.67676 17.2297 2.7206 17.3627 2.76124 17.4425C2.88109 17.6777 3.07231 17.8689 3.30751 17.9888C3.38729 18.0294 3.5203 18.0732 3.8271 18.0983C4.14484 18.1243 4.55948 18.125 5.1875 18.125H11.3125C11.9405 18.125 12.3552 18.1243 12.6729 18.0983C12.9797 18.0732 13.1127 18.0294 13.1925 17.9888C13.4277 17.8689 13.6189 17.6777 13.7388 17.4425C13.7794 17.3627 13.8232 17.2297 13.8483 16.9229C13.8743 16.6052 13.875 16.1905 13.875 15.5625V12.5H15.75L15.75 15.5997C15.75 16.1805 15.75 16.6724 15.7171 17.0756C15.6825 17.4983 15.6072 17.9056 15.4094 18.2937C15.1098 18.8817 14.6317 19.3598 14.0437 19.6594C13.6556 19.8572 13.2483 19.9325 12.8256 19.9671C12.4224 20 11.9306 20 11.3497 20H5.15028C4.56943 20 4.07763 20 3.67441 19.9671C3.25167 19.9325 2.84444 19.8572 2.45628 19.6594C1.86828 19.3598 1.39021 18.8817 1.09061 18.2937C0.892832 17.9056 0.817459 17.4983 0.782919 17.0756C0.749975 16.6724 0.749987 16.1806 0.750001 15.5998V4.4003C0.749987 3.81946 0.749975 3.32762 0.782919 2.92442C0.817459 2.50167 0.892832 2.09444 1.09061 1.70628C1.39021 1.11828 1.86828 0.640212 2.45628 0.340608C2.84444 0.142833 3.25167 0.0674595 3.67441 0.0329198C4.07761 -2.27848e-05 4.56948 -1.21136e-05 5.1503 4.90824e-07ZM19.2514 14.6984C18.9002 15.0788 18.3071 15.1026 17.9266 14.7514C17.5462 14.4002 17.5224 13.8071 17.8736 13.4266L20.1713 10.9375H10.4375C9.91973 10.9375 9.5 10.5178 9.5 10C9.5 9.48223 9.91973 9.0625 10.4375 9.0625H20.1713L17.8736 6.57338C17.5224 6.19293 17.5462 5.59981 17.9266 5.24862C18.3071 4.89743 18.9002 4.92115 19.2514 5.30161L23.0014 9.36411C23.3329 9.72323 23.3329 10.2768 23.0014 10.6359L19.2514 14.6984Z"
                      fill="#FF3A01"
                    />
                  </svg>
                  Leave
                </button>
                <button className="flex items-center gap-2 text-black  bg-white rounded-full px-[28px] py-[16px]">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.875 3.75V10C11.875 10.168 11.8529 10.3308 11.8115 10.4857L8.125 6.79917V3.75C8.125 2.71447 8.96447 1.875 10 1.875C11.0355 1.875 11.875 2.71447 11.875 3.75ZM6.25 4.92417L1.60041 0.274587C1.2343 -0.0915291 0.640704 -0.0915291 0.274587 0.274587C-0.0915291 0.640704 -0.0915291 1.2343 0.274587 1.60041L18.3996 19.7254C18.7657 20.0915 19.3593 20.0915 19.7254 19.7254C20.0915 19.3593 20.0915 18.7657 19.7254 18.3996L15.4791 14.1533C16.3551 12.9995 16.875 11.5604 16.875 10V8.4375C16.875 7.91973 16.4553 7.5 15.9375 7.5C15.4197 7.5 15 7.91973 15 8.4375V10C15 11.0419 14.6813 12.0094 14.1361 12.8103L13.2308 11.905C13.5607 11.3467 13.75 10.6954 13.75 10V3.75C13.75 1.67893 12.0711 0 10 0C7.92893 0 6.25 1.67893 6.25 3.75V4.92417ZM9.92341 13.7492L6.25077 10.0766C6.29104 12.0868 7.91317 13.709 9.92341 13.7492Z"
                      fill="black"
                    />
                    <path
                      d="M5 10C5 12.7614 7.23858 15 10 15C10.3642 15 10.7193 14.9611 11.0613 14.8871L12.5577 16.3835C12.0452 16.589 11.5023 16.7346 10.9375 16.8116V18.125H14.0625C14.1596 18.125 14.2533 18.1398 14.3413 18.1672L14.9578 18.7837C14.9852 18.8717 15 18.9654 15 19.0625C15 19.5803 14.5803 20 14.0625 20H5.9375C5.41973 20 5 19.5803 5 19.0625C5 18.5447 5.41973 18.125 5.9375 18.125H9.0625V16.8116C5.70905 16.3544 3.125 13.479 3.125 10V8.4375C3.125 8.03549 3.37803 7.69258 3.73352 7.55935C3.83588 7.52098 3.94674 7.5 4.0625 7.5C4.58027 7.5 5 7.91973 5 8.4375V10Z"
                      fill="black"
                    />
                  </svg>
                  Unmute
                </button>
              </div>
            </div>
          </div>
          {/*
                <div className="w-[500px] p-0 h-full bg-[#F5EDE6] rounded-3xl flex flex-col text-center items-center justify-center overflow-hidden">
          <svg
            width="396"
            height="192"
            viewBox="0 0 396 192"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M170.751 13.5686C182.338 16.6734 193.703 23.6894 202.144 31.4752L202.347 31.6625C210.674 39.3979 216.103 47.8659 215.999 53.9998C219.753 47.241 226.044 39.8105 235.892 36.704L235.939 36.6893C241.839 34.8385 249.014 34.539 257.681 36.8614C286.32 44.5353 297.596 59.889 294.728 84.0581C291.523 116.284 267.143 163.407 190.145 188.869L189.707 189.015C188.161 189.539 185.597 190.407 182.863 190.327C181.705 190.292 180.546 190.12 179.422 189.818C178.297 189.517 177.207 189.087 176.187 188.538C173.78 187.241 171.993 185.206 170.915 183.98L170.61 183.635C116.658 123.085 91.5814 68.1179 104.919 38.6067C114.52 16.2414 142.113 5.89495 170.751 13.5686ZM48 96C48 102.627 33.9411 108 24 108C14.0589 108 12 102.627 12 96C12 89.3726 20.0589 84 30 84C39.9411 84 48 89.3726 48 96ZM354 102C363.941 102 378 107.373 378 114C378 120.627 369.941 126 360 126C350.059 126 342 120.627 342 114C342 107.373 344.059 102 354 102ZM60 111C60 102.716 68.0589 96 78 96C87.9411 96 96 102.716 96 111C96 119.284 90 126 84 126C78 126 60 119.284 60 111ZM402 114C392.059 114 384 107.284 384 99C384 90.7157 402 84 408 84C414 84 420 90.7157 420 99C420 107.284 411.941 114 402 114ZM-24 105C-24 109.971 -18.6274 114 -12 114C-5.37258 114 0 109.971 0 105C0 100.029 -4 96 -8 96C-12 96 -24 100.029 -24 105ZM312 96C305.373 96 300 100.029 300 105C300 109.971 312 114 316 114C320 114 324 109.971 324 105C324 100.029 318.627 96 312 96Z"
                fill="black"
                fill-opacity="0.1"
              />
            </g>
          </svg>
          <div className={"flex flex-col items-center mt-[48px]"}>
            <p
              className={
                "text-black mix-blend-mode-darken opacity-50 font-semibold"
              }
            >
              Dots will appear here
            </p>
            <p
              className={
                "max-w-[300px] mt-[8px] text-black mix-blend-mode-darken opacity-25 font-medium"
              }
            >
              You can rate the other speakers as they take their turn
            </p>
            <button
              className={
                "mt-auto border border-black/[5%] text-[17px] px-[20px] py-[8px] leading-[24px] rounded-full font-semibold mt-[16px]"
              }
            >
              See how it works
            </button>
          </div>
        </div>
        */}
          <div className="w-[500px] p-0 h-full bg-[#F5EDE6] rounded-3xl flex flex-col items-center overflow-hidden">
            <div className={"h-full w-full p-[28px] flex flex-col gap-[24px]"}>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    arda.eth
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-red-400 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    sari.eth
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                   little.eth
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-green-400 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    penguin.eth
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    please.eth
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-red-400 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/example3.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    random.eth
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/example4.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    text.eth
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-red-400 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    willbehere.eth
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    randomtext.eth
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-green-400 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    example.eth
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    willbehere.eth
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-green-400 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    Randomtextwillbehere
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/example3.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    illbehere
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-red-400 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/example4.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    lbeheress
                  </p>
                </div>
              </div>
              <div className={"flex items-center justify-between"}>
                <div className={"flex items-center gap-1"}>
                  <img src="/example3.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    omtextw
                  </p>
                </div>
                <div className={"flex items-center gap-1 "}>
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[8px] aspect-square bg-gray-400 rounded-full"} />
                  <div className={"w-[10px] aspect-square bg-black/10 rounded-full"} />
                  <div className={"w-[12px] aspect-square bg-black/10 rounded-full"} />
                </div>
                <div className={"flex items-center gap-1"}>
                  <img src="/examplepp.png" className={"h-[20px] aspect-square"} />
                  <p className={"text-black/75 w-[72px] text-ellipsis overflow-hidden text-[15px] font-medium"}>
                    Randomtextwillbehere
                  </p>
                </div>
              </div>
            </div>
            <div
              className={"h-[160px] w-[calc(100%-16px)] mb-[8px] rounded-2xl bg-white p-[20px] pb-[28px] flex flex-col"}
            >
              <div className={"flex items-center"}>
                <div className={"flex items-center gap-[8px]"}>
                  <img src="/examplepp.png" className={"w-[20px] h-[20px]"} />
                  <p className={"text-black/50 mix-blend-mode-darker font-medium text-[15px]"}>
                    <span className={"text-black"}>Emirhan </span>is speaking
                  </p>
                </div>
                <div
                  className={
                    "bg-[#F5EDE6] px-[12px] py-[4px] rounded-full ml-auto text-[15px] leading-[20px] font-medium text-[#756D66] "
                  }
                >
                  4 <span className={"text-[#B5ADA6]"}>:</span> 59
                </div>
              </div>
              <p className={"text-[17px] leading-[24px] font-semibold"}>Vote when you feel ready</p>
              <div className={"flex items-center justify-between mt-auto"}>
                <p className={"text-[15px] text-black/50 font-medium"}>Disagree</p>
                <div className={"flex items-center gap-[6px]"}>
                  <div className={"flex items-center gap-1 "}>
                    <div className={"w-[18px] aspect-square bg-black/10 hover:bg-red-400 rounded-full cursor-pointer"} />
                    <div className={"w-[14px] aspect-square bg-black/10 hover:bg-red-400 rounded-full cursor-pointer"} />
                    <div className={"w-[10px] aspect-square bg-black/10 hover:bg-gray-400 rounded-full cursor-pointer"} />
                    <div className={"w-[14px] aspect-square bg-black/10 hover:bg-green-400 rounded-full cursor-pointer"} />
                    <div className={"w-[18px] aspect-square bg-black/10 hover:bg-green-400 rounded-full cursor-pointer"} />
                  </div>
                </div>
                <p className={"text-[15px] text-black/50 font-medium"}>Agree</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={"pl-[256px] pr-[40px] pb-[64px]"}>
        <Tabs.Root>
          <Tabs.List className={"flex items-center gap-[8px]"}>
            <Tabs.Trigger value="tab1" className={"px-[20px] py-[8px] data-[state=active]:bg-white rounded-full"}>
              Proposal details
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" className={"px-[20px] py-[8px] data-[state=active]:bg-white rounded-full"}>
              Dot collector
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <p className={"pl-[20px] pr-[400px] text-[20px] font-medium leading-[28px] pt-[32px]"}>
              <p>
                A proposal to make parameter changes on the Polygon Aave v3 market. For more details, see the full forum
                post here.
              </p>
              <p className={"mt-4"}>
                Per Gauntlet’s supply and borrow cap methodology, we recommend setting supply and borrow caps for agEUR
                and jEUR. Currently agEUR borrowing is disabled as borrowing and cannot be used as collateral. jEUR is
                frozen. Despite this, all assets should have supply and borrow caps.
              </p>
            </p>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <img src="/table.png" className={"w-[400px] mt-12"} alt=""/>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default ProposalPage;
