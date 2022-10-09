export interface EducationObject {
        institution: string,
        area: string,
        studyType: string,
        startDate: string,
        endDate: string,
        score: string,
        courses: never[]
}

export function isEducationObject(object: any): object is EducationObject {
    return Object.prototype.hasOwnProperty.call(object, "studyType");
}

function Education(prop: {education: EducationObject, id:number})
{
    return <div id={prop.id.toString()} className={"work pb-6"}>
        <div className="p-6 mx-auto bg-light text-dark rounded-xl shadow-lg items-center space-x-0 justify-center transition-colors">
            <div className="text-3xl font-medium">{prop.education.institution}</div>
            <div className="p-6">
                <div className="text-xl font-medium">{prop.education.area}</div>
                <div>{prop.education.startDate + (prop.education.endDate ? prop.education.endDate : "")}</div>
                <div>{prop.education.area}</div>
            </div>
            <div>{prop.education.score}</div>
            <div>{prop.education.courses}</div>
        </div>
    </div>
}

export default Education;