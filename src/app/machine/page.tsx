"use client";
import Spline from "@splinetool/react-spline/next";
import { Application } from "@splinetool/runtime";

export default function Page() {
  function onLoad(spline: Application) {
    spline.setVariables({ X: 0, Z: 0 });
  }
  return (
    <div className="h-dvh w-dvw fixed top-0 left-0 m-0 p-0">
      <Spline
        scene="https://draft.spline.design/A9VUGldUFpYuPH6k/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
