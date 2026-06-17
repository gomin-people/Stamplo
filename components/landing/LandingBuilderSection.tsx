import { LandingBuilderDemo } from "@/components/landing/LandingBuilderDemo";

export const LandingBuilderSection = () => {
  return (
    <section
      className="py-[clamp(72px,9vw,120px)] px-0 relative bg-linear-to-b from-white to-gomin-neutral-50/20"
      id="builder"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
        <div className="max-w-[720px] mx-auto mb-14 text-center flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2.25 text-[13px] font-bold tracking-wider text-gomin-primary-700 before:content-[''] before:w-1.75 before:h-1.75 before:rounded-full before:bg-gomin-primary-700 before:shadow-[0_0_0_4px_var(--primary-100)] reveal">
            행사 만들기 체험
          </span>
          <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
            행사 페이지 디자인 체험하기
          </h2>
          <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-[1.6] break-keep word-keep-all reveal">
            실제 서비스의 행사 생성 에디터 화면입니다. 스탬프 이미지를 등록하고
            색상 슬라이더로 직접 행사 데모 페이지 디자인을 경험해보세요.
          </p>
        </div>

        <LandingBuilderDemo />
      </div>
    </section>
  );
};
