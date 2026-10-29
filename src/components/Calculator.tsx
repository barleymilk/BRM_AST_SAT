"use client";

import { useRef, type PointerEvent, type MouseEvent } from "react";
import Image from "next/image";
import styles from "./Calculator.module.css";

// 원본 이미지에 대한 백분율 좌표. 이미지가 줄어도 버튼 위치가 함께 맞춰집니다.
const keyWidth = 22.5;
const keyHeight = 19;
const keys = Array.from({ length: 9 }, (_, index) => ({
  number: index + 1,
  left: 11.8 + (index % 3) * 24.8,
  top: 34.3 + Math.floor(index / 3) * 19.9,
}));

export default function Calculator() {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  function pressKey(event: MouseEvent<HTMLButtonElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const button = event.currentTarget;
    // CSS 호버 전환은 유지하고, 이전 클릭 애니메이션만 취소합니다.
    button
      .getAnimations()
      .filter((animation) => animation.id === "calculator-key-press")
      .forEach((animation) => animation.cancel());
    button.animate(
      [
        // 끝 프레임을 생략하면 현재 CSS 상태(호버/기본)로 자연스럽게 복귀합니다.
        {
          offset: 0,
          transform: "translateY(2px) scale(0.97)",
          filter: "brightness(0.87)",
        },
      ],
      { id: "calculator-key-press", duration: 180, easing: "ease-out" },
    );
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      resetTilt();
      return;
    }

    const calculator = calculatorRef.current;
    if (!calculator) return;

    const rect = event.currentTarget.getBoundingClientRect();

    // 마우스 위치를 -1 ~ 1 범위로 변환
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    const maxTilt = 5;

    calculator.style.transform = `perspective(1000px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`;

    if (shadowRef.current) {
      // 바닥 그림자는 평면을 유지하면서 기울기에 따라 조금씩 이동합니다.
      shadowRef.current.style.transform = `translate(${x * 9}px, ${y * 4}px) scaleX(${1 - Math.abs(x) * 0.06}) scaleY(${1 + y * 0.12})`;
    }
  }

  function resetTilt() {
    const calculator = calculatorRef.current;
    if (!calculator) return;

    calculator.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    if (shadowRef.current) {
      shadowRef.current.style.transform =
        "translate(0px, 0px) scaleX(1) scaleY(1)";
    }
  }

  return (
    <div className="w-full max-w-[300px]">
      <div
        className={styles.stage}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
      >
        <div ref={shadowRef} className={styles.shadow} aria-hidden="true" />
        <div ref={calculatorRef} className={styles.calculator}>
          <Image
            src="/images/calculator.webp"
            alt="계산기"
            width={1760}
            height={2014}
            // 약 87KB WebP를 버튼 배경과 같은 URL로 공유해 중복 다운로드를 피합니다.
            unoptimized
            loading="eager"
            className={styles.image}
            draggable={false}
          />
          {keys.map(({ number, left, top }) => (
            <button
              key={number}
              type="button"
              aria-label={`계산기 버튼 ${number}`}
              className={styles.key}
              onClick={pressKey}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${keyWidth}%`,
                height: `${keyHeight}%`,
                backgroundSize: `${10000 / keyWidth}% ${10000 / keyHeight}%`,
                backgroundPosition: `${(left / (100 - keyWidth)) * 100}% ${(top / (100 - keyHeight)) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
