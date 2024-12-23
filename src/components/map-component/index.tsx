"use client"

import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./AMap'), {
  ssr: false
});
const AMapContainer = () => {
  return (
    <>
      <DynamicMap />
    </>
  )
}
export default AMapContainer