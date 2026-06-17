import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Scroll,
  Users,
  QrCode,
} from "lucide-react";

export const LandingProblem = () => {
  return (
    <section
      className="bg-gomin-neutral-100/50 py-[clamp(72px,9vw,120px)] px-0 relative"
      id="problem"
    >
      <div className="max-w-[1200px] mx-auto px-8 max-md:px-5 max-sm:px-4">
        <div className="max-w-[720px] mx-auto mb-14 text-center flex flex-col items-center gap-4">
          <h2 className="font-extrabold text-[clamp(30px,3.6vw,46px)] leading-[1.18] font-nanum break-keep word-keep-all reveal">
            스탬프 투어,
            <br />
            모바일로 더 편리하게{" "}
          </h2>
          <p className="text-[clamp(16px,1.5vw,18px)] text-gomin-neutral-600 max-w-[56ch] leading-[1.6] break-keep word-keep-all reveal">
            종이와 도장을 사용하는 기존 방법은 여러가지 문제가 있습니다.
            Stamplo는 웹과 QR로 그 문제를 해결합니다.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-7 items-stretch max-lg:grid-cols-1 max-lg:gap-2">
          <div className="flex flex-col gap-4 reveal">
            <div className="flex items-center gap-2.25 text-sm font-bold text-red-500 mb-0.5">
              <XCircle className="inline text-rose-500" />
              실물 스탬프 투어의 문제
            </div>
            <div className="bg-white border border-gomin-neutral-100/60 rounded-[18px] p-6 flex gap-4 items-start shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]">
              <div className="w-[46px] h-[46px] shrink-0 rounded-[13px] flex items-center justify-center bg-red-50 text-red-500">
                <Scroll />
              </div>
              <div>
                <div className="text-[17px] font-bold font-nanum break-keep word-keep-all">
                  종이와 스탬프의 문제
                </div>
                <div className="text-sm text-gomin-neutral-500 mt-1.25 leading-[1.55] break-keep word-keep-all">
                  종이는 쉽게 훼손되고 분실의 우려가 있습니다. 또한 제작, 인쇄,
                  관리에 비용이 추가적으로 발생합니다.
                </div>
              </div>
            </div>
            <div className="bg-white border border-gomin-neutral-100/60 rounded-[18px] p-6 flex gap-4 items-start shadow-[0_1px_2px_rgba(17,17,17,0.04),0_1px_1px_rgba(17,17,17,0.03)]">
              <div className="w-[46px] h-[46px] shrink-0 rounded-[13px] flex items-center justify-center bg-red-50 text-red-500">
                <Users />
              </div>
              <div>
                <div className="text-[17px] font-bold font-nanum break-keep word-keep-all">
                  대기열 · 행사 병목
                </div>
                <div className="text-sm text-gomin-neutral-500 mt-1.25 leading-[1.55] break-keep word-keep-all">
                  도장 부스 앞에 줄이 길어지면 동선이 막히고, 참여자의 몰입과
                  만족도가 함께 떨어집니다.
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center text-gomin-neutral-300 max-lg:rotate-90 max-lg:py-2 reveal">
            <ArrowRight className="inline w-[34px] h-[34px] stroke-[1.6]" />
          </div>

          <div className="flex flex-col gap-4 reveal">
            <div className="flex items-center gap-2.25 text-sm font-bold text-gomin-primary-700 mb-0.5">
              <CheckCircle2 className="inline text-gomin-primary-700" />
              Stamplo의 해결
            </div>
            <div className="bg-linear-to-br from-[#5f41ee] to-[#5435EB] text-white rounded-[18px] p-7 shadow-[0_10px_24px_rgba(84,53,235,0.24),0_2px_4px_rgba(84,53,235,0.12)] flex flex-col gap-3.5 h-full justify-center relative overflow-hidden after:content-[''] after:absolute after:right-[-50px] after:bottom-[-50px] after:w-[170px] after:h-[170px] after:rounded-full after:bg-white/10">
              <div className="w-[50px] h-[50px] rounded-2xl bg-white/16 flex items-center justify-center relative z-10">
                <QrCode className="w-6.5 h-6.5" />
              </div>
              <div className="font-nanum font-extrabold text-[21px] relative z-10 break-keep word-keep-all">
                웹서비스와 QR코드로 해결
              </div>
              <div className="text-[14.5px] text-white/88 leading-[1.6] relative z-10 break-keep word-keep-all">
                설치할 앱도, 나눠줄 종이도 없습니다. 참여자는 QR을 스캔해 바로
                스탬프 투어를 시작하고, 미션을 완료하면서 자연스러운 행사 흐름을
                경험합니다.
              </div>
              <div className="flex gap-2 flex-wrap relative z-10 mt-0.5">
                <span className="text-[12.5px] font-bold py-1.5 px-3 rounded-full bg-white/16">
                  종이 없음
                </span>
                <span className="text-[12.5px] font-bold py-1.5 px-3 rounded-full bg-white/16">
                  대기열 없음
                </span>
                <span className="text-[12.5px] font-bold py-1.5 px-3 rounded-full bg-white/16">
                  분실 걱정 없음
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
