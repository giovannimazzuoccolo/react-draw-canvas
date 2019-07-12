import React, { useRef, ReactNode, useEffect } from "react";

interface Props {
  src: string;
}

const SvgDrawer: React.FC<Props> = ({ src }) => {
  const imageRef = useRef(null);

  useEffect(() => {
    const img = imageRef;
    console.log(img);
  }, []);

  function Image(src: string): ReactNode {
    return <image x="0" y="0" xlinkHref={src} />;
  };
/**
 * Create an hidden image for retreive dimentions 
 *
 * @param {string} src
 * @returns {ReactNode}
 */
function HiddenImage(src: string):ReactNode {
      return <img src={src} ref={imageRef} alt="demo" style={{ display: 'none' }} />
  }

  return (
    <>
    {HiddenImage(src)}
    <svg width="100" height="100">
      {Image(src)}
    </svg>
    </>
  );
};

export default SvgDrawer;
