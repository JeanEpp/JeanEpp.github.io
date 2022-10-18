import { useEffect } from "react";
import Color from "../Colors";
import Education, { EducationObject, isEducationObject } from "./Education";
import Work, { isWorkObject, WorkObject } from "./Work";

let i: number = 0;
function Side(prop: { side: Array<WorkObject | EducationObject | null>, title: string }): JSX.Element {
    let colors = new Color().colors;
    var works: Array<HTMLElement> = [];
    let list: JSX.Element[] = [];
    for (let elem in prop.side) {
        let item = prop.side[elem]
        useEffect(() => {
            const div = document.getElementById(elem)!;
            works.push(div);
            window.addEventListener("scroll", () => {
                let left = document.getElementById("timeline")!;
                let rect = left.getBoundingClientRect();
                (left.children[0].children[0] as HTMLElement).style.borderColor = (window.innerHeight - rect.top <= window.innerHeight * 0.5) ? colors['--light'] : colors['--orange'];
                (document.getElementById("timeline")!.children[2].children[0] as HTMLElement).style.borderColor = (window.innerHeight - rect.top <= window.innerHeight * 0.5) ? colors['--light'] : colors['--orange'];
                for (elem in works) {
                    rect = works[elem].getBoundingClientRect();
                    (works[elem].firstChild!.firstChild as HTMLElement).style.backgroundColor = (rect.bottom - window.innerHeight <= works[elem].offsetHeight * 0.3) ? colors['--red'] : colors['--light'];
                    (works[elem].firstChild!.firstChild as HTMLElement).style.color = (rect.bottom - window.innerHeight <= works[elem].offsetHeight * 0.3) ? colors['--light'] : colors['--dark'];
                }
            })
        })
        if (item && isWorkObject(item)) {
            list.push(<Work key={elem} work={item} id={parseInt(elem)}></Work>)
        }
        else if (item && isEducationObject(item)) {
            list.push(<Education key={elem} education={item} id={parseInt(elem)}></Education>)
        }
        else {
            list.push(<div className="hidden md:block" key={elem + 'bis'} id={elem + 'bis'}></div>)
        }
    }
    return <div className={'flex-1 pt-8 md:pt-52'}>
        <h1 className="text-3xl font-medium text-light py-4 border-solid border-y-8 mb-8 transition-colors">{prop.title}</h1>
        <div className="px-12 pb-2">
            {list}
        </div>
    </div>
}

export default Side;