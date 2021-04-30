export function Loader(props) {
  const Search = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          margin: "10% auto",
          background: "none",
          display: "block",
          shapeRendering: "auto",
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(50 50)">
          <g transform={`scale(${props.size})`}>
            <g transform="translate(-50 -50)">
              <g>
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  repeatCount="indefinite"
                  dur="0.7462686567164178s"
                  values="-20 -20;20 -20;0 20;-20 -20"
                  keyTimes="0;0.33;0.66;1"
                ></animateTransform>
                <path
                  fill="#ffffff"
                  d="M44.19 26.158c-4.817 0-9.345 1.876-12.751 5.282c-3.406 3.406-5.282 7.934-5.282 12.751 c0 4.817 1.876 9.345 5.282 12.751c3.406 3.406 7.934 5.282 12.751 5.282s9.345-1.876 12.751-5.282 c3.406-3.406 5.282-7.934 5.282-12.751c0-4.817-1.876-9.345-5.282-12.751C53.536 28.033 49.007 26.158 44.19 26.158z"
                ></path>
                <path
                  fill="#0077ff"
                  d="M78.712 72.492L67.593 61.373l-3.475-3.475c1.621-2.352 2.779-4.926 3.475-7.596c1.044-4.008 1.044-8.23 0-12.238 c-1.048-4.022-3.146-7.827-6.297-10.979C56.572 22.362 50.381 20 44.19 20C38 20 31.809 22.362 27.085 27.085 c-9.447 9.447-9.447 24.763 0 34.21C31.809 66.019 38 68.381 44.19 68.381c4.798 0 9.593-1.425 13.708-4.262l9.695 9.695 l4.899 4.899C73.351 79.571 74.476 80 75.602 80s2.251-0.429 3.11-1.288C80.429 76.994 80.429 74.209 78.712 72.492z M56.942 56.942 c-3.406 3.406-7.934 5.282-12.751 5.282s-9.345-1.876-12.751-5.282c-3.406-3.406-5.282-7.934-5.282-12.751 c0-4.817 1.876-9.345 5.282-12.751c3.406-3.406 7.934-5.282 12.751-5.282c4.817 0 9.345 1.876 12.751 5.282 c3.406 3.406 5.282 7.934 5.282 12.751C62.223 49.007 60.347 53.536 56.942 56.942z"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  };

  const Load = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{margin: "auto", background: "none", display: "block", shapeRendering: "auto"}}
        width={props.width}
        height={props.height}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(80,50)">
          <g transform="rotate(0)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="1">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.875s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.875s"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,71.21320343559643)">
          <g transform="rotate(45)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="0.875">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.75s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.75s"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(50,80)">
          <g transform="rotate(90)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="0.75">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.625s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.625s"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(28.786796564403577,71.21320343559643)">
          <g transform="rotate(135)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="0.625">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.5s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fillOpacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.5s"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(20,50.00000000000001)">
          <g transform="rotate(180)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="0.5">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.375s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.375s"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(28.78679656440357,28.786796564403577)">
          <g transform="rotate(225)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="0.375">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.25s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.25s"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(49.99999999999999,20)">
          <g transform="rotate(270)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="0.25">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="-0.125s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="-0.125s"
              ></animate>
            </circle>
          </g>
        </g>
        <g transform="translate(71.21320343559643,28.78679656440357)">
          <g transform="rotate(315)">
            <circle cx="0" cy="0" r="6" fill="#0077ff" fillOpacity="0.125">
              <animateTransform
                attributeName="transform"
                type="scale"
                begin="0s"
                values="1.5 1.5;1 1"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="fill-opacity"
                keyTimes="0;1"
                dur="1s"
                repeatCount="indefinite"
                values="1;0"
                begin="0s"
              ></animate>
            </circle>
          </g>
        </g>
      </svg>
    );
  };

  let loadComponent = props.type === "load" ? <Load /> : <Search />;
  return loadComponent;
}
