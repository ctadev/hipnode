import React from 'react';

interface Props {
  iconName: string;
  color: string;
  className: string;
}

const HeaderIcon = ({ iconName, color, className }: Props) => {
  const home = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10618_5286)">
        <path d="M19.3437 7.51979L10.8797 0.339503C10.6386 0.121006 10.3249 -1.14441e-05 9.99954 -1.14441e-05C9.67419 -1.14441e-05 9.36046 0.121006 9.11939 0.339503L0.656299 7.51989C0.449643 7.70712 0.284482 7.93554 0.171448 8.19045C0.0584132 8.44537 1.08609e-05 8.72113 0 8.99999L0 19.3357C-1.99602e-09 19.5119 0.0699724 19.6808 0.194531 19.8054C0.31909 19.93 0.488037 20 0.664203 20L6 20C6.55229 20 7 19.5523 7 19V15C7 14.436 7.55209 13.9788 8.11629 13.9788H11.8828C12.4471 13.9788 13 14.436 13 15V19C13 19.5523 13.4477 20 14 20H19.3358C19.512 20 19.6809 19.93 19.8055 19.8054C19.93 19.6808 20 19.5119 20 19.3357V8.99999C20 8.72113 19.9415 8.44536 19.8285 8.19043C19.7155 7.9355 19.5503 7.70706 19.3437 7.51979Z" />
      </g>
      <defs>
        <clipPath id="clip0_10618_5286">
          <rect width="20" height="20" />
        </clipPath>
      </defs>
    </svg>
  );

  const meetup = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10618_5289)">
        <path d="M16.3333 2.00004H15.2778V1.00004C15.2778 0.734825 15.1666 0.480471 14.9686 0.292935C14.7707 0.105399 14.5022 4.19617e-05 14.2222 4.19617e-05C13.9423 4.19617e-05 13.6738 0.105399 13.4758 0.292935C13.2779 0.480471 13.1667 0.734825 13.1667 1.00004V2.00004H6.83333V1.00004C6.83333 0.734825 6.72212 0.480471 6.52417 0.292935C6.32621 0.105399 6.05773 4.19617e-05 5.77778 4.19617e-05C5.49783 4.19617e-05 5.22934 0.105399 5.03139 0.292935C4.83343 0.480471 4.72222 0.734825 4.72222 1.00004V2.00004H3.66667C2.82681 2.00004 2.02136 2.31611 1.4275 2.87872C0.83363 3.44133 0.5 4.20439 0.5 5.00004V17C0.5 17.7957 0.83363 18.5588 1.4275 19.1214C2.02136 19.684 2.82681 20 3.66667 20H16.3333C17.1732 20 17.9786 19.684 18.5725 19.1214C19.1664 18.5588 19.5 17.7957 19.5 17V5.00004C19.5 4.20439 19.1664 3.44133 18.5725 2.87872C17.9786 2.31611 17.1732 2.00004 16.3333 2.00004ZM5.77778 15C5.56901 15 5.36493 14.9414 5.19134 14.8315C5.01776 14.7216 4.88246 14.5655 4.80257 14.3827C4.72268 14.2 4.70178 13.9989 4.7425 13.805C4.78323 13.611 4.88377 13.4328 5.03139 13.2929C5.17901 13.1531 5.36709 13.0578 5.57185 13.0193C5.77661 12.9807 5.98884 13.0005 6.18172 13.0762C6.3746 13.1518 6.53945 13.28 6.65544 13.4445C6.77143 13.6089 6.83333 13.8023 6.83333 14C6.83333 14.2653 6.72212 14.5196 6.52417 14.7071C6.32621 14.8947 6.05773 15 5.77778 15ZM14.2222 15H10C9.72005 15 9.45156 14.8947 9.25361 14.7071C9.05565 14.5196 8.94444 14.2653 8.94444 14C8.94444 13.7348 9.05565 13.4805 9.25361 13.2929C9.45156 13.1054 9.72005 13 10 13H14.2222C14.5022 13 14.7707 13.1054 14.9686 13.2929C15.1666 13.4805 15.2778 13.7348 15.2778 14C15.2778 14.2653 15.1666 14.5196 14.9686 14.7071C14.7707 14.8947 14.5022 15 14.2222 15ZM17.3889 9.00004H2.61111V5.00004C2.61111 4.73483 2.72232 4.48047 2.92028 4.29294C3.11823 4.1054 3.38672 4.00004 3.66667 4.00004H4.72222V5.00004C4.72222 5.26526 4.83343 5.51961 5.03139 5.70715C5.22934 5.89468 5.49783 6.00004 5.77778 6.00004C6.05773 6.00004 6.32621 5.89468 6.52417 5.70715C6.72212 5.51961 6.83333 5.26526 6.83333 5.00004V4.00004H13.1667V5.00004C13.1667 5.26526 13.2779 5.51961 13.4758 5.70715C13.6738 5.89468 13.9423 6.00004 14.2222 6.00004C14.5022 6.00004 14.7707 5.89468 14.9686 5.70715C15.1666 5.51961 15.2778 5.26526 15.2778 5.00004V4.00004H16.3333C16.6133 4.00004 16.8818 4.1054 17.0797 4.29294C17.2777 4.48047 17.3889 4.73483 17.3889 5.00004V9.00004Z" />
      </g>
      <defs>
        <clipPath id="clip0_10618_5289">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const group = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="10" cy="15" rx="6" ry="3" />
      <circle cx="10" cy="6" r="4" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 3.46824C4.20385 4.0734 3.5 5.20451 3.5 6.5C3.5 7.79549 4.20385 8.9266 5.25 9.53176C4.7352 9.82956 4.1375 10 3.5 10C1.567 10 0 8.433 0 6.5C0 4.567 1.567 3 3.5 3C4.1375 3 4.7352 3.17044 5.25 3.46824Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.75 3.46824C15.7962 4.0734 16.5 5.20451 16.5 6.5C16.5 7.79549 15.7962 8.9266 14.75 9.53176C15.2648 9.82956 15.8625 10 16.5 10C18.433 10 20 8.433 20 6.5C20 4.567 18.433 3 16.5 3C15.8625 3 15.2648 3.17044 14.75 3.46824Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4998 12C15.4999 12 15.4999 12 15.5 12C16.8807 12 18 13.1193 18 14.5C18 15.0628 17.814 15.5822 17.5002 16C18.8808 15.9999 20 14.8807 20 13.5C20 12.1193 18.8807 11 17.5 11C16.6821 11 15.9559 11.3928 15.4998 12Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.50018 12C4.50012 12 4.50006 12 4.5 12C3.11929 12 2 13.1193 2 14.5C2 15.0628 2.18598 15.5822 2.49982 16C1.11919 15.9999 0 14.8807 0 13.5C0 12.1193 1.11929 11 2.5 11C3.31791 11 4.04408 11.3928 4.50018 12Z"
      />
      <circle cx="16.5" cy="3.5" r="3" stroke="#262D34" />
    </svg>
  );

  const podcast = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10618_6321)">
        <path d="M18.706 8.56786V8.32507C18.706 7.32989 17.8589 6.48047 16.7531 6.23771C16.3767 2.74254 13.4825 -0.00012207 10.0001 -0.00012207C6.51772 -0.00012207 3.62359 2.74245 3.24711 6.23771C2.11774 6.48049 1.29417 7.32989 1.29417 8.32507V8.56786C0.564792 8.71346 0 9.44164 0 10.2912C0 11.165 0.56475 11.8688 1.29417 12.0146V12.2574C1.29417 13.4468 2.47064 14.4176 3.92943 14.4176H4.47056V6.89336C4.51767 3.8108 6.98831 1.31086 10 1.31086C13.0352 1.31086 15.5294 3.85943 15.5294 7.01471V14.4176H16.0706C17.5059 14.4176 18.7058 13.4468 18.7058 12.2574V12.0146C19.4352 11.869 20 11.1408 20 10.2912C20 9.41728 19.4352 8.71349 18.7058 8.56786H18.706Z" />
        <path d="M14.0444 11C13.621 11 13.2914 11.3398 13.2914 11.7768C13.2914 13.6457 11.809 15.1747 9.99737 15.1747C8.18556 15.1747 6.70332 13.6456 6.70332 11.7768C6.70332 11.34 6.37392 11 5.95029 11C5.52685 11 5.19727 11.3398 5.19727 11.7768C5.19727 14.2525 6.96198 16.3399 9.33842 16.6797V19.3446C9.33842 19.7086 9.62072 20 9.97376 20C10.3266 20 10.6091 19.6844 10.6091 19.3446V16.6553C12.9855 16.3155 14.7739 14.2523 14.7739 11.7524C14.7973 11.3398 14.4679 11 14.0444 11Z" />
        <path d="M9.99915 13.6846C8.75209 13.6846 7.74023 12.641 7.74023 11.3544V6.33018C7.74023 5.04377 8.75192 4 9.99915 4C11.2462 4 12.2581 5.0436 12.2581 6.33018V11.3544C12.2581 12.6408 11.2462 13.6844 9.99915 13.6844V13.6846Z" />
      </g>
      <defs>
        <clipPath id="clip0_10618_6321">
          <rect width="20" height="20" />
        </clipPath>
      </defs>
    </svg>
  );

  const message = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10618_6339)">
        <path d="M19.9768 9.1546C19.7908 6.39176 18.3955 3.81175 16.186 2.0993C13.9769 0.386682 11.093 -0.32109 8.30222 0.135523C3.32541 0.980455 -0.325798 5.50121 0.0230434 10.4787C0.185915 12.8762 1.20906 15.0909 2.93006 16.7806C2.48815 17.4199 2.09284 17.8309 1.04635 18.6529C0.837086 18.8128 0.743975 19.0638 0.813727 19.315C0.860285 19.5662 1.04635 19.7716 1.27881 19.8401C1.62758 19.9543 2.13924 20 2.72065 20C3.95322 20 5.51134 19.7261 6.7207 19.1095C8.32541 19.6576 10.0462 19.7945 11.744 19.4977C16.7208 18.63 20.3255 14.0863 19.9767 9.15445L19.9768 9.1546ZM5.34874 11.5976C4.44175 11.5976 3.72085 10.8898 3.72085 9.99937C3.72085 9.10889 4.44175 8.40112 5.34874 8.40112C6.25573 8.40112 6.97662 9.10889 6.97662 9.99937C6.97662 10.8898 6.25573 11.5976 5.34874 11.5976ZM9.99996 11.5976C9.09297 11.5976 8.37207 10.8898 8.37207 9.99937C8.37207 9.10889 9.09297 8.40112 9.99996 8.40112C10.9069 8.40112 11.6278 9.10889 11.6278 9.99937C11.6278 10.8898 10.9069 11.5976 9.99996 11.5976ZM14.6512 11.5976C13.7442 11.5976 13.0233 10.8898 13.0233 9.99937C13.0233 9.10889 13.7442 8.40112 14.6512 8.40112C15.5582 8.40112 16.2791 9.10889 16.2791 9.99937C16.2791 10.8898 15.5582 11.5976 14.6512 11.5976Z" />
      </g>
      <defs>
        <clipPath id="clip0_10618_6339">
          <rect width="20" height="20" />
        </clipPath>
      </defs>
    </svg>
  );

  const notification = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10618_6343)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.3325 13.0613H17.9128C19.069 13.0613 20 13.9747 20 15.1015V15.511C20 15.9648 19.6268 16.3266 19.1661 16.3266H0.833873C0.372903 16.3266 0 15.9613 0 15.511V15.1015C0 13.9752 0.93447 13.0613 2.08717 13.0613H1.66748C2.12554 13.0613 2.49994 12.6955 2.49994 12.2442V7.34691C2.49994 3.28752 5.85782 0 10.0001 0C14.1434 0 17.5003 3.28927 17.5003 7.34691V12.2442C17.5003 12.6983 17.8729 13.0613 18.3327 13.0613H18.3325ZM7.08301 17.1429H12.9163C12.9163 18.7208 11.6104 20 9.99967 20C8.38892 20 7.08301 18.7208 7.08301 17.1429Z"
        />
        <circle cx="16.5" cy="3.5" r="3" stroke="#262D34" />
      </g>
      <defs>
        <clipPath id="clip0_10618_6343">
          <rect width="20" height="20" />
        </clipPath>
      </defs>
    </svg>
  );

  const arrowdown = (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M10 0H2C1.17595 0 0.705573 0.940764 1.2 1.6L5.2 6.93333C5.6 7.46667 6.4 7.46667 6.8 6.93333L10.8 1.6C11.2944 0.940764 10.824 0 10 0Z" />
    </svg>
  );

  const search = (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="2" />
      <path
        d="M14.5 15.5L18.5 19.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  const profile = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.05254 9.02636C7.92096 9.65799 8.94727 10 10 10C11.0526 10 12.0789 9.65784 12.9474 9.02636C14.2369 8.10521 15 6.57888 15 5.00002C15 2.23681 12.7631 0 10 0C7.23679 0 5 2.23695 5 5.00002C4.99982 6.57888 5.76306 8.10521 7.05244 9.02636H7.05254Z" />
      <path d="M19.8807 17.7561C19.8091 17.3659 19.7376 16.9756 19.6182 16.6098C18.783 13.7073 16.7309 11.3659 14.0346 10.1463C13.8674 10.3172 13.6767 10.4878 13.4618 10.6341C12.5074 11.3413 11.4097 11.7073 10.2404 11.7073C9.07109 11.7073 7.94959 11.3415 7.01898 10.6341C6.75649 10.439 6.5178 10.2195 6.30308 10C2.69999 11.4635 0.194463 15 0.00356825 19.0244C-0.0200673 19.2682 0.075307 19.5122 0.242421 19.7074C0.409534 19.9025 0.671848 20 0.910551 20H19.0694C19.3319 20 19.5706 19.9025 19.7375 19.7074C19.9046 19.5122 20 19.2684 20 19.0001C20 18.8781 20 18.7562 19.9762 18.6587C19.976 18.3659 19.9284 18.0487 19.8807 17.7561L19.8807 17.7561Z" />
    </svg>
  );

  const setting = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.4697 3.8445L19.8831 6.15523C20.1244 6.54935 19.9798 7.05763 19.5622 7.28491L19.0669 7.55492C18.3085 7.96824 17.8745 8.67768 17.8745 9.50445V10.495C17.8745 11.3218 18.3087 12.0312 19.0669 12.4445L19.5622 12.7145C19.9798 12.9417 20.1238 13.4499 19.8831 13.8442L18.4697 16.1549C18.2284 16.5491 17.6904 16.685 17.2726 16.4578L16.7767 16.1878C16.0178 15.7745 15.1489 15.7745 14.3907 16.1884L13.4825 16.6837C12.7248 17.097 12.2908 17.8065 12.2908 18.6326V19.1726C12.2908 19.6276 11.8961 20 11.4141 20H8.58733C8.10518 20 7.71061 19.6275 7.71061 19.1726V18.6326C7.71061 17.8066 7.27724 17.0972 6.51891 16.6837L5.61072 16.1884C4.85176 15.7744 3.98287 15.7744 3.22391 16.1878L2.72736 16.4584C2.30973 16.6856 1.77114 16.5496 1.5303 16.1555L0.116864 13.8448C-0.124447 13.4507 0.0202161 12.9424 0.437846 12.7151L0.933145 12.4451C1.6921 12.0318 2.12547 11.3223 2.12547 10.4956V9.50443C2.12547 8.6784 1.69132 7.96823 0.933145 7.5549L0.437846 7.28489C0.0202161 7.05717 -0.123848 6.54949 0.116864 6.15522L1.5303 3.84449C1.77161 3.45037 2.30958 3.31441 2.72736 3.54157L3.22391 3.81216C3.98287 4.22549 4.85176 4.22549 5.61072 3.81158L6.51891 3.31631C7.27724 2.90298 7.71061 2.19355 7.71061 1.36737V0.82736C7.71061 0.372358 8.1053 0 8.58733 0H11.4141C11.8962 0 12.2908 0.372469 12.2908 0.82736V1.36737C12.2908 2.1934 12.7242 2.90283 13.4825 3.31631L14.3907 3.81158C15.1496 4.22561 16.0185 4.22561 16.7775 3.81216L17.274 3.54157C17.6917 3.31443 18.2303 3.45037 18.4711 3.84449L18.4697 3.8445ZM10.0001 6.15523C12.4598 6.15523 14 7.67874 14 10C14 12.3213 12.4598 13.8448 10.0001 13.8448C7.54032 13.8448 6 12.3208 6 9.99959C6 7.67832 7.54032 6.15523 10.0001 6.15523Z"
      />
    </svg>
  );

  const sun = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.99951 2.4473C7.67014 2.4473 7.40332 2.18622 7.40332 1.86424V0.583058C7.40332 0.260942 7.67028 0 7.99951 0C8.32875 0 8.59558 0.261074 8.59558 0.583058V1.86424C8.59558 2.18636 8.32875 2.4473 7.99951 2.4473Z" />
      <path d="M7.99951 15.9999C7.67014 15.9999 7.40332 15.7388 7.40332 15.417V14.1357C7.40332 13.8136 7.67028 13.5527 7.99951 13.5527C8.32875 13.5527 8.59558 13.8136 8.59558 14.1357V15.417C8.59558 15.7389 8.32875 15.9999 7.99951 15.9999Z" />
      <path d="M13.4622 5.566C13.2542 5.566 13.0521 5.45936 12.9424 5.26936C12.7805 4.98917 12.8816 4.63309 13.1685 4.47474L14.3093 3.84492C14.5959 3.68658 14.9598 3.78585 15.1216 4.06604C15.2835 4.34634 15.1822 4.70231 14.8954 4.86065L13.7549 5.49035C13.662 5.54172 13.5614 5.56601 13.4622 5.56601L13.4622 5.566Z" />
      <path d="M1.39651 12.2299C1.18867 12.2299 0.986255 12.1232 0.876735 11.9333C0.715173 11.6528 0.816326 11.2971 1.10295 11.1387L2.24378 10.509C2.53099 10.3505 2.89438 10.4497 3.05606 10.7301C3.21774 11.0107 3.1167 11.3664 2.82996 11.5247L1.68913 12.1544C1.59645 12.2059 1.49601 12.2299 1.3965 12.2299L1.39651 12.2299Z" />
      <path d="M2.53633 5.56616C2.43706 5.56616 2.33626 5.54209 2.24394 5.49084L1.1031 4.86103C0.816483 4.70268 0.714977 4.34704 0.876892 4.06641C1.03881 3.78622 1.40221 3.68683 1.68941 3.8453L2.83024 4.47511C3.11686 4.63312 3.21813 4.98909 3.05634 5.26949C2.94647 5.45928 2.74451 5.56614 2.53632 5.56614L2.53633 5.56616Z" />
      <path d="M14.6019 12.23C14.5026 12.23 14.4017 12.2059 14.3094 12.1547L13.1683 11.5246C12.8818 11.3666 12.7804 11.0109 12.9424 10.7302C13.1041 10.4499 13.4676 10.3505 13.7547 10.5091L14.8958 11.1386C15.1823 11.2971 15.2839 11.6527 15.1216 11.9332C15.0122 12.1235 14.8104 12.23 14.6019 12.23L14.6019 12.23Z" />
      <path d="M8.00013 4C5.79087 4 4 5.79092 4 7.99987C4 10.2091 5.79092 12 8.00013 12C10.2093 12 12 10.2091 12 7.99987C12 5.79082 10.2093 4 8.00013 4ZM10.8046 8.03406C10.7918 8.03569 10.779 8.03651 10.7665 8.03651C10.6205 8.03651 10.4934 7.92803 10.4742 7.77907C10.315 6.54328 9.29886 5.5688 8.05755 5.46186C7.89545 5.448 7.77504 5.30516 7.78922 5.14266C7.80298 4.98045 7.94561 4.86054 8.10834 4.87401C9.62399 5.00441 10.8653 6.194 11.0595 7.70328C11.0802 7.86549 10.9661 8.01343 10.8045 8.03412L10.8046 8.03406Z" />
    </svg>
  );

  const moon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.9988 8.79295C15.7929 10.8157 14.8262 12.6847 13.2944 14.0217C11.7627 15.3589 9.78009 16.0643 7.74795 15.9954C5.71586 15.9264 3.78568 15.0882 2.34823 13.6503C0.910615 12.2123 0.0729844 10.2819 0.00453265 8.24984C-0.0637816 6.21773 0.642211 4.23563 1.97991 2.70424C3.31762 1.17302 5.18701 0.206932 7.20987 0.00161789C7.33376 -0.0121195 7.45028 0.0628126 7.48912 0.181202C7.52797 0.299592 7.47838 0.428973 7.37048 0.49129C6.33191 1.11046 5.50713 2.03188 5.00645 3.13234C4.50577 4.23295 4.35301 5.46007 4.56859 6.64973C4.78428 7.83938 5.35801 8.93488 6.21316 9.78971C7.06828 10.6445 8.16408 11.2179 9.35388 11.4331C10.5437 11.6484 11.7709 11.4952 12.8714 10.9942C13.9718 10.4932 14.893 9.66806 15.5119 8.62937C15.5755 8.52472 15.7029 8.47788 15.8192 8.51622C15.9355 8.55456 16.0099 8.66796 15.9989 8.78997L15.9988 8.79295Z" />
    </svg>
  );

  const logout = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.73291 0C1.23756 0 -3.63677e-08 1.23531 0 2.7301V17.2699C-3.63677e-08 18.7647 1.23756 20 2.73291 20H8.18807C9.68341 20 10.9139 18.7647 10.9139 17.2699V15.4504C10.9139 15.2092 10.818 14.9778 10.6473 14.8071C10.4766 14.6365 10.2452 14.5407 10.0038 14.5407C9.76242 14.5407 9.53094 14.6365 9.36026 14.8071C9.18959 14.9778 9.09371 15.2092 9.09371 15.4504V17.2699C9.09371 17.7891 8.70745 18.1823 8.18807 18.1823H2.73291C2.21352 18.1823 1.81839 17.7891 1.81839 17.2699V2.7301C1.81839 2.21096 2.21352 1.8177 2.73291 1.8177H8.18807C8.70745 1.8177 9.09371 2.21096 9.09371 2.7301V4.54957C9.09371 4.79085 9.18959 5.02224 9.36026 5.19285C9.53094 5.36346 9.76242 5.45931 10.0038 5.45931C10.2452 5.45931 10.4766 5.36346 10.6473 5.19285C10.818 5.02224 10.9139 4.79085 10.9139 4.54957V2.7301C10.9139 1.23531 9.68341 0 8.18807 0H2.73291ZM13.6308 5.45487C13.1311 5.46174 12.7303 5.86775 12.7323 6.36727V7.27257H8.18807C7.68578 7.27064 7.2771 7.67577 7.27532 8.17786V11.815C7.27339 12.3197 7.68316 12.7294 8.18807 12.7274H12.7323V13.6327C12.7294 14.3616 13.5422 14.797 14.1475 14.3907L19.5974 10.7553C20.1342 10.3952 20.1342 9.60479 19.5974 9.2447L14.1475 5.6093C13.9948 5.50694 13.8147 5.45281 13.6308 5.45487Z"
      />
    </svg>
  );

  switch (iconName) {
    case 'home':
      return home;
    case 'meetup':
      return meetup;
    case 'group':
      return group;
    case 'podcast':
      return podcast;
    case 'notification':
      return notification;
    case 'message':
      return message;
    case 'arrowdown':
      return arrowdown;
    case 'search':
      return search;
    case 'profile':
      return profile;
    case 'setting':
      return setting;
    case 'sun':
      return sun;
    case 'moon':
      return moon;
    case 'logout':
      return logout;
    default:
      return null;
  }
};

export default HeaderIcon;
