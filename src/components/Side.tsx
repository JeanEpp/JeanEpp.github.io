import { useEffect } from "react";
import Color from "../Colors";
import Education, { EducationObject, isEducationObject } from "./Education";
import Project, { isProjectObject, ProjectObject } from "./Project";
import Work, { isWorkObject, WorkObject } from "./Work";

let i: number = 0;
function Side(prop: {side: Array<WorkObject | EducationObject | ProjectObject | null>, title: string}): JSX.Element {
    let colors = new Color().colors;
    var works: Array<HTMLElement> = [];
    let list : JSX.Element[] = [];
    for(let elem in prop.side) {
        let item = prop.side[elem]
        useEffect(() => {
            const div = document.getElementById(elem);
            const divEmpty = document.getElementById(elem + 'bis');
            divEmpty?.setAttribute("style", "height:" + div!.offsetHeight + "px")
            works.push(div!);

            window.onscroll = function() {
                for (elem in works)
                    checkVisible(works[elem])
            };

            function checkVisible(elm: any) {
              var rect = elm.getBoundingClientRect();
              var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
              (elm.firstChild! as HTMLElement).style.backgroundColor = !(rect.bottom - viewHeight >= elm.offsetHeight / 3) ? colors['--red'] : colors['--light'];
              (elm.firstChild! as HTMLElement).style.color = !(rect.bottom - viewHeight >= elm.offsetHeight / 3) ? colors['--light'] : colors['--dark'];
            }
        })
        if (item && isWorkObject(item)) {
            list.push(<Work key={elem} work={item} id={parseInt(elem)}></Work>)
        }
        else if (item && isEducationObject(item)) {
            list.push(<Education key={elem} education={item} id={parseInt(elem)}></Education>)
        }
        else if (item && isProjectObject(item)) {
            list.push(<Project key={elem} project={item} id={parseInt(elem)}></Project>)
        }
        else {
            list.push(<div key={elem + 'bis'} id={elem + 'bis'} style={{height: 30}}></div>)
        }
    }
    return <div className={'col-span-4 pt-52 px-12'}>
        <h1 className="text-3xl font-medium text-light pb-14">{prop.title}</h1>
        {list}
    </div>
}

export default Side;