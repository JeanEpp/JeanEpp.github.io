export interface ProjectObject {
    name: string,
    startDate: string,
    endDate: string,
    summary?: string,
    url: string
}

export function isProjectObject(object: any): object is ProjectObject {
    return Object.prototype.hasOwnProperty.call(object, "name");
}

function Project(prop: { project: ProjectObject, id: number }) {
    return <div id={prop.id.toString()} className={"work pb-6"}>
        <div className="p-6 mx-auto bg-light text-dark rounded-xl shadow-lg items-center space-x-0 justify-center transition-colors">
            <a href={prop.project.url}>
                <div className="text-3xl font-medium">{prop.project.name}</div>
                <div className="p-6">
                    <div>{prop.project.startDate + (prop.project.endDate ? prop.project.endDate : "")}</div>
                    <div>{prop.project.summary}</div>
                </div>
            </a>
        </div>
    </div>
}

export default Project;