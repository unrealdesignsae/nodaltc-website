"use client";

export function TechStackIntro() {
  return (
    <div
      id="tech-stack-intro"
      className="relative w-full py-16 flex flex-col items-center justify-center text-center px-6"
      style={{ background: "#070a0f" }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        Built with<br />
        <span style={{ color: "#00d4ff" }}>Industry Standard Tools</span>
      </h2>
      <p className="text-sm sm:text-base text-white/60 max-w-xl">
        Every system we deploy is built on proven, industry-leading technology — engineered for performance, reliability, and scale.
      </p>
    </div>
  );
}
