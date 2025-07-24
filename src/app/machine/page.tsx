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
        scene="https://prod.spline.design/Ta0wTlrqf-rlGl9Q/scene.splinecode"
        onLoad={onLoad}
      />
    </div>
  );
}
