import Side from './Side';
import Profile from './Profile'
import ProgressBar from './ProgressBar';
import data from './../assets/CV.json';
import { isWorkObject, WorkObject } from './Work';
import { EducationObject } from './Education';

function Home() {
  let left = []
  let right = []
  let timeline: any[] = []
  timeline = timeline.concat(data.education, data.work)
  timeline = timeline.sort((a: WorkObject, b: EducationObject) => Date.parse(a.startDate) - Date.parse(b.startDate))

  for (let elem in timeline)
    if (isWorkObject(timeline[elem])) {
      left.push(timeline[elem])
      right.push(null)
    } else {
      left.push(null)
      right.push(timeline[elem])
    }

  return <div>
    <Profile></Profile>
    <div className="grid grid-cols-9 justify-items-center">
      <Side side={left} title={"Experience"}></Side>
      <ProgressBar></ProgressBar>
      <Side side={right} title={"Education"}></Side>
    </div>
  </div>
}

export default Home;