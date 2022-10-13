import { useEffect } from "react";

function ProgressBar() {
    useEffect(() => {
        const scrollProgress = document.getElementById('scroll-progress');
        scrollProgress!.style.maxHeight = "100%";
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        window.addEventListener('scroll', () => {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            scrollProgress!.style.height = `${(scrollTop / height) * 100}%`;
            if (parseInt(document.getElementById("scroll-progress")!.style.height) < parseFloat('100')) {
                document.getElementById("Skills/Languages")!.classList.remove("border-orange");
                document.getElementById("Skills/Languages")!.classList.add("border-light");
            }
            if (parseInt(document.getElementById("scroll-progress")!.style.height) >= parseInt('100')) {
                document.getElementById("Skills/Languages")!.classList.remove("border-light");
                document.getElementById("Skills/Languages")!.classList.add("border-orange");
            }
        });
    })
    return <div>
            <div className="w-[10px] bg-light h-[100%]">
                <div id="scroll-progress" className="bg-orange"></div>
            </div>
        </div>
}
  
export default ProgressBar;