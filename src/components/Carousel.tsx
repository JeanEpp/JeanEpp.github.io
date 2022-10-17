import { useState, useRef, useEffect, RefObject } from 'react';
import Color from '../Colors';

export interface ProjectObject {
    name: string,
    startDate: string,
    endDate: string,
    summary?: string,
    url: string
}

function Carousel(prop: { projects: ProjectObject[] }) {
    const colors = new Color().colors;
    const maxScrollWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(0);
    const carousel = useRef(null);
    let i = 0;
    let list: JSX.Element[] = [];

    const movePrev = () => {
        if (currentIndex > 0) {
            setPreviousIndex(currentIndex);
            setCurrentIndex((prevState) => prevState - 1);
        }
    };

    const moveNext = () => {
        if (carousel.current !== null && currentIndex + 1 < prop.projects.length) {
            setPreviousIndex(currentIndex);
            setCurrentIndex((prevState) => prevState + 1);
        }
    };

    const isDisabled = (direction: string) => {
        if (direction === 'prev')
            return currentIndex <= 0;
        if (direction === 'next' && carousel.current !== null)
            return (currentIndex >= prop.projects.length - 1);
        return false;
    };

    useEffect(() => {
        window.addEventListener("scroll", () => {
            let carouseldoc = document.getElementById("Projects")!.children[0];
            var rect = carouseldoc.getBoundingClientRect();
            (carouseldoc as HTMLElement).style.borderColor = (window.innerHeight - rect.top <= window.innerHeight * 0.4) ? colors['--light'] : colors['--orange'];
            let projects = document.getElementsByClassName("project")!;
            for (let i: number = 0; projects[i]; i++) {
                (projects[i].children[0] as HTMLElement).style.backgroundColor = (window.innerHeight - rect.top <= window.innerHeight * 0.5) ? colors['--light'] : colors['--red'];
                (projects[i].children[0] as HTMLElement).style.color = (window.innerHeight - rect.top <= window.innerHeight * 0.5) ? colors['--dark'] : colors['--light'];
            }
        })
    })

    useEffect(() => {
        let wrapper = document.getElementById("Projects")!.children[1].children[1].children[0]!
        if (wrapper.scrollWidth > wrapper.clientWidth) {
            wrapper.classList.remove("justify-center")
        }
        if (prop.projects.length < 2)
            document.getElementById("Projects")!.children[1].children[0].children[1]!.toggleAttribute("disabled", true)
    })

    useEffect(() => {
        if (carousel !== null && carousel.current !== null) {
            (carousel.current as HTMLElement).scrollLeft = document.getElementById("Project0")!.offsetWidth * currentIndex;
            document.getElementById("Project" + currentIndex)!.style.setProperty("scale", "calc(125%)");
            document.getElementById("Project" + previousIndex)!.style.removeProperty("scale");
        }
    }, [currentIndex]);

    useEffect(() => {
        maxScrollWidth.current = (carousel.current)
            ? (carousel.current as HTMLElement).scrollWidth - document.getElementById("Project0")!.offsetWidth : 0;
        document.getElementById("Project" + 0)!.style.setProperty("scale", "calc(125%)");
    }, []);

    function handleImageLoaded(id: string) {
        const div = document.getElementById(id)!;
        const divEmpty = document.getElementById(id + 'bis')!;
        if (document.readyState === "complete")
            divEmpty.style.setProperty("height", div.offsetHeight + "px")
    }

    for (let elem in prop.projects) {
        let item = prop.projects[elem]
        list.push(<div id={"Project" + i++} key={i} className="carousel-item project flex text-center relative snap-start scale scale-75 md:w-1/3">
            <a className='h-full w-full aspect-square flex flex-col justify-center bg-light transition-colors rounded-2xl z-0 pt-4' href={item.url}>
                <div className="text-3xl font-medium">{item.name}</div>
                <div className="pt-6">
                    <img className="flex justify-center w-32 mx-auto" src={'/'+ item.name + '.png'} onLoad={() => handleImageLoaded(elem)}/>
                </div>
                <div className="p-6">
                    <div className='pb-3'>{item.startDate + " : " + (item.endDate ? item.endDate : "")}</div>
                    <div>{item.summary}</div>
                </div>
            </a>
        </div>)
    }

    return (
        <div id="Projects" className="carousel mx-auto">
            <h2 className="text-4xl text-light leading-8 font-semibold pb-6 pt-4 border-y-8 text-slate-700 transition-colors">Projects</h2>
            <div className="relative overflow-hidden bg-opacity-0">
                <div className="flex justify-between bg-opacity-0 absolute top left w-full h-full">
                    <button onClick={movePrev} className="hover:bg-orange bg-opacity-0 text-light w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300" disabled={isDisabled('prev')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-20-ml-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="sr-only">Prev</span>
                    </button>
                    <button onClick={moveNext} className="hover:bg-orange bg-opacity-0 text-light w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300" disabled={isDisabled('next')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-20-ml-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </button>
                </div>
                <div className='px-9 py-6'>
                    <div ref={carousel} className="carousel-container relative justify-center flex overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0">
                        {list};
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;