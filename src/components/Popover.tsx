import React, { HtmlHTMLAttributes, RefObject } from "react";
import { createPopper } from "@popperjs/core";

export const Popover = (prop: { color: string }) => {
  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  const openPopover = () => {
    createPopper(btnRef.current as HTMLButtonElement, popoverRef.current as HTMLElement, {
      placement: "top-start"
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };
  return (
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <button
            className={
              "bg-" +
              prop.color +
              " text-dark active:bg-" +
              prop.color +
              " font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            }
            type="button"
            onClick={() => {
              popoverShow ? closePopover() : openPopover();
            }}
            ref={btnRef as RefObject<HTMLButtonElement>}
          >
            top {prop.color}
          </button>
          <div
            className={
              (popoverShow ? "" : "hidden ") +
              "bg-" +
              prop.color +
              " border-0 mb-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
            }
            ref={popoverRef as RefObject<HTMLDivElement>}
          >
            <div>
              <div
                className={
                  "bg-" +
                  prop.color +
                  " text-dark opacity-75 font-semibold p-3 mb-0 border-b border-solid border-slate-100 uppercase rounded-t-lg"
                }
              >
                {prop.color} popover title
              </div>
              <div className="text-dark p-3">
                And here's some amazing content. It's very engaging. Right?
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default function PopoverRender() {
  return (<Popover color="red" />);
}