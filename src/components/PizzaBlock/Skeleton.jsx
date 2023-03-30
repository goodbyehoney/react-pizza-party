import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="112" cy="112" r="112" /> 
    <rect x="170" y="253" rx="0" ry="0" width="2" height="10" /> 
    <rect x="5" y="236" rx="10" ry="10" width="220" height="25" /> 
    <rect x="3" y="277" rx="10" ry="10" width="222" height="55" /> 
    <rect x="8" y="348" rx="10" ry="10" width="81" height="32" /> 
    <rect x="113" y="340" rx="25" ry="25" width="110" height="47" />
  </ContentLoader>
)

export default Skeleton;

