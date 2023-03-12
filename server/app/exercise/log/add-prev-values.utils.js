export const addPrevValues = (log, prevLog = null) => {
	console.log(prevLog)
	return log.times.map((item, index) => ({
		...item,
		prevWeight: prevLog ? prevLog.times[index].weight : 0,
		prevReps: prevLog ? prevLog.times[index].reps : 0
	}))
}
