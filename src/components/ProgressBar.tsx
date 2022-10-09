import { useEffect } from "react";

function ProgressBar() {
    useEffect(() => {
        const scrollProgress = document.getElementById('scroll-progress');
        scrollProgress!.style.maxHeight = "100%";
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        window.addEventListener('scroll', () => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            scrollProgress!.style.height = `${(scrollTop / height) * 100}%`;
        });
    })
    return <div>
            <div className="w-[10px] bg-light rounded-b h-[95%]">
                <div id="scroll-progress" className="bg-secondary rounded-b"></div>
            </div>
        </div>
}
  
export default ProgressBar;