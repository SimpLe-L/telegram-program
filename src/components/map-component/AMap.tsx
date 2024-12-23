"use client"

import { useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";

const AMap = () => {
  let map: any = null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AMapLoader.load({
        key: "3b800de7145f65527c4ee11ef2cddd7a", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
          marker.on("click", () => {
            console.log("www")
          })
          map.add(marker)
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