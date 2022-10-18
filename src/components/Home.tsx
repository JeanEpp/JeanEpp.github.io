import Side from './Side';
import Profile from './Profile'
import ProgressBar from './ProgressBar';
import data from './../assets/CV.json';
import { isWorkObject, WorkObject } from './Work';
import { EducationObject } from './Education';
import Network from './Network';
import Carousel from './Carousel';

function Home() {
	let left = []
	let right = []
	let timeline: any[] = []
	let network: any[] = []
	timeline = timeline.concat(data.education, data.work)
	timeline = timeline.sort((a: WorkObject, b: EducationObject) => Date.parse(a.startDate) - Date.parse(b.startDate))
	network= network.concat(data.skills, data.languages)

	for (let elem in timeline) {
		if (isWorkObject(timeline[elem])) {
			left.push(timeline[elem])
			right.push(null)
		} else {
			left.push(null)
			right.push(timeline[elem])
		}
	}

	return <div>
		<Profile></Profile>
		<div id="timeline" className="flex flex-col md:flex-row justify-items-center">
			<Side key={1} side={left} title={"Experience"}></Side>
			<ProgressBar></ProgressBar>
			<Side key={2} side={right} title={"Education"}></Side>
		</div>
		<Carousel projects={data.projects}></Carousel>
		<Network skills={network}></Network>
	</div>
}

export default Home;