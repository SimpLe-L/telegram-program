"use client"

import { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

const AMap = () => {
  let map: any = null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AMapLoader.load({
        key: "3b800de7145f65527c4ee11ef2cddd7a",
        version: "1.4.15"
      })
        .then((AMap) => {
          map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "2D", // 是否为3D地图模式
            zoom: 10, // 初始化地图级别
            center: [104.04525, 30.637313], // 初始化地图中心点位置
            lang: "en",
            scale: true
          });
          const marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [104.04525, 30.637313],
          });
          const marker1 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [104.05525, 30.537313],
          });
          const marker2 = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [104.03525, 30.737313],
          });

          map.add(marker)
          map.add(marker1)
          map.add(marker2)
        })
        .catch((e) => {
          console.log(e);
        });

      return () => {
        map?.destroy();
      };
    }
  }, []);
  return (
    <div
      id="container"
      className="w-full h-[300px]"
    ></div>
  )
}
export default AMap