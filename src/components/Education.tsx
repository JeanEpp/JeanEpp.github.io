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

function Education(prop: { education: EducationObject, id: number }) {
    function handleImageLoaded() {
        const div = document.getElementById(prop.id.toString())!;
        const divEmpty = document.getElementById(prop.id + 'bis')!;
        if (document.readyState === "complete")
            divEmpty.style.setProperty("height", div.offsetHeight + "px")
    }

    return <div id={prop.id.toString()} className={"work pb-6"}>
        <div>
            <div className="p-6 mx-auto bg-light text-dark rounded-xl shadow-lg items-center space-x-0 justify-center transition-colors">
                <div className="text-3xl font-medium">{prop.education.institution}</div>
                <div className="pt-6">
                    <img className="flex justify-center w-40 mx-auto" src={'/' + prop.education.institution + '.png'} onLoad={handleImageLoaded} />
                </div>
                <div className="p-6">
                    <div className="text-xl font-medium">{prop.education.area}</div>
                    <div>{prop.education.startDate + " : " + (prop.education.endDate ? prop.education.endDate : "")}</div>
                    <div>{prop.education.area}</div>
                </div>
                <div>{prop.education.score}</div>
                <div>{prop.education.courses}</div>
            </div>
        </div>
    </div>
}

export default Education;