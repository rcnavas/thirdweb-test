"use client";
import { SplineEvent } from "@splinetool/react-spline";
import Spline from "@splinetool/react-spline/next";
import { Application } from "@splinetool/runtime";
import { useRef, useState } from "react";

export default function Page() {
  const scene = useRef<Application | null>();

  const [done, setDone] = useState(false);
  const [prize, setPrize] = useState(false);

  let done_x = 0;
  let done_z = 0;

  function onLoad(spline: Application) {
    spline.setVariables({ X: 0, Z: 0 });
    scene.current = spline;
    let interval = setInterval(() => {
      if (scene.current) {
        if (scene.current.getVariable("Done") === true) {
          clearInterval(interval);
          setPrize(scene.current.getVariable("Prize") as boolean);
          setDone(true);
          done_x = scene.current.getVariable("Done-X") as number;
          done_z = scene.current.getVariable("Done-Z") as number;
          console.log(
            "DONE! Prize is ",
            scene.current.getVariable("Prize") as boolean,
            done_x,
            done_z  
          );
        } else {
          console.log("Not Done Yet...");
        }
      }
    }, 2000);
  }
  if (!done) {
    return (
      <div className="h-dvh w-dvw fixed top-0 left-0 m-0 p-0 bg-gradient-to-b from-[#D920F4] to-[#300862]">
        <Spline
          scene="https://prod.spline.design/2tiYCWiMhmKzkiSa/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
    );
  } else {
    return (
      <div className="h-dvh w-dvw fixed top-0 left-0 m-0 p-0 bg-gradient-to-b from-[#D920F4] to-[#300862]">
        <h1>DONE!</h1>
        {prize && <h2>You Won!</h2>}
        Position: X = {done_x} Z = {done_z}
      </div>
    );
  }
}
