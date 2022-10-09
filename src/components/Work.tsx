export interface WorkObject {
        name: string,
        position: string,
        startDate: string,
        endDate: string,
        highlights: never[],
        summary?: string,
        url: string,
        location: string
}

export function isWorkObject(object: any): object is WorkObject {
    return Object.prototype.hasOwnProperty.call(object, "position");
}

function Work(prop: {work: WorkObject, id:number})
{
    return <div id={prop.id.toString()} className={"work pb-6"}>
        <div className="p-6 mx-auto bg-light text-dark rounded-xl shadow-lg items-center space-x-0 justify-center transition-colors">
            <div className="text-3xl font-medium">{prop.work.name}</div>
            <div className="p-6">
                <div className="text-xl font-medium">{prop.work.position}</div>
                <div>{prop.work.startDate + (prop.work.endDate ? prop.work.endDate : "")}</div>
                <div>{prop.work.location}</div>
            </div>
            <div>{prop.work.summary}</div>
            <div>{prop.work.highlights}</div>
        </div>
    </div>
}

export default Work;