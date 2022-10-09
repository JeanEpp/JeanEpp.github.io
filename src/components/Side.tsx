import { useEffect } from "react";
import Education, { EducationObject, isEducationObject } from "./Education";
import Work, { isWorkObject, WorkObject } from "./Work";


function Side(prop: {side: Array<WorkObject | EducationObject | null>, title: string}): JSX.Element {
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
              (elm.firstChild! as HTMLElement).style.backgroundColor = !(rect.bottom - viewHeight >= elm.offsetHeight / 3) ? '#5A202E' : '#F4EBE1';
              (elm.firstChild! as HTMLElement).style.color = !(rect.bottom - viewHeight >= elm.offsetHeight / 3) ? '#F4EBE1' : '#2A2828';
            }
        })
        if (item && isWorkObject(item)) {
            list.push(<Work work={item} id={parseInt(elem)}></Work>)
        }
        else if (item && isEducationObject(item)) {
            list.push(<Education education={item} id={parseInt(elem)}></Education>)
        }
        else {
            list.push(<div id={elem + 'bis'} style={{height: 30}}></div>)
        }
    }
    return <div className={'col-span-4 pt-52 px-12'}>
        <h1 className="text-3xl font-medium text-light pb-14">{prop.title}</h1>
        {list}
    </div>
}

export default Side;