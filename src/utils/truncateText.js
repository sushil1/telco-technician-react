export default function truncateText(description, long) {
	if (description.length > long) {
		return `${description.substring(0, long)}...`;
	} else return description;
}
