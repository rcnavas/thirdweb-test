"use client";
import Spline from "@splinetool/react-spline/next";
import { Application } from "@splinetool/runtime";

export default function Page() {
  function onLoad(spline: Application) {
    spline.setVariables({ X: 0, Z: 0 });
  }
  return (
    <div className="h-dvh w-dvw fixed top-0 left-0 m-0 p-0 bg-gradient-to-b from-[#D920F4] to-[#300862]">
      <Spline
        scene="https://prod.spline.design/2tiYCWiMhmKzkiSa/scene.splinecode"
        onLoad={onLoad}

      />
    </div>
  );
}
