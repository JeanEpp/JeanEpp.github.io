import Side from './Side';
import Profile from './Profile'
import ProgressBar from './ProgressBar';
import data from './../assets/CV.json';
import { isWorkObject, WorkObject } from './Work';
import { EducationObject } from './Education';
import Network from './Network';
import { isProjectObject, ProjectObject } from './Project';
import { useEffect } from 'react';
import PopoverRender, { Popover } from './Popover';

function Home() {
	let left = []
	let right = []
	let timeline: any[] = []
	let network: any[] = []
	timeline = timeline.concat(data.education, data.work)
	timeline = timeline.sort((a: WorkObject, b: EducationObject) => Date.parse(a.startDate) - Date.parse(b.startDate))
	timeline = timeline.concat(data.projects)
	timeline = timeline.sort((a: ProjectObject, b: WorkObject | EducationObject) => Date.parse(a.startDate) - Date.parse(b.startDate))
	network= network.concat(data.skills, data.languages)

	for (let elem in timeline) {
		if (isWorkObject(timeline[elem]) || isProjectObject(timeline[elem])) {
			left.push(timeline[elem])
			right.push(null)
		} else {
			left.push(null)
			right.push(timeline[elem])
		}
	}

	useEffect(() => {
		PopoverRender();
	})

	return <div>
		<Profile></Profile>
		<div className="grid grid-cols-9 justify-items-center">
			<Side key={1} side={left} title={"Experience"}></Side>
			<ProgressBar></ProgressBar>
			<Side key={2} side={right} title={"Education"}></Side>
		</div>
		<Network skills={network}></Network>
	</div>
}

export default Home;