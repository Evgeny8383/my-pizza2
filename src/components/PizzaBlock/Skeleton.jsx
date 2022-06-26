import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="99" cy="99" r="99" /> 
    <rect x="0" y="225" rx="10" ry="10" width="280" height="20" /> 
    <rect x="0" y="271" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="396" rx="10" ry="10" width="95" height="30" /> 
    <rect x="128" y="389" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton