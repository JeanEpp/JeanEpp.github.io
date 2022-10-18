import { useEffect } from "react";

function ProgressBar() {
    useEffect(() => {
        const scrollProgress = document.getElementById('scroll-progress')!;
        scrollProgress!.style.maxHeight = "100%";
        window.addEventListener('scroll', () => {
            let timeline = document.getElementById("timeline")!;
            var rect = timeline.getBoundingClientRect();
            scrollProgress.style.height = (window.innerHeight - rect.top - window.innerHeight * 0.3) / timeline.scrollHeight * 100 + '%';
            if (Number.parseFloat(scrollProgress.style.height) < 2)
                scrollProgress.style.height = '0%';
        });
    })
    return <div className="w-[10px]">
            <div className="w-[10px] bg-light h-[100%]">
                <div id="scroll-progress" className="bg-orange h-[0%]"></div>
            </div>
        </div>
}
  
export default ProgressBar;