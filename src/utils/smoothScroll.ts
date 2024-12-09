function ease(x: number): number {
  // Cubic ease in/out
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export function smoothScrollTo(
  elementId: string,
  duration: number = 1000,
  allowCancel: boolean = false
): Promise<void> {
  return new Promise((resolve, reject) => {
    const targetElement = document.querySelector(elementId) as HTMLElement;

    if (!targetElement) {
      console.error(`Element with query ${elementId} not found`);
      reject(new Error(`Element with query ${elementId} not found`));
      return;
    }

    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    // scrollTo({ top: targetPosition, behavior: "smooth" });
    // return;

    //Disable manual scrolling
    document.body.style.overflow = "hidden";

    let frame: number | null = null;
    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = timeElapsed / duration;

      if (progress < 1) {
        let nextScrollPosition = ease(progress) * distance + startPosition;
        window.scrollTo({
          top: nextScrollPosition,
          behavior: "instant",
        });
        frame = requestAnimationFrame(animate);
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: "instant",
        });
        document.body.style.overflow = "unset";
        if (allowCancel) removeListeners();
        resolve();
      }
    }

    frame = requestAnimationFrame(animate);

    function stopScroll() {
      console.log("stopScroll");
      if (frame) {
        cancelAnimationFrame(frame);
      }
      document.body.style.overflow = "unset";
      removeListeners();
      resolve();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "PageUp" ||
        e.key === "PageDown" ||
        e.key === "Home" ||
        e.key === "End" ||
        e.key === " "
      ) {
        stopScroll();
      }
    }

    if (allowCancel) {
      document.addEventListener("wheel", stopScroll);
      document.addEventListener("touchmove", stopScroll);
      document.addEventListener("keydown", handleKeyDown);
    }

    function removeListeners() {
      document.removeEventListener("wheel", stopScroll);
      document.removeEventListener("touchmove", stopScroll);
      document.removeEventListener("keydown", handleKeyDown);
    }
  });
}
