export default function Loading() {
  return (
    <div style={{fill: 'rgb(220, 220, 220)', height: '64px', width: '64px'}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path transform="translate(2)" d="M0 12 V20 H4 V12z">
          <animate
            attributeName="d"
            values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0"
            keyTimes="0;.2;.5;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
            calcMode="spline"
          ></animate>
        </path>
        <path transform="translate(8)" d="M0 12 V20 H4 V12z">
          <animate
            attributeName="d"
            values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.2"
            keyTimes="0;.2;.5;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
            calcMode="spline"
          ></animate>
        </path>
        <path transform="translate(14)" d="M0 12 V20 H4 V12z">
          <animate
            attributeName="d"
            values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.4"
            keyTimes="0;.2;.5;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
            calcMode="spline"
          ></animate>
        </path>
        <path transform="translate(20)" d="M0 12 V20 H4 V12z">
          <animate
            attributeName="d"
            values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.6"
            keyTimes="0;.2;.5;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
            calcMode="spline"
          ></animate>
        </path>
        <path transform="translate(26)" d="M0 12 V20 H4 V12z">
          <animate
            attributeName="d"
            values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z"
            dur="1.2s"
            repeatCount="indefinite"
            begin="0.8"
            keyTimes="0;.2;.5;1"
            keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8"
            calcMode="spline"
          ></animate>
        </path>
      </svg>
    </div>
  );
}
